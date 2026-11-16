"use client";

import { useState } from "react";

/** Some of the ways to set it; Clippy takes anything from an hour to a year. */
const STOPS = ["1 hour", "1 day", "2 days", "10 days", "30 days", "100 days", "365 days"];
/** Clippy's default: a day after it was last copied. */
const DEFAULT_STOP = 1;

/** A play version of the setting for how long Clippy keeps each copy. */
export default function ClippyRetention() {
  const [stop, setStop] = useState(DEFAULT_STOP);

  return (
    <label className="mt-3 block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[#5c5c5c]">Keep each copy for</span>
        <output className="font-medium text-[#3a3a3c] tabular-nums">{STOPS[stop]}</output>
      </span>
      <input
        type="range"
        min={0}
        max={STOPS.length - 1}
        step={1}
        value={stop}
        onChange={(event) => setStop(Number(event.target.value))}
        aria-valuetext={STOPS[stop]}
        className="mt-2 block w-full cursor-pointer accent-[#5856d6]"
      />
      <span aria-hidden className="mt-1 flex justify-between text-[0.6875rem] text-[#8e8e93]">
        <span>1 hour</span>
        <span>1 year</span>
      </span>
    </label>
  );
}
