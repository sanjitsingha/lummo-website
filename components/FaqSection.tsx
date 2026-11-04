import type { ReactNode } from "react";
import { RELEASES_URL } from "@/lib/release";

const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "What is lummo?",
    answer:
      "A small app that brings two Mac favourites to Windows and Linux: a Spotlight search bar that finds anything on your PC, and a Caps Lock indicator that pops up right where you're typing.",
  },
  {
    question: "Is it really free?",
    answer:
      "Yep, completely free. If lummo makes your day a little easier you can chip in below, but that's totally up to you.",
  },
  {
    question: "Which systems does it run on?",
    answer:
      "Windows and Linux. Windows gets a regular installer, and Linux gets a .deb package for Ubuntu, Debian and the distros built on them.",
  },
  {
    question: "How do I open Spotlight?",
    answer: "Press alt + space from anywhere. Type what you're after and press enter to open the top result.",
  },
  {
    question: "What can Spotlight find?",
    answer:
      "Your apps, files and folders, as you type. It does quick sums on the spot too, and anything it can't find on your PC goes straight to a web search.",
  },
  {
    question: "What does the Caps Lock indicator do?",
    answer:
      "It shows a little badge right where you're typing the moment Caps Lock turns on, so you never TYPE A WHOLE SENTENCE LIKE THIS by accident.",
  },
  {
    question: "Is there a Mac version?",
    answer: "Nope, and there doesn't need to be. Macs already have both. lummo is for everyone else.",
  },
  {
    question: "How do I get updates?",
    answer: (
      <>
        Every new version goes up on{" "}
        <a href={RELEASES_URL} className="text-[#1076e8] underline-offset-2 hover:underline">
          GitHub
        </a>
        , and the download buttons on this page always point to the latest one.
      </>
    ),
  },
];

/** The common questions, one open at a time. */
export default function FaqSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      data-snap
      className="flex min-h-[100dvh] items-center justify-center bg-[#f5f5f7] px-6 py-24 sm:px-10"
    >
      <div className="w-full max-w-[56rem]">
        {/* no visible heading: the questions speak for themselves, but screen readers and search still get one */}
        <h2 id="faq-title" className="sr-only">
          Frequently asked questions
        </h2>
        <div className="border-t border-black/[0.08]">
          {FAQS.map(({ question, answer }, index) => (
            // sharing a name makes the browser close the open one when another opens
            <details key={question} name="faq" open={index === 0} className="faq-item group border-b border-black/[0.08]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-base text-[#202020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1076e8] sm:text-lg lg:text-xl [&::-webkit-details-marker]:hidden">
                {question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="shrink-0 text-[#8e8e8e] transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-[48rem] pr-12 pb-6 text-[0.9375rem] leading-[1.65] text-[#6e6e6e] sm:text-base lg:text-[1.0625rem]">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
      {/* inline, because the CSS build drops ::details-content rules; answers slide open where the
          browser can animate to auto height, and simply appear everywhere else */}
      <style>{`
        .faq-item { interpolate-size: allow-keywords }
        .faq-item::details-content {
          block-size: 0;
          overflow-y: clip;
          transition: block-size 0.35s cubic-bezier(0.22, 1, 0.36, 1), content-visibility 0.35s allow-discrete;
        }
        .faq-item[open]::details-content { block-size: auto }
        @media (prefers-reduced-motion: reduce) { .faq-item::details-content { transition: none } }
      `}</style>
    </section>
  );
}
