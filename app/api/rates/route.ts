import { connection } from "next/server";
import { getExchangeRates } from "@/lib/rates";

/** Today's exchange rates for the Lummo app, which keeps them and answers conversions offline. */
export async function GET() {
  // at request time, so that building the site never calls the service
  await connection();
  try {
    const rates = await getExchangeRates();
    return Response.json(rates, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
    });
  } catch (e) {
    console.error("exchange rates are unavailable:", e instanceof Error ? e.message : "unknown error");
    return Response.json(
      { error: "Exchange rates are unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
