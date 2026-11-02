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
const RHYTHM = [0, 30, -15, 45, 10, -20, 60, 5, -10, 35];
const BACKSPACE_RHYTHM = [0, 6, -3, 8, 2, -4, 10, 1, -2, 6];
const typingDelay = (char: string, index: number) => 95 + Math.round(RHYTHM[index % RHYTHM.length] * 0.55) + (char === " " ? 60 : 0);
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
      className="relative isolate mt-[101px] mb-8 flex min-h-[55.25rem] flex-col items-center justify-between overflow-hidden bg-[#ffe51f] px-6 pt-[240px] pb-[160px] text-[#3a3a3c] sm:mt-[133px] sm:mb-12 sm:min-h-[57.25rem] sm:px-10 lg:mt-[165px] lg:mb-16 lg:min-h-[59.25rem] lg:px-20"
    >
      <LumioCapsHeadline />
      <div className="absolute inset-x-6 bottom-[160px] max-w-[34rem] sm:inset-x-10 lg:inset-x-20">
        <h2 id="caps-lock-title" className="text-[1.4rem] font-medium leading-[1.3] sm:text-[1.6rem]">
          Caps Lock Indicator
        </h2>
        <p className="mt-2 max-w-[34rem] text-[1.125rem] leading-[1.5] tracking-[0.02em] text-[#5c5c5c] sm:text-xl">
          A beautifully animated Caps Lock indicator that keeps you in the loop with every keystroke. Small detail,
          seriously satisfying experience.
        </p>
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
  const glide = useGlide(target, appearance);

  const measure = useCallback(() => {
    const node = caret.current;
    const container = root.current;
    if (!node || !container) return;
    const body = Math.round(parseFloat(getComputedStyle(container).fontSize) * INDICATOR_EM);
    const next = { x: Math.round(node.offsetLeft - body * 0.1), y: Math.round(node.offsetTop + node.offsetHeight + body * 0.15) };
    setSize(body);
    setTarget((current) => (current?.x === next.x && current.y === next.y ? current : next));
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
      className="relative pb-[1em] text-center text-[2.5rem] font-normal leading-[1.25] tracking-[-0.025em] text-[#3a3a3c] sm:text-[3rem] lg:text-[5rem]"
    >
      <h2>
        <span className="sr-only">{`${HEADLINE}${plain(LINES[0])}`}</span>
        <span aria-hidden className="block whitespace-pre-wrap">
          {HEADLINE}
          {text}
          <span
            ref={caret}
            key={text}
            className="ml-[0.04em] inline-block h-[1.05em] w-[0.055em] rounded-full bg-[#c7c7cc] align-[-0.2em]"
            style={{ animation: "lumio-caret 1.06s linear infinite" }}
          />
        </span>
      </h2>
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
        @keyframes lumio-caret { 0%, 50% { opacity: 1 } 50.01%, 100% { opacity: 0 } }
        @keyframes lumio-pop { from { opacity: 0; transform: scale(0.86) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

function CapsLockGlyph({ on, size }: { on: boolean; size: number }) {
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