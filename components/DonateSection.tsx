import type { CSSProperties } from "react";
import { PILL_BUTTON } from "@/components/styles";

/**
 * Where "donate me" goes. TODO: replace with the real donation page
 * (Buy Me a Coffee, Ko-fi, UPI, GitHub Sponsors…); until then it stays on this section.
 */
const DONATE_URL = "#donate";
const external = DONATE_URL.startsWith("http");

/** [left %, top %, size px, resting opacity, twinkle seconds]: a quiet late-night sky, kept clear of the text. */
const STARS = [
  [6, 12, 2, 0.35, 5.2],
  [14, 64, 1.5, 0.25, 6.8],
  [21, 26, 1.5, 0.3, 4.6],
  [28, 86, 2, 0.2, 7.4],
  [39, 8, 1.5, 0.3, 5.8],
  [11, 42, 1.5, 0.2, 7.7],
  [57, 15, 2, 0.35, 4.9],
  [68, 90, 1.5, 0.25, 7.1],
  [74, 9, 1.5, 0.3, 6.4],
  [83, 58, 2, 0.25, 5.5],
  [88, 27, 1.5, 0.35, 6.9],
  [93, 78, 2, 0.2, 4.7],
  [96, 6, 1.5, 0.3, 5.3],
  [47, 93, 1.5, 0.2, 6.1],
] as const;

/** The last screen: who makes lummo and when, set at night, with a way to chip in. */
export default function DonateSection() {
  return (
    <section
      id="donate"
      aria-labelledby="donate-title"
      data-snap
      className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#0b0c10] px-6 py-24 text-center sm:px-10"
    >
      {/* the glow of a laptop screen in a dark room */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[58%] left-1/2 -z-10 h-[70vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,134,247,0.2),transparent)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {STARS.map(([left, top, size, dim, seconds], index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white motion-safe:animate-[donate-twinkle_var(--twinkle)_ease-in-out_var(--delay)_infinite]"
            style={
              {
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                opacity: dim,
                "--dim": dim,
                "--twinkle": `${seconds}s`,
                "--delay": `${-index * 0.7}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <p className="flex items-center gap-2 text-[13px] font-medium tracking-[0.02em] text-white/45">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        made after hours
      </p>
      <h2
        id="donate-title"
        className="mt-5 text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.02em] text-white"
      >
        Like what I&apos;ve built?
        <span aria-hidden className="ml-[0.35em] inline-block text-[0.85em]">
          🥰
        </span>
      </h2>
      <p className="mt-5 max-w-[34rem] text-pretty text-[clamp(1rem,1.15vw,1.2rem)] leading-[1.65] text-white/60">
        By day I&apos;m a designer with a 9-to-5. By night I build on my old HP laptop. lummo started as a tool just
        for me, because I wanted the Mac&apos;s best little features on my own PC. After a year of using it every day,
        I thought, why not share it? If it&apos;s made your day a little easier, consider supporting its journey!
      </p>
      <a
        href={DONATE_URL}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${PILL_BUTTON} mt-10 w-full max-w-[20rem] sm:w-[16rem]`}
      >
        donate me
      </a>
    </section>
  );
}
