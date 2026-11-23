import { APP_ICONS } from "@/components/AppIcons";
import SystemDownload from "@/components/SystemDownload";
import { getLatestRelease, RELEASES_URL } from "@/lib/release";

/** The first screen: lummo is a productivity app on a hotkey, with Spotlight at the centre under a beam of light. */
export default async function WhatIsLummo() {
  const release = await getLatestRelease();

  return (
    <section
      aria-labelledby="hero-title"
      style={{ paddingTop: "clamp(112px, 17dvh, 168px)" }}
      className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pb-[clamp(24px,5dvh,64px)] text-center sm:px-10"
    >
      <div aria-hidden className="hero-beam" />
      <h1 id="hero-title" className="sr-only">
        Everything you need, one hotkey away.
      </h1>
      <SpotlightPanel />
      <p className="relative -mt-[clamp(20px,5vw,72px)] max-w-[44rem] text-pretty text-[clamp(1rem,1.25vw,1.1875rem)] leading-[1.5] tracking-[-0.012em] text-ink-2">
        lummo puts search, clipboard history, conversions and quick math on a single shortcut.
      </p>
      <div className="mt-[clamp(14px,2.4dvh,24px)] flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
        <SystemDownload linux={release?.deb ?? RELEASES_URL} placement="hero" />
      </div>
    </section>
  );
}

const APPS = [
  { name: "Visual Studio Code", icon: APP_ICONS.vscode },
  { name: "Google Chrome", icon: APP_ICONS.chrome },
  { name: "Spotify", icon: APP_ICONS.spotify },
  { name: "Terminal", icon: APP_ICONS.terminal },
  { name: "Calculator", icon: APP_ICONS.calculator },
  { name: "Files", icon: APP_ICONS.files },
];

/** The panel melts into the page: the ellipse keeps the top and upper sides solid, and its curve fades the bottom corners first. */
const BOTTOM_FADE =
  "radial-gradient(ellipse 96% 90% at 50% 0%, #000 72%, rgb(0 0 0 / 0.72) 80%, rgb(0 0 0 / 0.3) 90%, transparent 100%)";

const TOP_SHINE =
  "linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.12) 18%, rgb(255 255 255 / 0.8) 50%, rgb(255 255 255 / 0.12) 82%, transparent 100%)";

const TOP_GLOW = "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(255 255 255 / 0.16) 0%, rgb(255 255 255 / 0.05) 55%, transparent 100%)";

/**
 * Spotlight as it opens, with the first application selected, melting into the page at the bottom.
 * A picture of the app, so it takes no input. Everything is sized to the panel's width (`cqw`), and
 * on short screens the panel gets smaller so the download button stays in view.
 */
function SpotlightPanel() {
  return (
    <div
      aria-hidden
      style={{ maxWidth: "min(960px, max(340px, calc((100dvh - 345px) * 2.25)))" }}
      className="@container w-full relative text-left select-none"
    >
      {/* a thin line of light along the top edge: brightest in the middle, gone at both ends */}
      <span style={{ position: "absolute", insetInline: 0, top: 0, zIndex: 1, height: 1, background: TOP_SHINE }} />
      {/* its glow: a tight bloom on the line, and a soft halo spilling above and into the panel */}
      <span style={{ position: "absolute", insetInline: "18%", top: -1, zIndex: 1, height: 3, background: TOP_SHINE, filter: "blur(3px)" }} />
      <span
        style={{
          position: "absolute",
          insetInline: "12%",
          top: "calc(clamp(70px, 13cqw, 130px) / -2)",
          zIndex: 1,
          height: "clamp(70px, 13cqw, 130px)",
          background: TOP_GLOW,
          pointerEvents: "none",
        }}
      />
      <div style={{ WebkitMaskImage: BOTTOM_FADE, maskImage: BOTTOM_FADE }} className="overflow-hidden rounded-[clamp(12px,1.6cqw,16px)] border border-white/[0.14] bg-[radial-gradient(120%_130%_at_42%_0%,#313134_0%,#222225_52%,#1b1b1e_100%)]">
        <div className="flex h-[clamp(56px,8.4cqw,80px)] items-center gap-[clamp(14px,1.9cqw,18px)] px-[clamp(20px,2.6cqw,26px)]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-[clamp(21px,2.9cqw,28px)] shrink-0 text-[#a1a1a6]">
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
          <span className="truncate text-[clamp(18px,2.7cqw,26px)] tracking-[-0.01em] text-[#85858b]">Search anything...</span>
        </div>
        <div className="mx-[clamp(8px,1.1cqw,10px)] border-t border-white/[0.09] pb-2">
          <p className="px-[clamp(12px,1.5cqw,14px)] pt-[clamp(10px,1.4cqw,14px)] pb-[clamp(4px,0.7cqw,7px)] text-[clamp(11px,1.4cqw,14px)] tracking-[0.01em] text-[#8e8e93]">
            Applications
          </p>
          {APPS.map(({ name, icon }, index) => (
            <div
              key={name}
              className={`flex h-[clamp(46px,6.9cqw,66px)] items-center gap-[clamp(12px,1.7cqw,16px)] rounded-[clamp(6px,0.9cqw,9px)] px-[clamp(10px,1.5cqw,14px)] ${index === 0 ? "bg-white/[0.1]" : ""}`}
            >
              <span className="flex size-[clamp(26px,3.75cqw,36px)] shrink-0 items-center justify-center [&>svg]:size-full">{icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[clamp(14px,2cqw,19px)] leading-[1.25] text-[#f5f5f7]">{name}</span>
                <span className={`block text-[clamp(11px,1.45cqw,14px)] leading-[1.3] ${index === 0 ? "text-[#c7c7cc]" : "text-[#8e8e93]"}`}>
                  Application
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
