import Image from "next/image";
import type { ReactNode } from "react";
import { CapsLockGlyph } from "@/components/CapsLockFeature";
import SystemDownload from "@/components/SystemDownload";
import { getLatestRelease, RELEASES_URL } from "@/lib/release";

/** The first screen: says what lummo is, with a download button for the visitor's system. */
export default async function WhatIsLummo() {
  const release = await getLatestRelease();

  return (
    // together with the header (64 / 76 / 88px tall) this fills exactly one screen
    <section
      aria-labelledby="what-is-lummo-title"
      className="flex h-[calc(100dvh-64px)] min-h-fit flex-col items-center justify-center px-6 py-16 text-center sm:h-[calc(100dvh-76px)] sm:px-10 lg:h-[calc(100dvh-88px)]"
    >
      <Image
        src="/lummo/logo.png"
        alt="lummo"
        width={616}
        height={616}
        sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 80px"
        loading="eager"
        draggable={false}
        className="size-20 select-none sm:size-24 lg:size-28"
      />
      <h2
        id="what-is-lummo-title"
        className="mt-6 max-w-[18ch] text-balance text-[clamp(1.25rem,1.9vw,2rem)] font-normal leading-[1.25] tracking-[-0.03em] text-[#434343] md:max-w-none lg:mt-8"
      >
        Hey Apple, thanks for the inspiration.
        <br className="hidden sm:inline" /> We took it a little{" "}
        <span className="whitespace-nowrap">
          further.
          <OrangeSlice />
        </span>
      </h2>
      {/* the tall lines leave room for the search pill and for the Caps Lock badge that hangs below its line */}
      <p className="mt-4 max-w-[50em] text-pretty text-[clamp(0.8125rem,0.85vw,0.9375rem)] leading-[1.9] tracking-[-0.01em] text-[#6e6e6e] sm:mt-6">
        A little upgrade to your everyday desktop. Bringing the convenience of a smart <SearchPill>Spotlight Search</SearchPill>{" "}
        and a sleek{" "}
        <span className="whitespace-nowrap">
          <strong className="font-semibold text-[#3a3a3c]">Caps Lock indicator</strong>
          <CapsLockCaret />
        </span>{" "}
        to Windows and Linux, with a few thoughtful improvements of our own. Built with passion,
        designed for productivity, and completely free for everyone.
      </p>
      <div className="mt-10 flex w-full justify-center sm:mt-12">
        <SystemDownload windows={release?.windows ?? RELEASES_URL} linux={release?.deb ?? RELEASES_URL} />
      </div>
    </section>
  );
}

/** An orange where you'd expect an apple. */
function OrangeSlice() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="ml-[0.25em] inline-block size-[0.9em] align-[-0.1em]">
      <circle cx="16" cy="16" r="15.5" fill="#f28b0c" />
      <circle cx="16" cy="16" r="13" fill="#fff1d2" />
      <circle cx="16" cy="16" r="11.5" fill="#ffb21f" />
      {/* the white walls between the segments */}
      <g stroke="#fff1d2" strokeWidth="1.4" strokeLinecap="round">
        {[0, 45, 90, 135].map((angle) => (
          <line key={angle} x1="16" y1="4.5" x2="16" y2="27.5" transform={`rotate(${angle} 16 16)`} />
        ))}
      </g>
      <circle cx="16" cy="16" r="1.8" fill="#fff1d2" />
    </svg>
  );
}

/** A word set in a tiny search bar, like the one Spotlight pops up. */
function SearchPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-black/[0.12] bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f6_100%)] px-[0.75em] leading-[1.6] text-[#434343] shadow-[inset_0_1px_0_#fff,0_1px_3px_rgba(0,0,0,0.12)]">
      {children}
    </span>
  );
}

/** A blinking text cursor with the Caps Lock badge popped up under it, as lummo shows it while you type. */
function CapsLockCaret() {
  return (
    <span aria-hidden className="relative ml-[0.2em] inline-block h-[1.15em] w-[1.5px] align-[-0.22em]">
      <span className="absolute inset-0 rounded-full bg-[#b5b5ba] motion-safe:animate-[spotlight-blink_1.06s_infinite]" />
      {/* it hangs over the next line like the real one does over your text, so a white ring keeps it apart */}
      <span className="absolute top-[calc(100%+0.25em)] left-[-0.2em] flex size-[1.3em] items-center justify-center rounded-[0.32em] border border-white/[0.14] bg-[rgba(40,40,44,0.96)] shadow-[0_0_0_2px_#fff,0_4px_12px_rgba(0,0,0,0.22)]">
        <CapsLockGlyph on size="100%" />
      </span>
    </span>
  );
}
