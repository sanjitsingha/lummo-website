import type { ReactNode } from "react";
import { RELEASES_URL } from "@/lib/release";

const FAQS: { question: string; answer: ReactNode }[] = [
  {
    question: "What is lummo?",
    answer:
      "A free productivity app for Windows and Linux. Press one hotkey and a search bar opens over whatever you're doing, so you can find apps and files, convert currencies and measurements, do quick math and get back anything you copied.",
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
    answer:
      "Press alt + space on Windows or ctrl + space on Linux, from anywhere. Type what you're after and press enter to open the top result.",
  },
  {
    question: "What can Spotlight find?",
    answer:
      "Your apps, files and folders, as you type. It also answers currency and measurement conversions and quick sums on the spot, and anything it can't find on your PC goes straight to a web search.",
  },
  {
    question: "What does the Caps Lock indicator do?",
    answer:
      "It shows a little badge right where you're typing the moment Caps Lock turns on, so you never TYPE A WHOLE SENTENCE LIKE THIS by accident.",
  },
  {
    question: "How does the clipboard history work?",
    answer:
      "lummo keeps your recent copies: text, images and files. On Windows, rest your mouse at the top centre of your screen to open them. On Linux, press tab in an empty Spotlight. Click a copy to put it back on your clipboard. It all stays on your PC, and copies delete themselves after a day by default.",
  },
  {
    question: "Is there a Mac version?",
    answer: "Not right now. lummo is built for Windows and Linux.",
  },
  {
    question: "How do I get updates?",
    answer: (
      <>
        Every new version goes up on{" "}
        <a href={RELEASES_URL} className="text-accent underline-offset-2 hover:underline">
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
      className="flex justify-center px-6 pb-28 sm:px-10 lg:pb-40"
    >
      <div className="w-full max-w-[44rem]">
        <h2 id="faq-title" className="mb-10 text-center text-[20px] font-medium tracking-[-0.015em] text-ink">
          Questions, answered
        </h2>
        <div className="border-t border-line">
          {FAQS.map(({ question, answer }, index) => (
            // sharing a name makes the browser close the open one when another opens
            <details key={question} name="faq" open={index === 0} className="faq-item group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-sm py-5 text-[15px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-base [&::-webkit-details-marker]:hidden">
                {question}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  className="shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-[48rem] pr-10 pb-6 text-[0.9375rem] leading-[1.65] text-ink-2">
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
