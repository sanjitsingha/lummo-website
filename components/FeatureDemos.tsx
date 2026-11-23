"use client";

import { MockSplit } from "@/components/SpotlightMock";
import { useRates } from "@/lib/useRates";

const money = (value: number, code: string, whole = false) =>
  new Intl.NumberFormat(code === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);

/** $1 at today's real rate; without rates it shows no number rather than an invented one. */
export function CurrencyAnswer() {
  const saved = useRates();
  const inr = saved?.rates.INR;
  const amount = inr ? money(inr, "INR") : "—";
  const day = saved
    ? new Date(saved.updatedAt * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })
    : null;
  return (
    <MockSplit
      left={{ code: "USD", amount: "$1", name: "US Dollar", note: day ? `Updated ${day}` : "Updated daily" }}
      right={{ code: "INR", amount, name: "Indian Rupee", note: inr ? `1 USD = ${amount}` : "Rate unavailable" }}
    />
  );
}
