import SystemDownload from "@/components/SystemDownload";
import { getLatestRelease, RELEASES_URL } from "@/lib/release";

/**
 * Download lummo: one click fetches the .deb on Linux straight from the latest GitHub release, and
 * takes Windows visitors to the download page, which starts the installer.
 */
export default async function DownloadSection() {
  const release = await getLatestRelease();

  return (
    <section
      id="download"
      aria-labelledby="download-title"
      data-snap
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 text-center sm:px-10"
    >
      <h2
        id="download-title"
        className="max-w-[15ch] text-balance text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#434343] md:max-w-none"
      >
        Get lummo. It&apos;s{" "}
        {/* the logo's blue gradient, top to bottom like on the logo */}
        <span className="bg-[linear-gradient(180deg,#4fa2fd_0%,#0971e6_100%)] bg-clip-text text-transparent">
          completely free.
        </span>
      </h2>
      <p className="mt-3 max-w-[34ch] text-[clamp(1.05rem,1.5vw,1.5rem)] leading-[1.55] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none">
        The Mac&apos;s favourite combo, now delivering to Windows and Linux.
        <br className="hidden sm:inline" /> Spotlight and the Caps Lock indicator, served hot. It&apos;s on the house.
      </p>

      <div className="mt-12 flex w-full justify-center sm:mt-16">
        <SystemDownload linux={release?.deb ?? RELEASES_URL} placement="download-section" />
      </div>
    </section>
  );
}
