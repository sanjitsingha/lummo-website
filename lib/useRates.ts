"use client";

import { useEffect, useState } from "react";

export type SavedRates = { updatedAt: number; rates: Record<string, number> };

let pending: Promise<SavedRates | null> | null = null;
/** One request per page, however many demos need the rates. */
const load = () =>
  (pending ??= fetch("/api/rates")
    .then((response) => (response.ok ? response.json() : null))
    .catch(() => null));

/** Today's exchange rates, from the same daily copy the app downloads; null until they arrive or if they can't. */
export function useRates() {
  const [rates, setRates] = useState<SavedRates | null>(null);
  useEffect(() => {
    let alive = true;
    load().then((data) => {
      if (alive && data?.rates?.INR > 0) setRates(data);
    });
    return () => {
      alive = false;
    };
  }, []);
  return rates;
}
