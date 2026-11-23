"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** The feature cards in a sideways scroller, with a round previous and next button centered below it. */
export default function FeatureCarousel({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const node = scroller.current;
    if (!node) return;
    const update = () => {
      const start = node.scrollLeft <= 2;
      const end = node.scrollLeft + node.clientWidth >= node.scrollWidth - 2;
      setEnds((now) => (now.start === start && now.end === end ? now : { start, end }));
    };
    const resize = new ResizeObserver(update);
    resize.observe(node);
    node.addEventListener("scroll", update, { passive: true });
    return () => {
      resize.disconnect();
      node.removeEventListener("scroll", update);
    };
  }, []);

  const move = (direction: 1 | -1) => {
    const node = scroller.current;
    const card = node?.firstElementChild;
    if (!node || !card) return;
    const gap = parseFloat(getComputedStyle(node).columnGap) || 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollBy({ left: direction * (card.clientWidth + gap), behavior: still ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        ref={scroller}
        tabIndex={0}
        role="group"
        aria-label="Features"
        className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto px-4 outline-none [mask-image:linear-gradient(90deg,transparent_0,#000_10px,#000_calc(100%_-_18px),transparent_100%)] [scroll-padding-inline:16px] [scrollbar-width:none] sm:gap-4 sm:px-[calc(50%-min(41vw,260px))] sm:[mask-image:linear-gradient(90deg,transparent_0,#000_12%,#000_88%,transparent_100%)] sm:[scroll-padding-inline:calc(50%-min(41vw,260px))] lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <div className="mt-4 flex justify-center gap-3 lg:mt-5">
        <ArrowButton label="Previous feature" disabled={ends.start} onClick={() => move(-1)} path="m15 18-6-6 6-6" />
        <ArrowButton label="Next feature" disabled={ends.end} onClick={() => move(1)} path="m9 18 6-6-6-6" />
      </div>
    </>
  );
}

function ArrowButton({ label, disabled, onClick, path }: { label: string; disabled: boolean; onClick: () => void; path: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-11 items-center justify-center rounded-full border border-white/30 text-ink transition-[background-color,border-color,opacity,scale] duration-150 enabled:hover:border-white/60 enabled:hover:bg-white/10 enabled:active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-30"
    >
      <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </button>
  );
}
