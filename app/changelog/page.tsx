import type { Metadata } from "next";
import BlindsBackground from "@/components/BlindsBackground";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { CHANGELOG } from "@/lib/changelog";

const title = "Changelog - lummo";
const description = "Every lummo release and what changed in it.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/changelog" },
  openGraph: { title, description, url: "/changelog", siteName: "lummo", type: "article" },
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date));

/** Every release, newest first, as plain white text on black under the hero's blinds. */
export default function ChangelogPage() {
  return (
    <div className="relative isolate flex min-h-[100dvh] flex-col bg-black text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(360px,60dvh,600px)]">
        <BlindsBackground />
      </div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[52rem] flex-1 px-5 pt-32 pb-24 text-base leading-[1.7] sm:px-8">
        <h1 className="text-3xl font-bold">Changelog</h1>
        <p className="mt-2">What&apos;s new in lummo.</p>
        <div className="mt-12 space-y-12">
          {CHANGELOG.map(({ version, date, changes }) => (
            <article key={version} id={`v${version}`} className="grid gap-2 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-8">
              <div>
                <h2 className="text-xl font-bold">v{version}</h2>
                <time dateTime={date} className="text-sm">
                  {formatDate(date)}
                </time>
              </div>
              <ul className="list-disc space-y-1 pl-5 sm:pt-0.5">
                {changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
