import { PILL_BUTTON } from "@/components/styles";
import { getLatestRelease, RELEASES_URL } from "@/lib/release";

/**
 * Download lummo: one click fetches the installer for Windows or Linux
 * straight from the latest GitHub release.
 */
export default async function DownloadSection() {
  const release = await getLatestRelease();

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      className="flex scroll-mt-6 flex-col items-center px-6 pt-20 pb-28 text-center sm:px-10 sm:pt-28 sm:pb-36 lg:pt-32 lg:pb-44"
    >
      <h2
        id="download-title"
        className="max-w-[15ch] text-balance text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#434343] md:max-w-none"
      >
        Get lummo. It&apos;s{" "}
        <span className="bg-[linear-gradient(90deg,#3446fa_0%,#5a80fe_100%)] bg-clip-text text-transparent">
          completely free.
        </span>
      </h2>
      <p className="mt-3 max-w-[34ch] text-[clamp(1.05rem,1.5vw,1.5rem)] leading-[1.55] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none">
        No trial, no account, no catch.
        <br className="hidden sm:inline" /> Download it, hit the shortcut and start finding.
      </p>

      <div className="mt-12 flex w-full max-w-[42rem] flex-col items-center gap-3 sm:mt-16 sm:flex-row sm:justify-center sm:gap-4">
        <PlatformButton name="windows" href={release?.windows ?? RELEASES_URL} />
        <PlatformButton name="linux" href={release?.deb ?? RELEASES_URL} />
      </div>
    </section>
  );
}

function PlatformButton({ name, href }: { name: string; href: string }) {
  return (
    // GitHub sends the installer as an attachment, so this one click downloads it
    <a href={href} className={`${PILL_BUTTON} w-full max-w-[20rem]`}>
      download for {name}
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
        <path d="M12 4v11" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 20h14" />
      </svg>
    </a>
  );
}
