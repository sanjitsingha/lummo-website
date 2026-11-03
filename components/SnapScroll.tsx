"use client";

import { animate, motionValue } from "motion";
import { useEffect } from "react";

/** Wheel events closer together than this are one gesture: a trackpad fling keeps firing for a while. */
const GESTURE_GAP_MS = 180;
/** Stops closer together than this share of the screen are merged, so a scroll never moves just a few pixels. */
const MIN_STEP = 0.12;
/** Glides in and settles without overshooting. */
const GLIDE = { type: "spring", visualDuration: 0.8, bounce: 0 } as const;

/**
 * Glides the page one stop per wheel gesture, using Motion: the top, each `[data-snap]` element
 * (its start, or centred on screen with data-snap="center") and the bottom. A new gesture mid-glide
 * carries on to the next stop with the current speed. Touch, keyboard and reduced motion keep the
 * browser's own scrolling.
 */
export default function SnapScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const position = motionValue(window.scrollY);
    const unsubscribe = position.on("change", (y) => window.scrollTo({ top: y, behavior: "instant" }));
    let target: number | null = null;
    let lastWheel = -Infinity;
    let spent = false;

    const stop = () => {
      position.stop();
      target = null;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      if (event.timeStamp - lastWheel > GESTURE_GAP_MS) spent = false;
      lastWheel = event.timeStamp;
      if (spent) return event.preventDefault();

      const next = nextStop(target ?? window.scrollY, Math.sign(event.deltaY));
      if (next === undefined) {
        // nothing further this way: scroll as usual, unless still gliding to the last stop
        if (target !== null) event.preventDefault();
        return;
      }
      event.preventDefault();
      spent = true;
      if (target === null) position.jump(window.scrollY);
      target = next;
      animate(position, next, { ...GLIDE, onComplete: () => target === next && (target = null) });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      stop();
      unsubscribe();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);

  return null;
}

/** The first stop past `from` going down (1) or up (-1), measured fresh so it follows layout changes. */
function nextStop(from: number, direction: number): number | undefined {
  const scrollY = window.scrollY;
  const screen = window.innerHeight;
  const max = document.documentElement.scrollHeight - screen;
  const marked = Array.from(document.querySelectorAll<HTMLElement>("[data-snap]"), (el) => {
    const box = el.getBoundingClientRect();
    if (el.dataset.snap === "center") return box.top + scrollY + (box.height - screen) / 2;
    return box.top + scrollY - parseFloat(getComputedStyle(el).scrollMarginTop);
  });

  const stops: number[] = [];
  for (const stop of [0, ...marked, max].map((y) => Math.round(Math.min(Math.max(y, 0), max))).sort((a, b) => a - b)) {
    if (!stops.length || stop - stops[stops.length - 1] >= screen * MIN_STEP) stops.push(stop);
  }
  return direction > 0 ? stops.find((y) => y > from + 1) : stops.findLast((y) => y < from - 1);
}
