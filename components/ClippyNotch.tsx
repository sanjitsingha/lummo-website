"use client";

import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

type Copy =
  | { id: number; kind: "text"; text: string }
  | { id: number; kind: "image" }
  | { id: number; kind: "pdf"; name: string }
  | { id: number; kind: "photos"; name: string; count: number };

/** What the notch already holds, newest first. */
const SEED: Copy[] = [
  { id: 1, kind: "text", text: "Meeting moved to 4:30. Same room, bring the slides." },
  { id: 2, kind: "pdf", name: "invoice-march.pdf" },
  { id: 3, kind: "photos", name: "beach-day.jpg", count: 3 },
];
/** Drops in as a fresh copy the first time the section comes into view. */
const ARRIVING: Copy = { id: 4, kind: "image" };

const TILE_W = 76;
const GAP = 8;
const PAD_X = 14;
const CLOSED = { width: 132, height: 24, radius: 12 };
const OPEN = { height: 100, radius: 22 };
/** Like the real one: passing over the spot does nothing, resting there for a moment opens it. */
const OPEN_DELAY_MS = 300;
/** How long it drops down by itself to show a new copy. */
const PEEK_MS = 2000;
const COPIED_MS = 1100;
const LIMIT = 50;

/** Springs open with a little bounce, closes without one. */
const OPEN_SPRING = { type: "spring", visualDuration: 0.45, bounce: 0.3 } as const;
const CLOSE_SPRING = { type: "spring", visualDuration: 0.3, bounce: 0 } as const;

/** A new copy rises into the row once the others have made room, and gives a little wiggle as it lands. */
const TILE: Variants = {
  arriving: { opacity: 0, y: 18, scale: 0.8 },
  landed: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: [0, -7, 5, -3, 0],
    transition: {
      default: { type: "spring", visualDuration: 0.35, bounce: 0.3, delay: 0.14 },
      rotate: { duration: 0.5, delay: 0.36, ease: "easeInOut" },
    },
  },
  leaving: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

/**
 * A working copy of Clippy at the top of its section: rest the mouse on it (or tap it) to see the
 * copies, click one to copy it again, and copy any text on the page to watch it arrive.
 */
export default function ClippyNotch() {
  const root = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const nextId = useRef(100);
  const timers = useRef<{ hover?: number; peek?: number; copied?: number }>({});
  const [copies, setCopies] = useState<Copy[]>(SEED);
  const [hovered, setHovered] = useState(false);
  const [peeking, setPeeking] = useState(false);
  // opened with a tap or the keyboard; stays open until you tap or tab away
  const [pinned, setPinned] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [edges, setEdges] = useState({ start: false, end: false });
  const open = hovered || peeking || pinned;
  const width = PAD_X * 2 + copies.length * TILE_W + (copies.length - 1) * GAP;

  const peek = useCallback(() => {
    window.clearTimeout(timers.current.peek);
    setPeeking(true);
    timers.current.peek = window.setTimeout(() => setPeeking(false), PEEK_MS);
  }, []);

  // the first time the section is on screen, a copy arrives to show how it looks
  useEffect(() => {
    const section = root.current?.closest("section");
    if (!section) return;
    let arrival: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        arrival = window.setTimeout(() => {
          setCopies((current) => [ARRIVING, ...current.filter((copy) => copy.id !== ARRIVING.id)]);
          peek();
        }, 600);
      },
      { threshold: 0.5 },
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(arrival);
    };
  }, [peek]);

  // text copied anywhere on the page lands here, the same thing twice just moves to the front
  useEffect(() => {
    const onCopy = () => {
      const text = window.getSelection()?.toString().trim().slice(0, 400);
      if (!text) return;
      const id = nextId.current++;
      setCopies((current) => {
        const same = current.find((copy) => copy.kind === "text" && copy.text === text);
        return [same ?? { id, kind: "text" as const, text }, ...current.filter((copy) => copy !== same)].slice(0, LIMIT);
      });
      peek();
    };
    document.addEventListener("copy", onCopy);
    return () => document.removeEventListener("copy", onCopy);
  }, [peek]);

  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [pinned]);

  // when the row is too long, the wheel scrolls it sideways instead of moving the page
  useEffect(() => {
    const node = row.current;
    if (!node) return;
    const measure = () =>
      setEdges({ start: node.scrollLeft > 1, end: node.scrollLeft + node.clientWidth < node.scrollWidth - 1 });
    const onWheel = (event: WheelEvent) => {
      if (node.scrollWidth <= node.clientWidth) return;
      event.preventDefault();
      event.stopPropagation();
      node.scrollLeft += Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
    };
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    node.addEventListener("scroll", measure, { passive: true });
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", measure);
      node.removeEventListener("wheel", onWheel);
    };
  }, []);

  // adding a copy changes how far the row reaches without changing its size
  useEffect(() => {
    const node = row.current;
    if (!node) return;
    const frame = requestAnimationFrame(() =>
      setEdges({ start: node.scrollLeft > 1, end: node.scrollLeft + node.clientWidth < node.scrollWidth - 1 }),
    );
    return () => cancelAnimationFrame(frame);
  }, [copies]);

  useEffect(() => {
    const pending = timers.current;
    return () => Object.values(pending).forEach((id) => window.clearTimeout(id));
  }, []);

  const onPointerEnter = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(timers.current.hover);
    if (open) setHovered(true);
    else timers.current.hover = window.setTimeout(() => setHovered(true), OPEN_DELAY_MS);
  };

  const onPointerLeave = (event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(timers.current.hover);
    setHovered(false);
    setPinned(false);
  };

  const copyAgain = (copy: Copy) => {
    if (copy.kind === "text") navigator.clipboard?.writeText(copy.text).catch(() => {});
    setCopies((current) => [copy, ...current.filter((item) => item.id !== copy.id)]);
    setCopiedId(copy.id);
    window.clearTimeout(timers.current.copied);
    timers.current.copied = window.setTimeout(() => setCopiedId(null), COPIED_MS);
  };

  const fade = edges.start || edges.end;
  const mask = `linear-gradient(to right, ${edges.start ? "transparent" : "#000"} 0, #000 28px, #000 calc(100% - 28px), ${edges.end ? "transparent" : "#000"} 100%)`;

  return (
    <MotionConfig reducedMotion="user">
      {/* the padding widens the spot that opens it, like the real one reaching a little past its edges */}
      <div
        ref={root}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setPinned(false);
        }}
        onKeyDown={(event) => event.key === "Escape" && setPinned(false)}
        className="absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center px-10 pb-5"
      >
        <motion.div
          initial={false}
          animate={{
            width: open ? width : CLOSED.width,
            height: open ? OPEN.height : CLOSED.height,
            borderBottomLeftRadius: open ? OPEN.radius : CLOSED.radius,
            borderBottomRightRadius: open ? OPEN.radius : CLOSED.radius,
          }}
          transition={open ? OPEN_SPRING : CLOSE_SPRING}
          className="relative max-w-[min(calc(100vw-32px),660px)] overflow-hidden border border-t-0 border-white/[0.09] bg-[#1c1c1e] shadow-[0_14px_36px_-10px_rgba(0,0,0,0.45)]"
        >
          {!open && (
            <button
              type="button"
              aria-label="Open Clippy"
              aria-expanded={false}
              onClick={() => setPinned(true)}
              className="absolute inset-0 cursor-default rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5856d6]"
            />
          )}
          <motion.ul
            ref={row}
            inert={!open}
            aria-label="Your copies"
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={{ duration: open ? 0.2 : 0.1, delay: open ? 0.08 : 0 }}
            style={fade ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
            className="absolute inset-0 flex items-center gap-2 overflow-x-auto overflow-y-hidden px-3.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {copies.map((copy) => (
                <motion.li
                  key={copy.id}
                  layout="position"
                  variants={TILE}
                  initial="arriving"
                  animate="landed"
                  exit="leaving"
                  className="shrink-0"
                >
                  <button
                    type="button"
                    onClick={() => copyAgain(copy)}
                    aria-label={`Copy again: ${describe(copy)}`}
                    className="relative flex h-[70px] w-[76px] cursor-default flex-col items-center rounded-[10px] select-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#7d7aff]"
                  >
                    <Tile copy={copy} />
                    <AnimatePresence>
                      {copiedId === copy.id && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-[#1c1c1e]/80 text-[11px] font-medium text-white"
                        >
                          ✓ Copied
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>
        {/* a nudge for anyone who can hover; it hides while the notch is open */}
        <p
          aria-hidden
          className={`pointer-events-none mt-2.5 hidden whitespace-nowrap text-[12px] tracking-[0.01em] text-[#8e8e93] transition-opacity duration-200 [@media(hover:hover)]:block ${open ? "opacity-0" : "opacity-100"}`}
        >
          Rest your mouse here, or copy any text on this page
        </p>
      </div>
    </MotionConfig>
  );
}

function describe(copy: Copy) {
  switch (copy.kind) {
    case "text":
      return copy.text;
    case "image":
      return "a photo of mountains at sunset";
    case "pdf":
      return copy.name;
    case "photos":
      return `${copy.name} and ${copy.count - 1} more`;
  }
}

/** What each kind of copy looks like in the row: a few lines of text, a preview, or a file with its name. */
function Tile({ copy }: { copy: Copy }) {
  switch (copy.kind) {
    case "text":
      return (
        <span className="size-full rounded-[10px] bg-white/[0.07] p-2 text-left">
          <span className="line-clamp-4 text-[9.5px] leading-[1.38] break-words text-white/85">{copy.text}</span>
        </span>
      );
    case "image":
      return (
        <span className="size-full overflow-hidden rounded-[10px]">
          <SunsetThumb />
        </span>
      );
    case "pdf":
      return (
        <File name={copy.name}>
          <PdfIcon />
        </File>
      );
    case "photos":
      return (
        <File name={copy.name}>
          <span className="relative">
            <BeachThumb />
            <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#7d7aff] px-1 text-[9.5px] font-semibold text-white">
              {copy.count}
            </span>
          </span>
        </File>
      );
  }
}

function File({ name, children }: { name: string; children: ReactNode }) {
  return (
    <>
      <span className="flex h-[52px] items-center justify-center">{children}</span>
      <span className="mt-0.5 w-full truncate text-center text-[9.5px] text-white/60">{name}</span>
    </>
  );
}

function SunsetThumb() {
  return (
    <svg viewBox="0 0 76 70" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden>
      <defs>
        <linearGradient id="clippy-sunset" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3a28c" />
          <stop offset="0.65" stopColor="#fcd9a6" />
        </linearGradient>
      </defs>
      <rect width="76" height="70" fill="url(#clippy-sunset)" />
      <circle cx="50" cy="30" r="7" fill="#fff4d8" />
      <path d="M0 46 L16 31 L28 41 L44 24 L60 39 L76 29 V70 H0 Z" fill="#8a5a3c" />
      <path d="M0 57 L20 46 L38 54 L58 43 L76 51 V70 H0 Z" fill="#553624" />
    </svg>
  );
}

function BeachThumb() {
  return (
    <svg viewBox="0 0 48 40" className="block h-10 w-12 rounded-[4px]" aria-hidden>
      <rect width="48" height="22" fill="#9ad8f5" />
      <circle cx="36" cy="9" r="4" fill="#fff7cf" />
      <rect y="20" width="48" height="8" fill="#3d9edb" />
      <rect y="27" width="48" height="13" fill="#f2d8a2" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 36 44" className="block h-11 w-9" aria-hidden>
      <path d="M4 0 H24 L36 12 V40 Q36 44 32 44 H4 Q0 44 0 40 V4 Q0 0 4 0 Z" fill="#fff" />
      <path d="M24 0 V8 Q24 12 28 12 H36 Z" fill="#d6d6db" />
      <text x="18" y="33" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e5252a" fontFamily="inherit">
        PDF
      </text>
    </svg>
  );
}
