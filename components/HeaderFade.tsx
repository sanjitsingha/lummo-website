"use client";

import { useSyncExternalStore } from "react";

const FADE_HEIGHT = 124;

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** Past the landing page's hero, or just off the top of a page without one. */
function isPastHero() {
  const hero = document.querySelector<HTMLElement>('section[aria-labelledby="hero-title"]');
  return window.scrollY > (hero ? hero.offsetHeight - FADE_HEIGHT : 8);
}

/** The dark fade behind the navbar: gone over the hero, and in once the page scrolls past it. */
export default function HeaderFade() {
  const visible = useSyncExternalStore(subscribe, isPastHero, () => false);
  return (
    <span
      aria-hidden
      style={{ height: FADE_HEIGHT }}
      className={`pointer-events-none absolute inset-x-0 top-0 -z-10 bg-[linear-gradient(180deg,rgb(0_0_0/0.85)_0%,rgb(0_0_0/0.55)_45%,transparent_100%)] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
