import ClippyNotch from "@/components/ClippyNotch";
import ClippyRetention from "@/components/ClippyRetention";
import ClippyVideo from "@/components/ClippyVideo";

/**
 * Clippy, the clipboard history in a notch. The section's top edge is the top of the screen once it
 * snaps into place, so a working notch hangs from it just where the real one does.
 */
export default function ClippyFeature() {
  return (
    <section
      id="clippy"
      aria-labelledby="clippy-title"
      data-snap
      className="relative isolate flex h-[100dvh] min-h-fit flex-col items-center overflow-hidden bg-[#efeefb] px-6 pt-[clamp(96px,13dvh,150px)] pb-[clamp(32px,6dvh,64px)] text-[#3a3a3c] sm:px-10 lg:px-20"
    >
      <ClippyNotch />

      <p className="max-w-[16ch] shrink-0 text-balance text-center text-[clamp(1.75rem,3.2vw,3.25rem)] font-normal leading-[1.15] tracking-[-0.03em] md:max-w-none">
        Everything you copy, one hover away.
      </p>

      {/* the video takes whatever height is left, as big as fits without losing its shape; size
          containment keeps the video from stretching the screen-tall section */}
      <div className="mt-[clamp(20px,3.5dvh,40px)] flex min-h-52 w-full flex-1 items-center justify-center [container-type:size]">
        <div className="aspect-video w-[min(100cqw,calc(100cqh*16/9),1100px)]">
          <ClippyVideo />
        </div>
      </div>

      <div className="mt-[clamp(24px,4dvh,48px)] flex w-full shrink-0 flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        {/* the icon sits in its own column, so the title and the paragraph share one left edge */}
        <div className="flex min-w-0 max-w-[36rem] items-start gap-[0.45em] text-[1.4rem] sm:text-[1.6rem]">
          <ClippyIcon />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h2 id="clippy-title" className="font-medium leading-[1.3]">
                Clippy
              </h2>
              <span className="rounded-full bg-[#5856d6]/10 px-2.5 py-0.5 text-[0.6875rem] font-medium tracking-[0.01em] text-[#4a48c4] sm:text-xs">
                Windows 10 &amp; 11
              </span>
            </div>
            <p className="mt-2 max-w-[30rem] text-[0.8125rem] leading-[1.6] tracking-[0.01em] text-[#5c5c5c] sm:text-[0.9375rem]">
              A clipboard history that hides in a notch at the top of your screen. Rest your mouse there and your last
              50 copies drop down: text, images and files. Click one to copy it again, or drag a file or image straight
              into another app.
            </p>
          </div>
        </div>
        <div className="w-full max-w-[22rem] text-[0.8125rem] leading-[1.6] tracking-[0.01em] sm:text-[0.9375rem]">
          <p className="font-medium text-[#3a3a3c]">Kept for as long as you like.</p>
          <ClippyRetention />
          <p className="mt-2 text-[#5c5c5c]">
            And it all stays on your PC. No cloud, no account, and nothing your password manager marks private is ever
            saved.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Clippy's app icon: a purple square with a notch at the top and three copies below it. */
function ClippyIcon() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="mt-[0.025em] size-[1.25em] shrink-0 drop-shadow-[0_4px_10px_rgba(88,86,214,0.35)]"
    >
      <defs>
        <linearGradient id="clippy-icon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7d7aff" />
          <stop offset="1" stopColor="#5856d6" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill="url(#clippy-icon)" />
      <path d="M30 0 H70 V13 Q70 24 59 24 H41 Q30 24 30 13 Z" fill="#1c1c1e" />
      <rect x="20" y="50" width="17" height="17" rx="4.5" fill="#fff" />
      <rect x="41.5" y="50" width="17" height="17" rx="4.5" fill="#fff" />
      <rect x="63" y="50" width="17" height="17" rx="4.5" fill="#fff" />
    </svg>
  );
}
