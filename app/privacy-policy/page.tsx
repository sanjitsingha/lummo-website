import type { Metadata } from "next";
import type { ReactNode } from "react";
import BlindsBackground from "@/components/BlindsBackground";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

const CONTACT_EMAIL = "contact@lummo.space";
const LAST_UPDATED = "November 24, 2026";

const title = "Privacy Policy - lummo";
const description = "What the lummo app and website collect, what stays on your device, and how to turn usage statistics off.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { title, description, url: "/privacy-policy", siteName: "lummo", type: "article" },
};

/** The policy as plain white text on black, under the hero's blinds. */
export default function PrivacyPolicyPage() {
  return (
    <div className="relative isolate flex min-h-[100dvh] flex-col bg-black text-white">
      {/* the hero's blinds, across the top of the page and fading into the black */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(360px,60svh,600px)]">
        <BlindsBackground />
      </div>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[44rem] flex-1 px-5 pt-32 pb-24 text-base leading-[1.7] sm:px-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2">Last updated {LAST_UPDATED}</p>
        <div className="mt-10 space-y-10">
            <Section id="about" title="About this policy">
              <p>
                This policy covers the lummo desktop app for Windows and Linux and the website at lummo.space. lummo is an
                independent project. You don&apos;t need an account to use either one.
              </p>
            </Section>

            <Section id="on-your-device" title="What stays on your device">
              <p>The app saves these in its data folder on your computer. They are not sent to us:</p>
              <Bullets
                items={[
                  "Your search history, recent items and settings, including aliases and hotkeys.",
                  "The index of your apps, files and folders that makes search fast.",
                  "Your clipboard history, including copied text, links, images and files.",
                  "The latest exchange rates, so conversions work offline.",
                ]}
              />
              <p>
                Each clipboard item is deleted after the retention time you choose in Settings. The default is one day. Copies
                that a password manager marks as secret or private are never read or saved.
              </p>
            </Section>

            <Section id="usage-statistics" title="Usage statistics">
              <p>
                To understand how lummo is used, the app sends anonymous statistics to{" "}
                <ExternalLink href="https://aptabase.com">Aptabase</ExternalLink>. This is <strong>on by default</strong>{" "}
                and you can turn it off in Settings → About.
              </p>
              <div className="space-y-4">
                <Panel title="What is sent">
                  <Bullets
                    items={[
                      "That the app was installed or started, and how it was started",
                      "Whether Spotlight and the Caps Lock indicator are on",
                      "Daily counts of Spotlight opens and of the kinds of results opened",
                      "How often the Caps Lock indicator appeared or found no text cursor",
                      "App version, operating system and version, and locale",
                      "On Linux, the session type and desktop",
                    ]}
                  />
                </Panel>
                <Panel title="What is never sent">
                  <Bullets
                    items={[
                      "Anything you type or search for",
                      "Names of the results you open",
                      "File names, folders or paths",
                      "Anything from your clipboard",
                      "Your name, email or an account",
                    ]}
                  />
                </Panel>
              </div>
            </Section>

            <Section id="connections" title="When the app goes online">
              <p>Besides the statistics above, the app connects to the internet to:</p>
              <Bullets
                items={[
                  <>
                    <strong>Get exchange rates</strong> from lummo.space, at most once a day.
                  </>,
                  <>
                    <strong>Check for and download updates</strong> from GitHub.
                  </>,
                  <>
                    <strong>Search the web</strong>, only when you choose it. Your search then opens
                    on Google in your browser, under Google&apos;s own privacy policy.
                  </>,
                ]}
              />
              <p>Like any web request, these connections show the receiving service your IP address and basic technical details.</p>
            </Section>

            <Section id="website" title="This website">
              <p>
                lummo.space is hosted on <ExternalLink href="https://vercel.com/legal/privacy-policy">Vercel</ExternalLink>, which
                processes standard request data such as IP addresses to serve the site. We use{" "}
                <ExternalLink href="https://umami.is/privacy">Umami</ExternalLink> to measure page visits and download clicks,
                including which system was downloaded and which button was used.
              </p>
              <p>The site has no sign-up or contact forms and doesn&apos;t set advertising cookies. Linux downloads are served by GitHub.</p>
            </Section>

            <Section id="sharing" title="Selling and sharing">
              <p>
                We don&apos;t sell your data or use it for advertising. Information is handled only by the services named in this
                policy, to run lummo, or where the law requires it.
              </p>
            </Section>

            <Section id="choices" title="Your choices">
              <Bullets
                items={[
                  "Turn off usage statistics in Settings → About. Counts not yet sent are discarded.",
                  "Clear your search history or cache in Settings → General.",
                  "Change how long clipboard items are kept in Settings.",
                  "Remove everything by uninstalling lummo and deleting its data folder.",
                ]}
              />
              <p>
                For a question or request about your data, email us. Because the statistics are anonymous, we usually can&apos;t link
                them to a particular person.
              </p>
            </Section>

            <Section id="children" title="Children">
              <p>lummo isn&apos;t directed at children under 13, and we don&apos;t knowingly collect their personal information.</p>
            </Section>

            <Section id="changes" title="Changes">
              <p>If this policy changes, we&apos;ll update it here and change the date at the top of the page.</p>
            </Section>

            <Section id="contact" title="Contact">
              <p>Questions about privacy? We&apos;d be glad to help.</p>
              <p>
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </Section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="space-y-3">
      <h2 id={`${id}-title`} className="text-xl font-bold">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 font-bold">{title}</h3>
      {children}
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
      {children}
    </a>
  );
}
