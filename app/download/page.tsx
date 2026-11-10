import type { Metadata } from "next";
import InstallSteps from "@/components/InstallSteps";
import Key from "@/components/Key";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import StartDownload from "@/components/StartDownload";
import { getLatestRelease, RELEASES_URL, REPO_URL } from "@/lib/release";

export const metadata: Metadata = {
  title: "Downloading lummo for Windows",
  description: "Your lummo download has started. Here's how to open it on Windows in three clicks.",
  alternates: { canonical: "/download" },
  // it starts a download, so it's no page to land on from a search
  robots: { index: false, follow: true },
};

/**
 * Where Windows visitors go from the download buttons: the installer starts downloading, and the
 * page walks them past Windows' warning for new apps, which is where most people gave up.
 */
export default async function DownloadPage() {
  const release = await getLatestRelease();
  const url = release?.windows ?? null;
  // the installer's own name (Lummo_0.1.28_x64-setup.exe), as the browser and Windows will show it
  const file = url ? decodeURIComponent(url.slice(url.lastIndexOf("/") + 1)) : "the lummo installer";

  return (
    <div className="flex min-h-[100dvh] flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center px-6 pt-8 pb-24 text-center sm:px-10 lg:pt-14">
        {url && <StartDownload url={url} />}
        <h1 className="max-w-[16ch] text-balance text-[clamp(2rem,3.6vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#434343] md:max-w-none">
          {url ? "Your download " : "Get lummo "}
          <span className="bg-[linear-gradient(180deg,#4fa2fd_0%,#0971e6_100%)] bg-clip-text text-transparent">
            {url ? "has started." : "for Windows."}
          </span>
        </h1>
        <p className="mt-3 max-w-[36ch] text-[clamp(1.05rem,1.5vw,1.5rem)] leading-[1.55] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none">
          Windows will ask you to double-check it before it runs.
          <br className="hidden sm:inline" /> Here&apos;s exactly what to click.
        </p>
        <p className="mt-5 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[15px] text-[#8e8e8e]">
          <span className="whitespace-nowrap">
            {url ? "Didn't start? " : null}
            <a href={url ?? RELEASES_URL} className="text-[#1076e8] underline-offset-2 hover:underline">
              {url ? "Download again" : "Download from GitHub"}
            </a>
          </span>
          <span aria-hidden className="text-[#c7c7cc]">
            ·
          </span>
          <span className="whitespace-nowrap">
            On Linux?{" "}
            <a href={release?.deb ?? RELEASES_URL} className="text-[#1076e8] underline-offset-2 hover:underline">
              Get the .deb
            </a>
          </span>
        </p>

        <div className="mt-12 flex w-full justify-center lg:mt-16">
          <InstallSteps file={file} />
        </div>

        <p className="mt-12 max-w-[36ch] text-[clamp(1.05rem,1.4vw,1.375rem)] leading-[1.7] tracking-[-0.01em] text-[#6e6e6e] sm:max-w-none lg:mt-16">
          Then lummo is ready. Just hit{" "}
          <span className="whitespace-nowrap">
            <Key>alt</Key>
            <span className="mx-[0.35em] text-[#a1a1a1]">+</span>
            <Key wide>space</Key>
          </span>
        </p>

        <aside className="mt-16 w-full max-w-[44rem] rounded-[28px] bg-[#f5f5f7] px-6 py-7 text-left sm:px-9 sm:py-8">
          <h2 className="text-[17px] text-[#202020] lg:text-[18px]">Why does Windows warn about lummo?</h2>
          <p className="mt-2 text-[15px] leading-[1.65] text-[#6e6e6e]">
            Windows shows that blue box for apps it hasn&apos;t seen many times yet, and lummo is brand new. It
            isn&apos;t a virus: lummo is free and open source, so anyone can read every line of its code on{" "}
            <a href={REPO_URL} className="text-[#1076e8] underline-offset-2 hover:underline">
              GitHub
            </a>
            .
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-[#6e6e6e]">
            Using Microsoft Edge? If it says the file &ldquo;isn&apos;t commonly downloaded&rdquo;, click the{" "}
            <span className="text-[#434343]">⋯</span> next to it and choose{" "}
            <span className="text-[#434343]">Keep</span>, then{" "}
            <span className="text-[#434343]">Show more</span> and{" "}
            <span className="text-[#434343]">Keep anyway</span>.
          </p>
        </aside>
      </main>
      <SiteFooter />
    </div>
  );
}
