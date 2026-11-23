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
  "grid grid-cols-[minmax(0,1fr)_44px_112px] items-center gap-x-3 px-3 sm:grid-cols-[minmax(0,1fr)_72px_128px_16px] sm:px-3.5 lg:grid-cols-[minmax(0,1fr)_88px_176px_18px] lg:gap-x-4 lg:px-6";

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
      <article className="relative isolate grid overflow-hidden rounded-[18px] border border-white/12 bg-[#0b0b0f] lg:h-[620px] lg:grid-cols-[minmax(0,6fr)_minmax(0,7fr)]">
        <BlindsBackground color="#2563eb" />
        <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-16">
          <h3 className="text-[clamp(1.625rem,3.2vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.02em] text-ink">
            Skip the search when you already know.
          </h3>
          <p className="mt-5 max-w-[32rem] text-[clamp(1rem,1.3vw,1.25rem)] leading-[1.6] text-ink-2">
            Give any app, system command or setting its own global hotkey, or a short alias to type in Spotlight.
          </p>
        </div>
        <div className="relative px-3 pb-3 sm:px-6 sm:pb-6 lg:p-0">
          <ShortcutTable />
        </div>
      </article>
    </section>
  );
}

function ShortcutTable() {
  return (
    <div aria-hidden className="relative lg:absolute lg:top-[136px] lg:left-6 lg:w-[calc(100%+20px)]">
      <div className="overflow-hidden rounded-[14px] lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(90deg,#000_calc(100%_-_210px),transparent_calc(100%_-_50px)),linear-gradient(180deg,#000_150px,transparent_450px)] border border-white/[0.14] bg-[#171719] p-2.5 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] lg:p-4 select-none">
        <div className="mb-2.5 flex h-8 w-full max-w-[300px] items-center gap-2 rounded-[6px] bg-white/[0.06] px-2.5 text-[12.5px] text-[#636366] lg:mb-3 lg:h-10 lg:max-w-[360px] lg:px-3 lg:text-[15px]">
          <Glyph paths={["m21 21-4.34-4.34", "M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z"]} className="size-3.5 shrink-0 text-[#98989d] lg:size-4" />
          Search commands and settings
        </div>
        <div className="overflow-hidden rounded-[6px] bg-[#252528] lg:rounded-[8px]">
          <div className="flex h-11 items-center gap-2.5 bg-white/[0.06] px-3 sm:px-3.5 lg:h-[52px] lg:gap-3 lg:px-6">
            <Image src="/settings-icons/general.svg" alt="" width={24} height={24} unoptimized className="size-[18px] rounded-[3px] lg:size-6" />
            <span className="text-[13px] font-medium text-[#f5f5f7] lg:text-[16px]">System</span>
            <Glyph paths={["m9 18 6-6-6-6"]} className="size-3.5 rotate-90 text-[#f5f5f7] lg:size-4" strokeWidth={2.5} />
            <span className="flex-1" />
            <Checkbox />
          </div>
          <div className={`${COLUMNS} h-[26px] border-t-[0.5px] border-white/[0.08] text-[11.5px] font-medium text-[#98989d] lg:h-8 lg:text-[13.5px]`}>
            <span>Name</span>
            <span>Alias</span>
            <span>Hotkey</span>
            <span className="hidden sm:block" />
          </div>
          {SYSTEM_COMMANDS.map((command) => (
            <div key={command.name} className={`${COLUMNS} h-10 border-t-[0.5px] border-white/[0.08] lg:h-[50px]`}>
              <span className="flex min-w-0 items-center gap-2.5 lg:gap-3">
                <Tile glyph={command.glyph} tint="#636366" />
                <span className="truncate text-[12.5px] font-medium text-[#f5f5f7] lg:text-[15px]">{command.name}</span>
              </span>
              <span className={`truncate text-[12.5px] lg:text-[15px] ${command.alias ? "text-[#f5f5f7]" : "text-[#636366]"}`}>{command.alias ?? "Alias"}</span>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className={`truncate text-[12.5px] lg:text-[15px] ${command.hotkey ? "text-[#f5f5f7]" : "text-[#636366]"}`}>{command.hotkey ?? "Add Hotkey"}</span>
                {command.hotkey && <Glyph paths={["M18 6 6 18", "m6 6 12 12"]} className="size-3 shrink-0 text-[#98989d] lg:size-3.5" />}
              </span>
              <span className="hidden sm:flex">
                <Checkbox />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-11 items-center gap-2.5 rounded-[6px] bg-[#252528] px-3 sm:px-3.5 lg:h-[52px] lg:gap-3 lg:rounded-[8px] lg:px-6">
          <Tile glyph="apps" tint="#8E8E93" />
          <span className="text-[13px] font-medium text-[#f5f5f7] lg:text-[16px]">Applications</span>
          <Glyph paths={["m9 18 6-6-6-6"]} className="size-3.5 text-[#f5f5f7] lg:size-4" strokeWidth={2.5} />
          <span className="flex-1" />
          <Checkbox />
        </div>
      </div>
      {/* light on the top-left corner: a crisp ring, its bloom, and a soft glow spilling past the edge */}
      <span style={CORNER_RING} />
      <span style={{ position: "absolute", inset: 0, filter: "blur(4px)", opacity: 1, pointerEvents: "none" }}>
        <span style={CORNER_RING} />
      </span>
      <span
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
      className="flex size-[18px] shrink-0 items-center justify-center rounded-[2px] text-white shadow-[0_0.5px_1px_rgb(0_0_0/0.4)] lg:size-6 lg:rounded-[3px]"
      style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${tint} 82%, white) 0%, ${tint} 100%)` }}
    >
      <Glyph paths={GLYPHS[glyph]} className="size-[10px] lg:size-[14px]" />
    </span>
  );
}

function Checkbox() {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded-[3px] border border-white/45 bg-white/[0.08] text-[#f5f5f7] lg:size-[18px]">
      <Glyph paths={["M20 6 9 17l-5-5"]} className="size-[11px] lg:size-3" strokeWidth={3} />
    </span>
  );
}
