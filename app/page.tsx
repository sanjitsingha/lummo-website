import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import CapsLockFeature from "@/components/CapsLockFeature";
import DonateSection from "@/components/DonateSection";
import DownloadSection from "@/components/DownloadSection";
import FaqSection from "@/components/FaqSection";
import NavDownload from "@/components/NavDownload";
import SnapScroll from "@/components/SnapScroll";
import SpotlightDemo from "@/components/SpotlightDemo";
import SpotlightIntro from "@/components/SpotlightIntro";

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-clip">
      <SnapScroll />
      <header className="mx-auto flex w-full max-w-[1512px] shrink-0 items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6">
        <Link
          href="/"
          aria-label="lummo home"
          className="flex items-center select-none transition-opacity hover:opacity-80"
        >
          <Image
            src="/lummo/logo.png"
            alt=""
            width={616}
            height={616}
            sizes="40px"
            loading="eager"
            draggable={false}
            className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
          />
        </Link>
        <nav className="flex items-center gap-7 text-[15px] font-normal text-[#202020] sm:gap-10 sm:text-base lg:gap-12 lg:text-[17px]">
          <NavDownload />
          <a href="#support" className="transition-colors duration-150 hover:text-black/50">
            support
          </a>
        </nav>
      </header>

      <main className="flex flex-col">
        {/* together with the header (64 / 76 / 88px tall) the hero fills exactly one screen */}
        <section className="flex h-[calc(100dvh-64px)] min-h-fit flex-col items-center px-4 pb-8 sm:h-[calc(100dvh-76px)] sm:px-6 sm:pb-10 lg:h-[calc(100dvh-88px)] lg:pb-12">
          <section className="flex shrink-0 flex-col items-center pt-16 text-center sm:pt-18">
            <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.5rem,2.5vw,2.6rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#434343] sm:mt-6 md:max-w-none lg:mt-8">
              Because life&apos;s too short to find files manually.
            </h1>
            <p className="mt-2.5 max-w-[36ch] text-[clamp(0.875rem,0.95vw,1.05rem)] leading-[1.55] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none">
              Just hit <Key>alt</Key>
              <span className="mx-[0.35em] text-[#a1a1a1]">+</span>
              <Key wide>space</Key>, type what you&apos;re looking for,
              <br className="hidden sm:inline" /> and let your PC do the finding.
            </p>
          </section>

          {/* the laptop takes whatever height the text above and below leaves it, keeping the picture's shape;
              it's positioned out of flow so its full size never stretches the screen-tall hero */}
          <div className="relative mt-6 min-h-48 w-full flex-1 sm:mt-8">
            <div className="absolute top-0 left-1/2 flex aspect-[2976/1663] h-full max-w-full -translate-x-1/2 items-center sm:max-w-[min(74%,1024px)] lg:max-w-[min(70%,1024px)]">
              <SpotlightDemo eager />
            </div>
          </div>
          <SpotlightIntro />
        </section>
        <CapsLockFeature />
        <DownloadSection />
        <FaqSection />
        <DonateSection />
      </main>
    </div>
  );
}

/** A raised keycap that sits on the text's baseline and scales with it; `wide` draws a spacebar. */
function Key({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-[1.75em] items-center justify-center rounded-[0.45em] border border-black/[0.12] bg-[linear-gradient(180deg,#ffffff_0%,#f1f1f3_100%)] px-[0.6em] font-sans text-[0.75em] font-medium tracking-normal text-[#434343] shadow-[inset_0_1px_0_#fff,0_2px_0_rgba(0,0,0,0.1),0_4px_8px_-3px_rgba(0,0,0,0.18)] ${wide ? "min-w-[5em]" : "min-w-[2.4em]"}`}
    >
      {children}
    </kbd>
  );
}

export function DownloadButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#download"
      className={`inline-flex h-12 items-center gap-2.5 rounded-full bg-[linear-gradient(180deg,#4fa2fd_0%,#0971e6_100%)] px-6 text-[16px] text-white shadow-[inset_0_0_4px_0.5px_rgba(255,255,255,0.55)] transition-[filter,transform] duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1076e8] active:scale-[0.98] sm:h-[52px] sm:gap-3 sm:px-7 sm:text-[17px] lg:h-[56px] lg:px-8 lg:text-[18px] ${className}`}
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
