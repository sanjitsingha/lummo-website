import Link from "next/link";
import CapsLockFeature from "@/components/CapsLockFeature";
import DonateSection from "@/components/DonateSection";
import DownloadSection from "@/components/DownloadSection";
import SpotlightDemo from "@/components/SpotlightDemo";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-hidden">
      <header className="mx-auto flex w-full max-w-[1512px] shrink-0 items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6">
        <Link
          href="/"
          aria-label="lummo home"
          className="text-2xl font-medium tracking-[-0.03em] select-none transition-opacity hover:opacity-80 sm:text-[28px] lg:text-[32px]"
        >
          <span className="font-light text-[#a1a1a1]">lum</span>
          <span className="font-semibold text-black">mo</span>
        </Link>
        <nav className="flex items-center gap-7 text-base font-normal text-[#202020] sm:gap-10 sm:text-[18px] lg:gap-12 lg:text-[20px]">
          <a href="#download" className="transition-colors duration-150 hover:text-black/50">
            download
          </a>
          <a href="#support" className="transition-colors duration-150 hover:text-black/50">
            support
          </a>
        </nav>
      </header>

      <main className="flex flex-col">
        <section className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-between px-4 pb-2 sm:min-h-[calc(100dvh-68px)] sm:px-6 sm:pb-4 lg:min-h-[calc(100dvh-80px)]">
          <section className="flex shrink-0 flex-col items-center pt-16 text-center sm:pt-18">
            <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.75rem,3.1vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#434343] sm:mt-6 md:max-w-none lg:mt-8">
              Because life&apos;s too short to find files manually.
            </h1>
            <p className="mt-2.5 max-w-[36ch] text-[clamp(1rem,1.35vw,1.45rem)] leading-[1.55] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none">
              Just hit a shortcut, type what you&apos;re looking for,
              <br className="hidden sm:inline" /> and let your PC do the finding.
            </p>
          </section>

          <div className="relative mt-3 flex min-h-0 w-full flex-1 -translate-y-8 items-end justify-center sm:mt-4 sm:-translate-y-12">
            <div
              className="w-full sm:w-[92%] lg:w-[88%]"
              style={{
                maxWidth: "min(1280px, calc((100dvh - 240px) * 1.7895))",
              }}
            >
              <SpotlightDemo eager />
            </div>
          </div>
        </section>
        <CapsLockFeature />
        <DownloadSection />
        <DonateSection />
      </main>
    </div>
  );
}

export function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#download"
      className={`inline-flex h-12 items-center gap-2.5 rounded-full border border-[#2f45e0]/40 bg-[linear-gradient(180deg,#3446fa_0%,#5a80fe_100%)] px-6 text-[16px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(30,45,180,0.2),0_8px_20px_-8px_rgba(52,70,250,0.55)] transition-[filter,transform] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3446fa] active:scale-[0.98] sm:h-[52px] sm:gap-3 sm:px-7 sm:text-[17px] lg:h-[56px] lg:px-8 lg:text-[18px] ${className}`}
    >
      download for windows
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </a>
  );
}
