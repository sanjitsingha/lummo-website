import Image from "next/image";
import type { CSSProperties } from "react";
import BlindsBackground from "@/components/BlindsBackground";

/** The app's own glyphs (Lucide), as path data. */
const SPEAKER = "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z";
const GLYPHS = {
  lock: ["M7 11V7a5 5 0 0 1 10 0v4", "M5 11h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"],
  logOut: ["m16 17 5-5-5-5", "M21 12H9", "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"],
  next: ["M21 4v16", "M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"],
  play: ["M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"],
  restart: ["M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", "M21 3v5h-5"],
  power: ["M12 2v10", "M18.4 6.6a9 9 0 1 1-12.77.04"],
  moon: ["M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"],
  mute: [SPEAKER, "m16.5 14.5 5-5", "m16.5 9.5 5 5"],
  volumeDown: [SPEAKER, "M16 9a5 5 0 0 1 0 6"],
  volumeUp: [SPEAKER, "M16 9a5 5 0 0 1 0 6", "M19.364 18.364a9 9 0 0 0 0-12.728"],
  apps: ["M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M10 4v4", "M2 8h20", "M6 4v4"],
};

type Command = { name: string; glyph: keyof typeof GLYPHS; alias?: string; hotkey?: string };

/** Real System commands, A to Z as on the Shortcut page. The aliases and hotkeys are examples. */
const SYSTEM_COMMANDS: Command[] = [
  { name: "Lock Screen", glyph: "lock", alias: "lock", hotkey: "Ctrl + Alt + L" },
  { name: "Log Out", glyph: "logOut" },
  { name: "Next Track", glyph: "next", alias: "next", hotkey: "Ctrl + Alt + N" },
  { name: "Play or Pause Media", glyph: "play", alias: "play", hotkey: "Ctrl + Alt + P" },
  { name: "Restart", glyph: "restart" },
  { name: "Shut Down", glyph: "power", alias: "off" },
  { name: "Sleep", glyph: "moon", alias: "zz", hotkey: "Ctrl + Alt + S" },
  { name: "Toggle Mute", glyph: "mute", alias: "mute", hotkey: "Ctrl + Alt + M" },
  { name: "Volume Down", glyph: "volumeDown", hotkey: "Ctrl + Alt + [" },
  { name: "Volume Up", glyph: "volumeUp", hotkey: "Ctrl + Alt + ]" },
];

const COLUMNS =
  "grid grid-cols-[minmax(0,1fr)_88px_176px_18px] items-center gap-x-4 px-6";

/** A 1px ring on the panel's rounded edge, lit only around the top-left corner. */
const CORNER_RING: CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: 1.5,
  borderRadius: 14,
  background: "radial-gradient(560px 340px at 0 0, #fff 0%, rgb(255 255 255 / 0.8) 40%, rgb(255 255 255 / 0.25) 75%, transparent 100%)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  pointerEvents: "none",
};

/** Below the feature cards: a still of the Shortcut page, where any command gets an alias and a hotkey. */
export default function ShortcutsSection() {
  return (
    <section id="shortcuts" aria-labelledby="shortcuts-title" className="mx-auto w-full max-w-[1600px] px-3 pt-24 sm:px-5 lg:pt-36">
      <h2 id="shortcuts-title" className="mb-12 text-center text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium tracking-[-0.02em] text-ink lg:mb-16">
        Every command. <span className="text-ink-2">Your keys.</span>
      </h2>
      <article className="relative isolate grid overflow-hidden rounded-[18px] border border-white/12 bg-[#0b0b0f] max-lg:bg-black lg:h-[620px] lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)]">
        <BlindsBackground color="#2563eb" shine={0.5} shineWidth={0.5} phoneWidth={580} phoneShine={0.28} />
        {/* phones and tablets: the lower card sinks into black, for the text to sit on */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-[1] h-[62%] bg-[linear-gradient(180deg,transparent_0%,#000_45%)] lg:hidden" />
        <div className="relative flex flex-col justify-center p-6 max-lg:order-2 max-lg:pt-2 sm:p-10 sm:max-lg:pt-2 lg:p-16">
          <h3 className="text-[clamp(1.625rem,3.2vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.02em] text-ink max-sm:text-[21px] max-sm:leading-[1.2]">
            Skip the search when you already know.
          </h3>
          <p className="mt-5 max-w-[32rem] text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-ink-2 max-sm:mt-2.5 max-sm:text-[14px] max-sm:leading-[1.55]">
            Give any app, system command or setting its own global hotkey, or a short alias to type in Spotlight.
          </p>
        </div>
        <div className="relative h-[360px] max-lg:order-1 sm:h-[440px] lg:h-auto">
          <ShortcutTable />
        </div>
      </article>
    </section>
  );
}

function ShortcutTable() {
  return (
    // phones and tablets get the same full-size table, cropped by the card on the right and bottom
    <div aria-hidden className="absolute top-6 left-5 w-[max(620px,calc(100vw_-_20px))] sm:left-10 lg:top-[136px] lg:left-6 lg:w-[calc(100%+20px)]">
      {/* phones and tablets: black behind the table, so where it fades the blinds never show through it */}
      <span className="absolute inset-0 rounded-[14px] bg-black [mask-image:linear-gradient(180deg,#000_280px,transparent_380px)] sm:[mask-image:linear-gradient(180deg,#000_340px,transparent_460px)] lg:hidden" />
      <div className="overflow-hidden rounded-[14px] border border-white/[0.14] bg-[#171719] p-4 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] select-none [mask-composite:intersect] [mask-image:linear-gradient(90deg,#000_calc(100vw_-_150px),transparent_calc(100vw_-_52px)),linear-gradient(180deg,#000_190px,transparent_340px)] sm:[mask-image:linear-gradient(90deg,#000_calc(100vw_-_200px),transparent_calc(100vw_-_84px)),linear-gradient(180deg,#000_230px,transparent_420px)] lg:[mask-image:linear-gradient(90deg,#000_calc(100%_-_210px),transparent_calc(100%_-_50px)),linear-gradient(180deg,#000_150px,transparent_450px)]">
        <div className="mb-3 flex h-10 w-full max-w-[360px] items-center gap-2 rounded-[6px] bg-white/[0.06] px-3 text-[15px] text-[#636366]">
          <Glyph paths={["m21 21-4.34-4.34", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"]} className="size-4 shrink-0 text-[#98989d]" />
          Search commands and settings
        </div>
        <div className="overflow-hidden rounded-[8px] bg-[#252528]">
          <div className="flex h-[52px] items-center gap-3 bg-white/[0.06] px-6">
            <Image src="/settings-icons/general.svg" alt="" width={24} height={24} unoptimized className="size-6 rounded-[3px]" />
            <span className="text-[16px] font-medium text-[#f5f5f7]">System</span>
            <Glyph paths={["m9 18 6-6-6-6"]} className="size-4 rotate-90 text-[#f5f5f7]" strokeWidth={2.5} />
            <span className="flex-1" />
            <Checkbox />
          </div>
          <div className={`${COLUMNS} h-8 border-t-[0.5px] border-white/[0.08] text-[13.5px] font-medium text-[#98989d]`}>
            <span>Name</span>
            <span>Alias</span>
            <span>Hotkey</span>
            <span />
          </div>
          {SYSTEM_COMMANDS.map((command) => (
            <div key={command.name} className={`${COLUMNS} h-[50px] border-t-[0.5px] border-white/[0.08]`}>
              <span className="flex min-w-0 items-center gap-3">
                <Tile glyph={command.glyph} tint="#636366" />
                <span className="truncate text-[15px] font-medium text-[#f5f5f7]">{command.name}</span>
              </span>
              <span className={`truncate text-[15px] ${command.alias ? "text-[#f5f5f7]" : "text-[#636366]"}`}>{command.alias ?? "Alias"}</span>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className={`truncate text-[15px] ${command.hotkey ? "text-[#f5f5f7]" : "text-[#636366]"}`}>{command.hotkey ?? "Add Hotkey"}</span>
                {command.hotkey && <Glyph paths={["M18 6 6 18", "m6 6 12 12"]} className="size-3.5 shrink-0 text-[#98989d]" />}
              </span>
              <span className="flex">
                <Checkbox />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-[52px] items-center gap-3 rounded-[8px] bg-[#252528] px-6">
          <Tile glyph="apps" tint="#8E8E93" />
          <span className="text-[16px] font-medium text-[#f5f5f7]">Applications</span>
          <Glyph paths={["m9 18 6-6-6-6"]} className="size-4 text-[#f5f5f7]" strokeWidth={2.5} />
          <span className="flex-1" />
          <Checkbox />
        </div>
      </div>
      {/* light on the top-left corner: a crisp ring, its bloom, and a soft glow spilling past the edge */}
      <span className="max-lg:p-px! max-lg:opacity-55" style={CORNER_RING} />
      <span className="max-lg:hidden" style={{ position: "absolute", inset: 0, filter: "blur(4px)", opacity: 1, pointerEvents: "none" }}>
        <span style={CORNER_RING} />
      </span>
      <span
        className="max-lg:opacity-40"
        style={{
          position: "absolute",
          left: -190,
          top: -120,
          width: 380,
          height: 240,
          background: "radial-gradient(closest-side, rgb(255 255 255 / 0.13) 0%, rgb(255 255 255 / 0.04) 55%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function Glyph({ paths, className, strokeWidth = 2 }: { paths: readonly string[]; className: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** The app's icon tile: a white glyph on a soft vertical tint. */
function Tile({ glyph, tint }: { glyph: keyof typeof GLYPHS; tint: string }) {
  return (
    <span
      className="flex size-6 shrink-0 items-center justify-center rounded-[3px] text-white shadow-[0_0.5px_1px_rgb(0_0_0/0.4)]"
      style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${tint} 82%, white) 0%, ${tint} 100%)` }}
    >
      <Glyph paths={GLYPHS[glyph]} className="size-[14px]" />
    </span>
  );
}

function Checkbox() {
  return (
    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border border-white/45 bg-white/[0.08] text-[#f5f5f7]">
      <Glyph paths={["M20 6 9 17l-5-5"]} className="size-3" strokeWidth={3} />
    </span>
  );
}
