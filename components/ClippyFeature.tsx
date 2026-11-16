import ClippyVideo from "@/components/ClippyVideo";

/**
 * Clippy, the clipboard history in a notch. The section snaps in with its screen recording filling the
 * screen and nothing over it; the next scroll slides a white panel with the text up over the bottom of
 * the video, which holds still so the notch at the top of the recording stays in view.
 */
export default function ClippyFeature() {
  return (
    <section id="clippy" aria-labelledby="clippy-title" data-snap className="relative bg-black">
      <div className="sticky top-0 h-[100dvh]">
        <ClippyVideo />
      </div>

      <div className="relative bg-white px-6 py-[clamp(32px,5dvh,56px)] text-[#3a3a3c] sm:px-10 lg:px-20">
        <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="min-w-0 max-w-[36rem] text-[1.125rem] sm:text-[1.25rem]">
            <h2 id="clippy-title" className="font-medium leading-[1.3]">
              Clippy
            </h2>
            <p className="mt-2 max-w-[30rem] text-[0.75rem] leading-[1.6] tracking-[0.01em] text-[#5c5c5c] sm:text-[0.875rem]">
              A clipboard history that hides in a notch at the top of your screen. Rest your mouse there and your last
              50 copies drop down: text, images and files. Click one to copy it again, or drag a file or image straight
              into another app.
            </p>
          </div>
          <div className="w-full max-w-[34rem] text-[0.75rem] leading-[1.6] tracking-[0.01em] sm:text-[0.875rem]">
            <p className="font-medium text-[#3a3a3c]">Kept for as long as you like.</p>
            <p className="mt-2 text-[#5c5c5c]">
              Each copy is kept for a day by default, or set it anywhere from an hour to a year. And it all stays on
              your PC. No cloud, no account, and nothing your password manager marks private is ever saved.
            </p>
          </div>
        </div>
      </div>

      {/* a scroll stop once the panel has fully risen: the section's bottom edge, one screen up */}
      <div data-snap aria-hidden className="scroll-mt-[100dvh]" />
    </section>
  );
}
