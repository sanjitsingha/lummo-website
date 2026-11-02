import { PILL_BUTTON } from "@/components/styles";

/**
 * Where "donate me" goes. TODO: replace with the real donation page
 * (Buy Me a Coffee, Ko-fi, UPI, GitHub Sponsors…); until then it stays on this section.
 */
const DONATE_URL = "#donate";
const external = DONATE_URL.startsWith("http");

export default function DonateSection() {
  return (
    <section id="donate" aria-labelledby="donate-title" className="pt-4 pb-28 sm:pb-40 lg:pb-60">
      <div className="mx-auto flex w-full max-w-[1512px] flex-col gap-10 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-20">
        <div className="max-w-[43rem]">
          <h2
            id="donate-title"
            className="text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.02em] text-black"
          >
            Like what I&apos;ve built?
            <span aria-hidden className="ml-[0.5em] inline-block text-[0.85em]">
              🥰
            </span>
          </h2>
          <p className="mt-6 text-[clamp(1.05rem,1.45vw,1.375rem)] leading-[1.65] text-[#8e8e8e] lg:mt-8">
            This little project is made with love, curiosity, and lots of late nights. If it&apos;s made your day a
            little easier, consider supporting its journey!
          </p>
        </div>
        <a
          href={DONATE_URL}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={`${PILL_BUTTON} w-full max-w-[20rem] shrink-0 sm:w-[18.75rem] lg:mr-16`}
        >
          donate me
        </a>
      </div>
    </section>
  );
}
