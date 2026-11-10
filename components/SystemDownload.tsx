"use client";

import { useSyncExternalStore } from "react";

type Platform = "windows" | "linux";

/**
 * One download button for the visitor's own system: Linux on Linux desktops, Windows everywhere else.
 * The server can't see the system, so the page is sent with Windows and swaps once it loads.
 * Each click is a "download" event in Umami, with the system and where on the site the button sits.
 */
export default function SystemDownload({ linux, placement }: { linux: string; placement: string }) {
  const platform = useSyncExternalStore(subscribe, detectPlatform, () => "windows" as const);
  return (
    // Linux: GitHub sends the .deb as an attachment, so this one click downloads it. Windows: the
    // download page starts the installer and shows how to get past Windows' warning for new apps
    <a
      href={platform === "linux" ? linux : "/download"}
      data-umami-event="download"
      data-umami-event-platform={platform}
      data-umami-event-placement={placement}
      className="inline-flex h-[52px] items-center justify-center gap-4 rounded-xl border border-[#8a8a8a] bg-[linear-gradient(180deg,#4b4b4b_0%,#383838_100%)] px-8 text-[17px] text-[#ececec] shadow-[inset_0_0_6px_rgba(255,255,255,0.16),0_6px_16px_-8px_rgba(0,0,0,0.35)] transition-[filter,transform] duration-200 hover:brightness-125 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#434343] active:scale-[0.98] lg:h-[56px] lg:px-10 lg:text-[18px]"
    >
      download for {platform}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  );
}

// the system never changes while the page is open, so there's nothing to listen for
const subscribe = () => () => {};

function detectPlatform(): Platform {
  const agent = navigator.userAgent;
  // Android phones say Linux too, but can't run the .deb
  return /Linux|X11/.test(agent) && !/Android/.test(agent) ? "linux" : "windows";
}
