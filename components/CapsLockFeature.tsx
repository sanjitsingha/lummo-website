"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

const HEADLINE = "Hey";
const LINES: (string | { caps: string })[][] = [
  [" ", { caps: "A" }, "pple, cute feature.\n", { caps: "W" }, "e thought ", { caps: "W" }, "e could do it ", { caps: "B" }, "etter"],
];
const INDICATOR_EM = 0.8;
const ANIMATION_MS = 170;
const OFF_FLASH_MS = 900;
const GLIDE_S = 0.07;
/** Each typed letter fades in from a soft blur over this long. */
const CHAR_IN_MS = 260;
const RHYTHM = [0, 30, -15, 45, 10, -20, 60, 5, -10, 35];
const BACKSPACE_RHYTHM = [0, 6, -3, 8, 2, -4, 10, 1, -2, 6];
const typingDelay = (char: string, index: number) => 82 + Math.round(RHYTHM[index % RHYTHM.length] * 0.3) + (char === " " ? 35 : 0);
const backspaceDelay = (index: number) => 52 + BACKSPACE_RHYTHM[index % BACKSPACE_RHYTHM.length];

type Point = { x: number; y: number };
type LinePart = string | { caps: string };
type CapsState = "hidden" | "on" | "off";
type Motion = { pos: Point | null; vel: Point; frame: number };

const plain = (line: LinePart[]) => line.map((part) => (typeof part === "string" ? part : part.caps)).join("");

export default function CapsLockFeature() {
  return (
    <section
      aria-labelledby="caps-lock-title"
      data-snap
      className="relative isolate flex min-h-[100dvh] flex-col items-center justify-between overflow-hidden bg-[#ffe51f] px-6 pt-[clamp(96px,22dvh,240px)] pb-[clamp(56px,15dvh,160px)] text-[#3a3a3c] sm:px-10 lg:px-20"
    >
      <LumioCapsHeadline />
      <div className="absolute inset-x-6 bottom-[clamp(56px,15dvh,160px)] flex flex-col gap-6 sm:inset-x-10 lg:inset-x-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        {/* the key icon sits in its own column, so the title and the paragraph share one left edge */}
        <div className="flex min-w-0 max-w-[36rem] items-start gap-[0.45em] text-[1.4rem] sm:text-[1.6rem]">
          <span
            aria-hidden
            className="mt-[0.025em] inline-flex size-[1.25em] shrink-0 items-center justify-center rounded-[0.32em] border border-white/[0.14] bg-[rgba(40,40,44,0.96)] shadow-[0_4px_12px_rgba(0,0,0,0.22)]"
          >
            <CapsLockGlyph on size="100%" />
          </span>
          <div className="min-w-0">
            <h2 id="caps-lock-title" className="font-medium leading-[1.3]">
              Caps Lock Indicator
            </h2>
            <p className="mt-2 max-w-[28rem] text-[0.8125rem] leading-[1.6] tracking-[0.01em] text-[#5c5c5c] sm:text-[0.9375rem]">
              The Mac&apos;s Caps Lock indicator, rebuilt for Windows and Linux and made better. It pops up right where
              you&apos;re typing, glides along with your cursor and lights up the moment Caps Lock goes on. Small
              detail, seriously satisfying experience.
            </p>
          </div>
        </div>
        <div className="max-w-[22rem] text-[0.8125rem] leading-[1.6] tracking-[0.01em] sm:text-[0.9375rem] lg:text-right">
          <p className="font-medium text-[#3a3a3c]">Works everywhere you type.</p>
          <p className="mt-1 text-[#5c5c5c]">
            The terminal, Word, a password box or any text field at all. If there&apos;s a cursor, it shows up.
          </p>
        </div>
      </div>
    </section>
  );
}

function LumioCapsHeadline() {
  const root = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [text, setText] = useState("");
  const [caps, setCaps] = useState<CapsState>("hidden");
  const [appearance, setAppearance] = useState(0);
  const [size, setSize] = useState(0);
  const [target, setTarget] = useState<Point | null>(null);
  const [caretAt, setCaretAt] = useState<Point | null>(null);
  const glide = useGlide(target, appearance);
  // the caret glides along the line, but jumps straight to the start of a new one
  const caretGlide = useGlide(caretAt, caretAt?.y ?? 0);

  const measure = useCallback(() => {
    const node = caret.current;
    const container = root.current;
    if (!node || !container) return;
    const body = Math.round(parseFloat(getComputedStyle(container).fontSize) * INDICATOR_EM);
    const next = { x: Math.round(node.offsetLeft - body * 0.1), y: Math.round(node.offsetTop + node.offsetHeight + body * 0.15) };
    const at = { x: node.offsetLeft, y: node.offsetTop };
    setSize(body);
    setTarget((current) => (current?.x === next.x && current.y === next.y ? current : next));
    setCaretAt((current) => (current?.x === at.x && current.y === at.y ? current : at));
  }, []);

  useLayoutEffect(measure, [text, measure]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setText(plain(LINES[0])), 0);
      return () => clearTimeout(id);
    }

    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (callback: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        callback();
      }, ms);
      timers.add(id);
    };
    const wait = (ms: number) => new Promise<void>((resolve) => later(resolve, ms));

    (async () => {
      for (let lineIndex = 0; ; lineIndex = (lineIndex + 1) % LINES.length) {
        let typed = 0;
        for (const part of LINES[lineIndex]) {
          const withCaps = typeof part !== "string";
          const value = withCaps ? part.caps : part;
          if (withCaps) {
            await wait(300);
            setAppearance((current) => current + 1);
            setCaps("on");
            await wait(380);
          }
          for (const char of Array.from(value)) {
            setText((current) => current + char);
            await wait(typingDelay(char, typed++));
          }
          if (withCaps) {
            await wait(160);
            setCaps("off");
            later(() => setCaps((current) => (current === "off" ? "hidden" : current)), OFF_FLASH_MS);
          }
        }
        await wait(2600);
        for (let index = Array.from(plain(LINES[lineIndex])).length; index > 0; index--) {
          setText((current) => Array.from(current).slice(0, -1).join(""));
          await wait(backspaceDelay(index));
        }
        await wait(500);
      }
    })();

    return () => {
      timers.forEach(clearTimeout);
      setText("");
      setCaps("hidden");
    };
  }, [active]);

  return (
    <div
      ref={root}
      className="relative pb-[1em] text-center text-[2rem] font-normal leading-[1.25] tracking-[-0.025em] text-[#3a3a3c] sm:text-[2.5rem] lg:text-[3.75rem]"
    >
      <h2>
        <span className="sr-only">{`${HEADLINE}${plain(LINES[0])}`}</span>
        <span aria-hidden className="block whitespace-pre-wrap">
          {HEADLINE}
          {Array.from(text, (char, index) => (
            <span key={index} className="lumio-char">
              {char}
            </span>
          ))}
          {/* keeps the caret's place in the line; the visible caret glides to it */}
          <span ref={caret} className="ml-[0.04em] inline-block h-[1.05em] w-[0.055em] align-[-0.2em]" />
        </span>
      </h2>
      <div
        ref={caretGlide}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[1.05em] w-[0.055em]"
        style={{ visibility: caretAt ? "visible" : "hidden" }}
      >
        {/* remounts on every keystroke, so it stays solid while typing and only blinks when idle */}
        <div
          key={text}
          className="h-full w-full rounded-full bg-[#c7c7cc]"
          style={{ animation: "lumio-caret 1.06s ease-in-out infinite" }}
        />
      </div>
      <div
        ref={glide}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
        style={{ width: size, height: size }}
      >
        <div
          className="h-full w-full"
          style={{ opacity: caps === "hidden" ? 0 : 1, transition: caps === "hidden" ? `opacity ${ANIMATION_MS}ms ease` : "none" }}
        >
          {appearance > 0 && (
            <div
              key={appearance}
              className="flex h-full w-full items-center justify-center"
              style={{
                borderRadius: size * 0.27,
                background: "rgba(40,40,44,0.96)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                animation: `lumio-pop ${ANIMATION_MS}ms cubic-bezier(0.2, 0.8, 0.2, 1) both`,
              }}
            >
              <CapsLockGlyph on={caps === "on"} size={size} />
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes lumio-caret { 0%, 40% { opacity: 1 } 55%, 85% { opacity: 0 } 100% { opacity: 1 } }
        @keyframes lumio-pop { from { opacity: 0; transform: scale(0.86) } to { opacity: 1; transform: scale(1) } }
        @keyframes lumio-char-in { from { opacity: 0; filter: blur(0.08em) } to { opacity: 1; filter: blur(0) } }
        .lumio-char { animation: lumio-char-in ${CHAR_IN_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both }
        @media (prefers-reduced-motion: reduce) { .lumio-char { animation: none } }
      `}</style>
    </div>
  );
}

function CapsLockGlyph({ on, size }: { on: boolean; size: number | string }) {
  const color = "#f5f5f7";
  const led = on ? "#30d158" : "rgba(152,152,157,0.55)";
  const transition = "fill-opacity 160ms ease, stroke-opacity 160ms ease, stroke-width 160ms ease, fill 160ms ease";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <path
        d="M50 17 L79 47 L62.5 47 L62.5 62 L37.5 62 L37.5 47 L21 47 Z"
        stroke={color}
        strokeLinejoin="round"
        style={{ fill: color, fillOpacity: on ? 1 : 0, strokeOpacity: on ? 1 : 0.62, strokeWidth: on ? 3.5 : 5.5, transition }}
      />
      <rect x="35" y="70.5" width="30" height="7.5" rx="3" style={{ fill: led, transition }} />
    </svg>
  );
}

function useGlide(target: Point | null, appearance: number): RefObject<HTMLDivElement | null> {
  const element = useRef<HTMLDivElement>(null);
  const motion = useRef<Motion>({ pos: null, vel: { x: 0, y: 0 }, frame: 0 });
  const latest = useRef(target);

  useLayoutEffect(() => {
    latest.current = target;
  });

  useLayoutEffect(() => {
    const state = motion.current;
    if (!latest.current) return;
    cancelAnimationFrame(state.frame);
    state.pos = { ...latest.current };
    state.vel = { x: 0, y: 0 };
    place(element.current, state.pos);
  }, [appearance]);

  useEffect(() => {
    const state = motion.current;
    if (!target) return;
    if (!state.pos) {
      state.pos = { ...target };
      place(element.current, state.pos);
      return;
    }
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(Math.max(now - last, 0) / 1000, 1 / 30);
      last = now;
      state.pos = {
        x: smoothDamp(state.pos!.x, target.x, state.vel, "x", dt),
        y: smoothDamp(state.pos!.y, target.y, state.vel, "y", dt),
      };
      place(element.current, state.pos);
      if (state.pos.x !== target.x || state.pos.y !== target.y) state.frame = requestAnimationFrame(step);
    };
    state.frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(state.frame);
  }, [target]);

  return element;
}

function place(node: HTMLDivElement | null, point: Point) {
  if (node) node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
}

function smoothDamp(current: number, target: number, velocity: Point, axis: "x" | "y", dt: number) {
  const omega = 2 / GLIDE_S;
  const x = omega * dt;
  const decay = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity[axis] + omega * change) * dt;
  velocity[axis] = (velocity[axis] - omega * temp) * decay;
  const next = target + (change + temp) * decay;
  const overshot = target > current === next > target;
  if (overshot || (Math.abs(next - target) < 0.5 && Math.abs(velocity[axis]) < 10)) {
    velocity[axis] = 0;
    return target;
  }
  return next;
}