"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Part = string | { caps: string };
type Badge = "hidden" | "on" | "off";

/** What's typed in the Notepad; the `caps` parts are typed with Caps Lock on. */
const SCRIPT: Part[] = [
  "Notes for tomorrow\n\nSend the invoice by ",
  { caps: "FRIDAY" },
  " and\ncall the client ",
  { caps: "ASAP." },
];
/** With reduced motion: one still moment, Caps Lock on. */
const STILL_TEXT = "Notes for tomorrow\n\nSend the invoice by FRIDAY";

const RHYTHM = [0, 28, -14, 40, 8, -18, 52, 4, -8, 30];
const typingDelay = (char: string, index: number) => 72 + RHYTHM[index % RHYTHM.length] + (char === " " ? 34 : 0) + (char === "\n" ? 220 : 0);

/** Fine film grain over the wallpaper, as a small tile of grey noise. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

const FRAME_FADE = "linear-gradient(180deg, #000 0%, #000 68%, rgb(0 0 0 / 0.58) 82%, rgb(0 0 0 / 0.16) 93%, transparent 100%)";
/** Pure black in small steps along the bottom. The right side has no fade: the screen's edge simply crops the window. */
const PHONE_SHADE =
  "linear-gradient(180deg, transparent 68%, rgb(0 0 0 / 0.1) 73%, rgb(0 0 0 / 0.28) 78%, rgb(0 0 0 / 0.5) 83%, rgb(0 0 0 / 0.72) 88%, rgb(0 0 0 / 0.88) 93%, #000 97%)";
/** Phones: the wallpaper is already pure black where the window starts to fade, so no color shows in the half-faded part. */
const WALLPAPER_SHADE =
  "linear-gradient(180deg, transparent 16%, rgb(0 0 0 / 0.2) 24%, rgb(0 0 0 / 0.5) 34%, rgb(0 0 0 / 0.8) 44%, rgb(0 0 0 / 0.95) 52%, #000 60%)";
const TOP_SHINE =
  "linear-gradient(90deg, transparent 0%, rgb(255 255 255 / 0.08) 16%, rgb(255 255 255 / 0.5) 50%, rgb(255 255 255 / 0.08) 84%, transparent 100%)";

const MOTION = `
@keyframes caps-caret { 0%, 48% { opacity: 1 } 52%, 100% { opacity: 0 } }
@keyframes caps-pop { from { opacity: 0; transform: scale(0.86) } to { opacity: 1; transform: scale(1) } }
.caps-caret { animation: caps-caret 1.06s linear infinite }
.caps-pop { animation: caps-pop 170ms cubic-bezier(0.2, 0.8, 0.2, 1) both }
@media (prefers-reduced-motion: reduce) { .caps-caret, .caps-pop { animation: none } }
`;

/** Below the features: a screen fading into the page, with Caps Lock at work in a Notepad. */
export default function CapsLockShowcase() {
  return (
    <section aria-labelledby="caps-title" className="mx-auto w-full max-w-[1200px] px-3 pt-24 sm:px-5 lg:pt-36">
      <style href="caps-showcase-motion" precedence="default">
        {MOTION}
      </style>
      <Screen />
      {/* sits on the dark bottom of the screen, where it has faded into the page */}
      <h2 id="caps-title" className="relative -mt-[clamp(40px,4.5vw,60px)] text-center text-[clamp(1.25rem,1.8vw,1.625rem)] font-medium tracking-[-0.02em] text-ink">
        Caps Lock, <span className="text-ink-2">right where you type.</span>
      </h2>
    </section>
  );
}

/** The laptop screen. On phones it keeps a full 760px, cropped by the right edge and fading at the bottom. */
function Screen() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [badge, setBadge] = useState<Badge>("hidden");
  const [appearance, setAppearance] = useState(0);
  const [clearing, setClearing] = useState(false);

  // plays only while on screen, and starts over when scrolled back to
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: window.innerWidth < 640 ? 0.15 : 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (callback: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        callback();
      }, ms);
      timers.add(id);
    };
    // a cancelled wait never resolves, which stops the loop where it is
    const wait = (ms: number) => new Promise<void>((resolve) => later(resolve, ms));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      later(() => {
        setText(STILL_TEXT);
        setAppearance(1);
        setBadge("on");
      }, 0);
    } else {
      (async () => {
        for (;;) {
          await wait(700);
          let typed = 0;
          for (const part of SCRIPT) {
            const isCaps = typeof part !== "string";
            if (isCaps) {
              await wait(320);
              setAppearance((n) => n + 1);
              setBadge("on");
              await wait(420);
            }
            for (const char of Array.from(isCaps ? part.caps : part)) {
              setText((current) => current + char);
              await wait(typingDelay(char, typed++));
            }
            if (isCaps) {
              // stays on while the capitals are on show, longest for the last word
              await wait(part === SCRIPT[SCRIPT.length - 1] ? 2800 : 800);
              setBadge("off");
              await wait(560);
              setBadge("hidden");
            }
          }
          await wait(300);
          setClearing(true);
          await wait(260);
          setText("");
          setClearing(false);
        }
      })();
    }

    return () => {
      timers.forEach(clearTimeout);
      setText("");
      setBadge("hidden");
      setClearing(false);
    };
  }, [active]);

  return (
    <div
      ref={root}
      role="img"
      aria-label="A Notepad window where a small Caps Lock badge appears at the text cursor while capital letters are typed"
      className="max-sm:h-[500px]! max-sm:w-[760px]"
      style={{ position: "relative", height: "clamp(400px, 44vw, 560px)", userSelect: "none" }}
    >
      <div
        className="max-sm:[-webkit-mask-image:none]! max-sm:[background:#000]! max-sm:[mask-image:none]!"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          padding: 8,
          borderRadius: 18,
          border: "1px solid rgb(255 255 255 / 0.13)",
          background: "linear-gradient(180deg, #151518 0%, #0c0c0e 100%)",
          WebkitMaskImage: FRAME_FADE,
          maskImage: FRAME_FADE,
        }}
      >
        <div
          style={{
            position: "relative",
            height: "calc(100% + 24px)",
            overflow: "hidden",
            borderRadius: 11,
            border: "1px solid rgb(255 255 255 / 0.1)",
            background: "#050506",
          }}
        >
          <Wallpaper />
          <Notepad text={text} badge={badge} appearance={appearance} clearing={clearing} />
        </div>
      </div>
      <span className="inset-x-0 max-sm:right-auto max-sm:w-[calc(100vw-24px)]" style={{ position: "absolute", top: 0, height: 1, background: TOP_SHINE }} />
      {/* phones: solid black laid over the bottom, so the crop has no see-through or noisy fade */}
      <span aria-hidden className="pointer-events-none absolute -inset-px hidden max-sm:block" style={{ background: PHONE_SHADE }} />
    </div>
  );
}

function Wallpaper() {
  return (
    <>
      <Image
        src="/lummo/caps-wallpaper.jpg"
        alt=""
        fill
        sizes="(min-width: 1240px) 1184px, (min-width: 640px) 100vw, 760px"
        draggable={false}
        style={{ objectFit: "cover", objectPosition: "50% 42%" }}
      />
      <div
        className="max-sm:hidden"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN,
          backgroundSize: "220px 220px",
          opacity: 0.14,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-0 hidden max-sm:block" style={{ background: WALLPAPER_SHADE }} />
    </>
  );
}

const WINDOW_LINE = "1px solid rgb(255 255 255 / 0.08)";
/** Cuts a background down to a 1px ring that follows the element's rounded corners. */
const RING: CSSProperties = {
  position: "absolute",
  padding: 1,
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  pointerEvents: "none",
};
const NOTEPAD_SHINE: CSSProperties = {
  ...RING,
  inset: 0,
  padding: 1.5,
  borderRadius: "10px 10px 0 0",
  background: "radial-gradient(280px 190px at var(--shine-x, 100%) 0, #fff 0%, rgb(255 255 255 / 0.45) 42%, transparent 100%)",
};
/** The Caps Lock box: light on its top-right corner only, with no glow or shadow. */
const BADGE_SHINE: CSSProperties = {
  ...RING,
  inset: -1,
  borderRadius: 9,
  background: "radial-gradient(28px 28px at 100% 0, rgb(255 255 255 / 0.95) 0%, rgb(255 255 255 / 0.35) 45%, transparent 100%)",
};

function Notepad({ text, badge, appearance, clearing }: { text: string; badge: Badge; appearance: number; clearing: boolean }) {
  return (
    // on phones the window keeps a full 640px and runs off the right with the laptop screen, its shine on the corner in view
    <div
      className="left-1/2 w-[min(780px,calc(100%-20px))] -translate-x-1/2 max-sm:top-[60px]! max-sm:left-8 max-sm:w-[640px] max-sm:translate-x-0 max-sm:[--shine-x:0%]"
      style={{
        position: "absolute",
        top: "clamp(28px, 6vw, 84px)",
        bottom: 0,
      }}
    >
      <div
        style={{
          height: "100%",
          overflow: "hidden",
          borderRadius: "10px 10px 0 0",
          border: "1px solid rgb(255 255 255 / 0.13)",
          background: "#1e1e21",
          boxShadow: "0 30px 80px -16px rgb(0 0 0 / 0.9)",
          textAlign: "left",
        }}
      >
      {/* the tab strip */}
      <div style={{ display: "flex", height: 42, alignItems: "flex-end", gap: 6, padding: "0 0 0 10px", background: "#171719" }}>
        <div
          style={{
            display: "flex",
            height: 35,
            width: "min(190px, 46%)",
            alignItems: "center",
            gap: 8,
            padding: "0 10px",
            borderRadius: "7px 7px 0 0",
            background: "#1e1e21",
            fontSize: 13,
            color: "#e8e8ea",
          }}
        >
          <NotepadGlyph />
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Untitled</span>
          <Stroke d="M6 6l12 12M18 6 6 18" color="#a1a1a6" />
        </div>
        <span style={{ display: "flex", height: 35, alignItems: "center", padding: "0 4px" }}>
          <Stroke d="M12 5v14M5 12h14" color="#c7c7cc" />
        </span>
        <span style={{ display: "flex", height: "100%", marginLeft: "auto", alignItems: "center", gap: 22, padding: "0 16px" }}>
          <Stroke d="M5 12h14" color="#c7c7cc" />
          <Stroke d="M6 6h12v12H6z" color="#c7c7cc" />
          <Stroke d="M6 6l12 12M18 6 6 18" color="#c7c7cc" />
        </span>
      </div>
      {/* the menu */}
      <div style={{ display: "flex", height: 36, alignItems: "center", gap: 22, padding: "0 18px", borderBottom: WINDOW_LINE, fontSize: 13, color: "#d4d4d8" }}>
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
      </div>
      {/* the page */}
      {/* on phones the text wraps early, so the cursor and its badge never reach the cropped side */}
      <div
        className="max-sm:max-w-[calc(100vw-130px)] max-sm:text-[16px]!"
        style={{
          padding: "clamp(16px, 2vw, 24px) clamp(16px, 2.2vw, 28px)",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          fontFamily: 'Consolas, "Cascadia Mono", ui-monospace, monospace',
          fontSize: "clamp(14px, 1.45vw, 18px)",
          lineHeight: 1.7,
          color: "#ececef",
          opacity: clearing ? 0 : 1,
          transition: "opacity 220ms ease",
        }}
      >
        {text}
        <span style={{ position: "relative", display: "inline-block", width: 0, height: "1.25em", verticalAlign: "-0.27em" }}>
          {/* remounts on every keystroke, so it stays solid while typing and only blinks when idle */}
          <span key={text} className="caps-caret" style={{ position: "absolute", left: 1, top: 0, width: 2, height: "100%", background: "#f5f5f7" }} />
          <span
            style={{
              position: "absolute",
              top: "calc(100% + 5px)",
              left: -6,
              zIndex: 2,
              width: 34,
              height: 34,
              opacity: badge === "hidden" ? 0 : 1,
              transition: "opacity 170ms ease",
            }}
          >
            {appearance > 0 && (
              <span
                key={appearance}
                className="caps-pop"
                style={{
                  position: "relative",
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 9,
                  border: "1px solid rgb(255 255 255 / 0.12)",
                  background: "#2c2c30",
                }}
              >
                <CapsGlyph on={badge === "on"} />
                <span style={BADGE_SHINE} />
              </span>
            )}
          </span>
        </span>
      </div>
      </div>
      {/* the window's shine: only its border, around the top-right corner */}
      <span style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "10px 10px 0 0", pointerEvents: "none" }}>
        <span style={NOTEPAD_SHINE} />
        <span style={{ position: "absolute", inset: 0, filter: "blur(3px)", opacity: 0.6 }}>
          <span style={NOTEPAD_SHINE} />
        </span>
      </span>
    </div>
  );
}

/** Lummo's Caps Lock badge: a filled arrow and a green light while it's on. */
function CapsGlyph({ on }: { on: boolean }) {
  const fade = "fill-opacity 160ms ease, stroke-opacity 160ms ease, stroke-width 160ms ease, fill 160ms ease";
  const arrow: CSSProperties = { fill: "#f5f5f7", fillOpacity: on ? 1 : 0, strokeOpacity: on ? 1 : 0.62, strokeWidth: on ? 3.5 : 5.5, transition: fade };
  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100">
      <path d="M50 17 L79 47 L62.5 47 L62.5 62 L37.5 62 L37.5 47 L21 47 Z" stroke="#f5f5f7" strokeLinejoin="round" style={arrow} />
      <rect x="35" y="70.5" width="30" height="7.5" rx="3" style={{ fill: on ? "#30d158" : "rgb(152 152 157 / 0.55)", transition: fade }} />
    </svg>
  );
}

function NotepadGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <rect x="4" y="3" width="16" height="18" rx="3" fill="#4fa2fd" />
      <path d="M8 9h8M8 13h8M8 17h5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Stroke({ d, color }: { d: string; color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d={d} />
    </svg>
  );
}
