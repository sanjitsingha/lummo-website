import ClippyVideo from "@/components/ClippyVideo";

/** Clippy, the clipboard history in a notch. */
export default function ClippyFeature() {
  return (
    <section
      id="clippy"
      aria-labelledby="clippy-title"
      data-snap
      className="relative isolate flex h-[100dvh] min-h-fit flex-col items-center overflow-hidden bg-black px-6 pt-[clamp(24px,4dvh,48px)] pb-[clamp(24px,4dvh,48px)] text-[#f5f5f7] sm:px-10 lg:px-20"
    >
      {/* the video takes whatever height is left, as big as fits without losing its shape; size
          containment keeps the video from stretching the screen-tall section */}
      <div className="flex min-h-52 w-full flex-1 items-center justify-center [container-type:size]">
        <div className="aspect-video w-[min(100cqw,calc(100cqh*16/9),1600px)]">
          <ClippyVideo />
        </div>
      </div>

      <div className="mt-[clamp(16px,2.5dvh,32px)] flex w-full shrink-0 flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="min-w-0 max-w-[36rem] text-[1.125rem] sm:text-[1.25rem]">
          <h2 id="clippy-title" className="font-medium leading-[1.3]">
            Clippy
          </h2>
          <p className="mt-2 max-w-[30rem] text-[0.75rem] leading-[1.6] tracking-[0.01em] text-[#a1a1a6] sm:text-[0.875rem]">
            A clipboard history that hides in a notch at the top of your screen. Rest your mouse there and your last 50
            copies drop down: text, images and files. Click one to copy it again, or drag a file or image straight into
            another app.
          </p>
        </div>
        <div className="w-full max-w-[34rem] text-[0.75rem] leading-[1.6] tracking-[0.01em] sm:text-[0.875rem]">
          <p className="font-medium text-[#f5f5f7]">Kept for as long as you like.</p>
          <p className="mt-2 text-[#a1a1a6]">
            Each copy is kept for a day by default, or set it anywhere from an hour to a year. And it all stays on your
            PC. No cloud, no account, and nothing your password manager marks private is ever saved.
          </p>
        </div>
      </div>
    </section>
  );
}
