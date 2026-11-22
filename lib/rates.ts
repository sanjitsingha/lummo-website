import { cacheLife } from "next/cache";

const API_URL = "https://v6.exchangerate-api.com/v6";

/** What the Lummo app downloads: units of each currency per one `base`. */
export type ExchangeRates = {
  base: string;
  /** When the service last updated these rates, in seconds since 1970. */
  updatedAt: number;
  rates: Record<string, number>;
};

type ServiceAnswer = {
  result?: string;
  base_code?: string;
  time_last_update_unix?: number;
  conversion_rates?: Record<string, number>;
};

/**
 * Today's rates. The service is asked about once a day for all of Lummo's
 * users, and the key stays on this server. The remote cache is shared across
 * serverless instances, and a failure throws so that it is never cached.
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  "use cache: remote";
  cacheLife({ stale: 3600, revalidate: 86400, expire: 172800 });

  const key = process.env.EXCHANGE_RATE_API_KEY;
  if (!key) throw new Error("EXCHANGE_RATE_API_KEY is not set");

  const res = await fetch(`${API_URL}/${key}/latest/USD`, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`the exchange rate service answered ${res.status}`);

  const answer = (await res.json()) as ServiceAnswer;
  const { result, base_code: base, time_last_update_unix: updatedAt, conversion_rates: rates } = answer;
  if (result !== "success" || !base || !updatedAt || !rates) {
    throw new Error("the exchange rate service sent an unexpected answer");
  }
  return { base, updatedAt, rates };
}
