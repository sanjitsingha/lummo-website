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
      className="flex flex-col items-center px-6 py-28 text-center sm:px-10 lg:py-40"
    >
      <h2
        id="download-title"
        className="text-balance text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.03em] text-ink"
      >
        Get more done, <span className="text-ink-2">one hotkey at a time.</span>
      </h2>
      <div className="mt-9 flex w-full justify-center">
        <SystemDownload linux={release?.deb ?? RELEASES_URL} placement="download-section" />
      </div>
    </section>
  );
}
