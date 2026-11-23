"use client";

import { useSyncExternalStore } from "react";
import { detectPlatform, serverPlatform, subscribeToPlatform } from "@/lib/platform";

/**
 * One download button for the visitor's own system: Linux on Linux desktops, Windows everywhere else.
 * The server can't see the system, so the page is sent with Windows and swaps once it loads.
 * Each click is a "download" event in Umami, with the system and where on the site the button sits.
 */
export default function SystemDownload({ linux, placement }: { linux: string; placement: string }) {
  const platform = useSyncExternalStore(subscribeToPlatform, detectPlatform, serverPlatform);
  return (
    // Linux: GitHub sends the .deb as an attachment, so this one click downloads it. Windows: the
    // download page starts the installer and shows how to get past Windows' warning for new apps
    <a
      href={platform === "linux" ? linux : "/download"}
      data-umami-event="download"
      data-umami-event-platform={platform}
      data-umami-event-placement={placement}
      className="inline-flex h-12 items-center justify-center gap-2.5 rounded-[10px] bg-[#f5f5f7] px-6 text-[16px] font-medium text-[#0a0a0b] shadow-[0_8px_30px_-8px_rgba(255,255,255,0.28)] transition-[background-color,transform] duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98] lg:h-[52px] lg:px-7 lg:text-[17px]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>
      download for {platform}
    </a>
  );
}
