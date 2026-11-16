"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Clippy screen recording: silent, looping, and only playing while it's on screen. It starts
 * downloading a screen before it scrolls in, phones get the lighter 720p file, and the corner
 * button pauses it. With reduced motion it waits for that button instead of playing by itself.
 */
export default function ClippyVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const pausedByVisitor = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const node = video.current;
    if (!node) return;
    node.muted = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const warm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.preload = "auto";
        warm.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    const view = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) node.pause();
        else if (!reduceMotion && !pausedByVisitor.current) node.play().catch(() => {});
      },
      { threshold: 0.4 },
    );
    warm.observe(node);
    view.observe(node);
    return () => {
      warm.disconnect();
      view.disconnect();
    };
  }, []);

  const toggle = () => {
    const node = video.current;
    if (!node) return;
    pausedByVisitor.current = !node.paused;
    if (node.paused) node.play().catch(() => {});
    else node.pause();
  };

  return (
    <div className="relative size-full overflow-hidden rounded-[clamp(6px,0.6vw,10px)] bg-[#1c1c1e] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
      <video
        ref={video}
        muted
        loop
        playsInline
        preload="none"
        poster="/lummo/clippy-poster.jpg"
        width={1920}
        height={1080}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label="Clippy at work: a photo copied in the browser and some copied text drop into the notch at the top of the screen and are pulled out into Word, then files copied in File Explorer line up in it too."
        className="size-full object-cover"
      >
        <source src="/lummo/clippy-1080.mp4" type="video/mp4" media="(min-width: 768px)" />
        <source src="/lummo/clippy-720.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-black/45 text-white opacity-80 backdrop-blur-md transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4 sm:bottom-4"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
          {playing ? (
            <>
              <rect x="2.5" y="2" width="3" height="10" rx="1" />
              <rect x="8.5" y="2" width="3" height="10" rx="1" />
            </>
          ) : (
            <path d="M4 2.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L4.9 1.7a.6.6 0 0 0-.9.5Z" />
          )}
        </svg>
      </button>
    </div>
  );
}
