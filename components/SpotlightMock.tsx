import type { CSSProperties, ReactNode } from "react";

/** A size that follows the card: `n` card units, kept between `min` and `max` pixels. */
const size = (min: number, n: number, max: number) => `clamp(${min}px, calc(${n} * var(--u)), ${max}px)`;

const INSET = size(20, 2.8, 32);
const RADIUS = size(12, 1.4, 16);

/** The panel melts into the card from the bottom, leaving clear space for the card's line. */
const bottomFade = (k: number) =>
  `linear-gradient(180deg, #000 0, #000 calc(var(--h) * ${(0.315 * k).toFixed(3)}), rgb(0 0 0 / 0.58) calc(var(--h) * ${(0.467 * k).toFixed(3)}), rgb(0 0 0 / 0.17) calc(var(--h) * ${(0.607 * k).toFixed(3)}), transparent calc(var(--h) * ${(0.711 * k).toFixed(3)}))`;

/** A 1px ring that follows the panel's rounded corner, lit only around the top left. */
const CORNER_RING: CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: 1,
  borderRadius: RADIUS,
  background:
    "radial-gradient(max(240px, 34cqw) max(150px, 20cqw) at 0 0, rgb(var(--glow) / 0.85) 0%, rgb(var(--glow) / 0.3) 42%, transparent 100%)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  pointerEvents: "none",
};

/** Film grain: tiled SVG noise laid over the card's gradient, under the panel. */
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

/** Slate card background: a soft light high up on the left, melting to near-black at the bottom. */
const GLOW = "255 255 255";
const CARD_BG =
  "radial-gradient(85% 55% at 28% 18%, rgb(150 165 190 / 0.22) 0%, rgb(120 135 160 / 0.08) 50%, transparent 78%), radial-gradient(70% 40% at 50% 105%, rgb(90 105 130 / 0.16) 0%, transparent 70%), linear-gradient(180deg, #232830 0%, #15181d 55%, #000 100%)";

/** A deep color glowing from the top of the card, over a dark base. */
const tinted = (glow: string, soft: string, top: string) =>
  `radial-gradient(85% 60% at 45% 8%, rgb(${glow} / 0.5) 0%, rgb(${glow} / 0.16) 52%, transparent 80%), radial-gradient(60% 60% at 0% 55%, rgb(${soft} / 0.2) 0%, transparent 75%), linear-gradient(180deg, ${top} 0%, #0b0b10 62%, #000 100%)`;

const TONES = {
  slate: { background: CARD_BG, border: "rgb(255 255 255 / 0.12)" },
  purple: { background: tinted("126 58 190", "150 60 200", "#24122f"), border: "rgb(170 110 230 / 0.24)" },
  blue: { background: tinted("20 80 170", "30 100 200", "#0c1e3d"), border: "rgb(90 150 240 / 0.24)" },
  teal: { background: tinted("14 116 160", "20 140 180", "#0a2838"), border: "rgb(80 180 220 / 0.24)" },
};

/** Pure black in many small steps, so the fade stays smooth on OLED screens. */
const BOTTOM_SHADE =
  "radial-gradient(80% 80% at 100% 100%, #000 0%, rgb(0 0 0 / 0.9) 25%, rgb(0 0 0 / 0.62) 50%, rgb(0 0 0 / 0.26) 75%, transparent 100%), linear-gradient(180deg, transparent 38%, rgb(0 0 0 / 0.08) 44%, rgb(0 0 0 / 0.24) 50%, rgb(0 0 0 / 0.46) 56%, rgb(0 0 0 / 0.68) 62%, rgb(0 0 0 / 0.85) 68%, rgb(0 0 0 / 0.95) 74%, #000 82%)";
/** The card's color is gone well before its bottom edge, so nothing bright can show there. */
const COLOR_FADE =
  "linear-gradient(180deg, #000 0%, #000 34%, rgb(0 0 0 / 0.8) 44%, rgb(0 0 0 / 0.5) 54%, rgb(0 0 0 / 0.24) 63%, rgb(0 0 0 / 0.08) 71%, transparent 78%)";
/** Grain only where there is color: on near-black it shows as noise on OLED screens. */
const GRAIN_FADE = "linear-gradient(180deg, #000 0%, #000 26%, rgb(0 0 0 / 0.5) 42%, transparent 58%)";
/** The card's thin outline, which fades out before the bottom. */
const CARD_RING: CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: 1,
  borderRadius: "inherit",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  pointerEvents: "none",
};

type CardProps = {
  /** The card's background color. */
  tone?: keyof typeof TONES;
  /** What's typed in the search field; without it the placeholder shows. */
  query?: string;
  lead: string;
  rest: string;
  /** How far the panel runs past the card's right edge. */
  panelWidth?: string;
  /** Below 1 the fade finishes sooner, for a panel with little in it. */
  fade?: number;
  children: ReactNode;
};

/** A feature card: a still Spotlight pushed toward the bottom right and cropped by the card, with its line over the faded bottom. */
export function SpotlightMockCard({ tone = "slate", query, lead, rest, panelWidth, fade = 1, children }: CardProps) {
  const cardHeight = "clamp(400px, 34vw, 500px)";
  return (
    <article
      className="relative w-[min(82vw,520px)] shrink-0 snap-start overflow-hidden rounded-[14px]"
      style={
        {
          containerType: "inline-size",
          "--glow": GLOW,
          height: cardHeight,
          background: "#000",
          "--u": "1.7cqw",
          "--h": cardHeight,
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        style={{ position: "absolute", inset: 0, isolation: "isolate", background: TONES[tone].background, WebkitMaskImage: COLOR_FADE, maskImage: COLOR_FADE, pointerEvents: "none" }}
      >
        <span
          style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, backgroundSize: "220px 220px", opacity: 0.22, mixBlendMode: "overlay", WebkitMaskImage: GRAIN_FADE, maskImage: GRAIN_FADE }}
        />
      </span>
      <div
        aria-hidden
        style={{ position: "absolute", left: "clamp(28px, 8cqw, 72px)", top: "clamp(40px, 9cqw, 76px)", width: panelWidth ?? "max(540px, 128cqw)" }}
      >
        <div
          style={{
            overflow: "hidden",
            borderRadius: RADIUS,
            border: "1px solid rgb(var(--glow) / 0.14)",
            background: "radial-gradient(120% 130% at 22% 0%, #313134 0%, #222225 52%, #1b1b1e 100%)",
            textAlign: "left",
            userSelect: "none",
            WebkitMaskImage: bottomFade(fade),
            maskImage: bottomFade(fade),
          }}
        >
          <div style={{ display: "flex", height: size(56, 6.9, 80), alignItems: "center", gap: size(14, 1.55, 18), padding: `0 ${size(20, 2.2, 26)}` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#a1a1a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size(21, 2.4, 28), height: size(21, 2.4, 28), flexShrink: 0 }}>
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            {query ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 2, borderRadius: 5, background: "rgb(255 255 255 / 0.14)", padding: "2px 8px", fontSize: size(18, 2.25, 26), letterSpacing: "-0.01em", color: "#f5f5f7" }}>
                {query}
                <span style={{ display: "inline-block", width: 2, height: "1.1em", background: "#f5f5f7" }} />
              </span>
            ) : (
              <span style={{ fontSize: size(18, 2.25, 26), letterSpacing: "-0.01em", color: "#85858b" }}>Search anything...</span>
            )}
          </div>
          <div style={{ margin: `0 ${size(8, 0.9, 10)}`, borderTop: "1px solid rgb(255 255 255 / 0.09)", paddingBottom: 8 }}>{children}</div>
        </div>
        {/* light along the top-left corner, brightest at the corner */}
        <span style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <span style={CORNER_RING} />
          <span style={{ position: "absolute", inset: 0, filter: "blur(3px)", opacity: 0.6 }}>
            <span style={CORNER_RING} />
          </span>
          <span
            style={{
              position: "absolute",
              left: "calc(max(260px, 30cqw) / -2)",
              top: "calc(max(160px, 18cqw) / -2)",
              width: "max(260px, 30cqw)",
              height: "max(160px, 18cqw)",
              background: "radial-gradient(closest-side, rgb(var(--glow) / 0.13) 0%, rgb(var(--glow) / 0.04) 55%, transparent 100%)",
            }}
          />
        </span>
      </div>
      {/* the mockup sinks into black along the bottom and toward the bottom-right corner, under the card's line */}
      <span aria-hidden style={{ position: "absolute", inset: 0, background: BOTTOM_SHADE, pointerEvents: "none" }} />
      <span aria-hidden style={{ ...CARD_RING, background: `linear-gradient(180deg, ${TONES[tone].border} 0%, ${TONES[tone].border} 40%, transparent 78%)` }} />
      <div style={{ position: "absolute", left: INSET, right: INSET, bottom: size(20, 2.4, 28) }}>
        <h3 className="max-w-[32rem] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.32] font-medium tracking-[-0.015em] text-ink">
          {lead} <span className="font-normal text-ink-2">{rest}</span>
        </h3>
      </div>
    </article>
  );
}

export function MockHeading({ children }: { children: ReactNode }) {
  return (
    <p style={{ padding: `${size(10, 1.2, 14)} ${size(12, 1.25, 14)} ${size(4, 0.6, 7)}`, fontSize: size(11, 1.2, 14), letterSpacing: "0.01em", color: "#8e8e93" }}>
      {children}
    </p>
  );
}

type RowProps = { name: string; icon: ReactNode; subtitle?: string; selected?: boolean };

export function MockRow({ name, icon, subtitle = "Application", selected = false }: RowProps) {
  const iconSize = size(26, 3.1, 36);
  return (
    <div
      style={{
        display: "flex",
        height: size(46, 5.7, 66),
        alignItems: "center",
        gap: size(12, 1.4, 16),
        padding: `0 ${size(10, 1.25, 14)}`,
        borderRadius: size(6, 0.8, 9),
        background: selected ? "rgb(255 255 255 / 0.1)" : undefined,
      }}
    >
      <span style={{ display: "flex", width: iconSize, height: iconSize, flexShrink: 0, alignItems: "center", justifyContent: "center" }}>{icon}</span>
      <span style={{ minWidth: 0 }}>
        <span style={{ display: "block", whiteSpace: "nowrap", fontSize: size(14, 1.65, 19), lineHeight: 1.25, color: "#f5f5f7" }}>{name}</span>
        <span style={{ display: "block", fontSize: size(11, 1.2, 14), lineHeight: 1.3, color: selected ? "#c7c7cc" : "#8e8e93" }}>{subtitle}</span>
      </span>
    </div>
  );
}

/** The calculator's answer on one line, set a little larger because it's the point of the card. */
export function MockCalc({ expression, answer }: { expression: string; answer: string }) {
  return (
    <div
      style={{
        display: "flex",
        height: size(60, 7, 78),
        alignItems: "center",
        gap: "0.4em",
        padding: `0 ${size(12, 1.4, 16)}`,
        borderRadius: size(6, 0.8, 9),
        background: "rgb(255 255 255 / 0.1)",
        fontSize: size(18, 2.4, 24),
        whiteSpace: "nowrap",
        color: "#f5f5f7",
      }}
    >
      {expression} <span>=</span> <span style={{ fontWeight: 600 }}>{answer}</span>
    </div>
  );
}

type Side = { code: string; amount: string; name: string; note: string };

function SplitSide({ code, amount, name, note }: Side) {
  return (
    <span style={{ display: "flex", minWidth: 0, flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 12px", textAlign: "center" }}>
      <span style={{ fontSize: size(10, 1.1, 12), lineHeight: 1.4, fontWeight: 500, color: "#a1a1a6" }}>{code}</span>
      <span style={{ whiteSpace: "nowrap", fontSize: size(22, 2.9, 30), lineHeight: 1.28, fontWeight: 600, color: "#f5f5f7" }}>{amount}</span>
      <span style={{ fontSize: size(11, 1.25, 13), lineHeight: 1.35, color: "#a1a1a6" }}>{name}</span>
      <span style={{ marginTop: 6, whiteSpace: "nowrap", fontSize: size(10, 1, 11), lineHeight: 1.3, color: "#85858b" }}>{note}</span>
    </span>
  );
}

/** A conversion: one side each of a line with the conversion icon on it. */
export function MockSplit({ left, right }: { left: Side; right: Side }) {
  return (
    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", height: size(124, 12.5, 164), marginTop: 6 }}>
      <SplitSide {...left} />
      <SplitSide {...right} />
      <span style={{ position: "absolute", top: 8, bottom: 8, left: "50%", width: 1, background: "rgb(255 255 255 / 0.1)" }} />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          width: size(30, 3.4, 36),
          height: size(30, 3.4, 36),
          transform: "translate(-50%, -50%)",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "1px solid rgb(255 255 255 / 0.1)",
          background: "#26262a",
          color: "#c7c7cc",
        }}
      >
        <svg width="45%" height="45%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3 4 7l4 4" />
          <path d="M4 7h16" />
          <path d="m16 21 4-4-4-4" />
          <path d="M20 17H4" />
        </svg>
      </span>
    </div>
  );
}

const CHIPS = ["All", "Text", "Images", "Video", "Files"];

const CLIP: CSSProperties = {
  position: "relative",
  display: "flex",
  width: size(210, 22, 280),
  height: size(140, 15, 176),
  flexShrink: 0,
  overflow: "hidden",
  borderRadius: size(5, 0.55, 7),
  border: "1px solid rgb(255 255 255 / 0.09)",
  background: "rgb(255 255 255 / 0.06)",
  color: "#f5f5f7",
};

function ClipIcon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: size(30, 3.2, 40), height: size(30, 3.2, 40) }}>
      {children}
    </svg>
  );
}

/** Quick files: the kind chips and a row of things copied. Sample content only. */
export function MockQuickFiles() {
  const centred: CSSProperties = { ...CLIP, flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "0 14px" };
  const label: CSSProperties = { maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: size(12, 1.2, 14) };
  return (
    <div style={{ padding: `${size(12, 1.3, 16)} ${size(6, 0.6, 8)} 0` }}>
      <div style={{ display: "flex", gap: 4 }}>
        {CHIPS.map((chip, index) => (
          <span
            key={chip}
            style={{
              display: "inline-flex",
              height: size(26, 2.5, 30),
              alignItems: "center",
              padding: `0 ${size(10, 1.1, 13)}`,
              borderRadius: 5,
              background: index === 0 ? "rgb(255 255 255 / 0.14)" : undefined,
              fontSize: size(12, 1.15, 14),
              fontWeight: 500,
              color: index === 0 ? "#f5f5f7" : "#a1a1a6",
            }}
          >
            {chip}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: size(8, 0.9, 11), marginTop: size(10, 1.1, 14) }}>
        <div style={{ ...CLIP, padding: size(10, 1.1, 14), fontSize: size(12, 1.25, 15), lineHeight: 1.45 }}>
          Meeting moved to 4 pm. Bring the Q3 notes and the budget sheet.
        </div>
        <div style={{ ...CLIP, background: "linear-gradient(155deg, #ffb25c 0%, #ff5f7e 48%, #5b3be0 100%)" }}>
          <span style={{ position: "absolute", top: "20%", right: "18%", width: "22%", aspectRatio: "1", borderRadius: "50%", background: "rgb(255 240 200 / 0.9)" }} />
          <span style={{ position: "absolute", insetInline: 0, bottom: 0, height: "38%", background: "#2a1a55", clipPath: "polygon(0 60%, 22% 20%, 42% 58%, 64% 6%, 100% 62%, 100% 100%, 0 100%)" }} />
        </div>
        <div style={centred}>
          <ClipIcon color="#6bb1fe">
            <path d="M9 17H7A5 5 0 0 1 7 7h2" />
            <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
            <path d="M8 12h8" />
          </ClipIcon>
          <span style={label}>lummo.space</span>
        </div>
        <div style={centred}>
          <ClipIcon color="#e5484d">
            <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
            <path d="M14 2v5a1 1 0 0 0 1 1h5" />
            <path d="M10 9H8M16 13H8M16 17H8" />
          </ClipIcon>
          <span style={label}>Invoice March 2026.pdf</span>
        </div>
        <div style={{ ...centred, background: "linear-gradient(160deg, #123a5e 0%, #16203a 100%)" }}>
          <ClipIcon color="#f5f5f7">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" />
          </ClipIcon>
          <span style={label}>Product demo.mp4</span>
        </div>
      </div>
    </div>
  );
}
