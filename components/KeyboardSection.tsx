import type { CSSProperties, ReactNode } from "react";
import SystemDownload from "@/components/SystemDownload";
import { getLatestRelease, RELEASES_URL } from "@/lib/release";

type Feature = { lead: string; rest: string; icon: ReactNode };

const KEYBOARD_FIRST: Feature = { lead: "Keyboard-first.", rest: "Keep both hands on the keys.", icon: <><path d="M10 8h.01" /><path d="M12 12h.01" /><path d="M14 8h.01" /><path d="M16 12h.01" /><path d="M18 8h.01" /><path d="M6 8h.01" /><path d="M7 16h10" /><path d="M8 12h.01" /><rect width="20" height="16" x="2" y="4" rx="2" /></> };
const YOURS: Feature = { lead: "Yours.", rest: "Aliases and hotkeys you pick.", icon: <><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></> };
const PRIVATE: Feature = { lead: "Private.", rest: "Your clipboard stays on your device.", icon: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> };
const FREE: Feature = { lead: "Free.", rest: "All of it, at no cost.", icon: <><path d="M12 7v14" /><path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" /><path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" /><rect x="3" y="7" width="18" height="4" rx="1" /></> };

/** A 1px ring on a key's rounded edge, lit only around its top-left corner. */
const KEY_RING: CSSProperties = {
  position: "absolute",
  inset: 0,
  padding: 1,
  borderRadius: 8,
  background: "radial-gradient(70% 70% at 0 0, #fff 0%, rgb(255 255 255 / 0.45) 38%, transparent 100%)",
  WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  WebkitMaskComposite: "xor",
  mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
  maskComposite: "exclude",
  pointerEvents: "none",
};

/** The corner's shine and the soft light it throws onto the key. */
function CornerShine() {
  return (
    <span aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <span style={KEY_RING} />
      <span style={{ position: "absolute", inset: 0, filter: "blur(2px)", opacity: 0.7 }}>
        <span style={KEY_RING} />
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          background: "radial-gradient(60% 60% at 0 0, rgb(255 255 255 / 0.16) 0%, transparent 100%)",
        }}
      />
    </span>
  );
}

/** One key's width in `--k` units, and its legend: a letter, or a [shifted, plain] pair. */
type Cap = { width?: number; label?: string; pair?: [string, string]; corner?: boolean };

const letters = (text: string): Cap[] => text.split("").map((label) => ({ label }));
const FUNCTION_ROW: Cap[] = [{ label: "Esc", width: 1.1 }, ...["F1", "F2", "F3", "F4", "F5", "F6", "F7"].map((label) => ({ label }))];
const NUMBER_ROW: Cap[] = [
  ["~", "`"],
  ["!", "1"],
  ["@", "2"],
  ["#", "3"],
  ["$", "4"],
  ["%", "5"],
  ["^", "6"],
  ["&", "7"],
].map(([shifted, plain]) => ({ pair: [shifted, plain] }));
const SHIFT_ROW: Cap[] = [{ label: "Shift", width: 2.2, corner: true }, ...letters("ZXCVBN")];

/** Only a corner of the keyboard shows: it melts away toward the right and the bottom, and from the top and a little at the left. */
const KEYBOARD_FADE =
  "linear-gradient(90deg, transparent 0%, #000 9%, #000 52%, transparent 94%), linear-gradient(180deg, transparent 0%, transparent 10%, rgb(0 0 0 / 0.22) 26%, #000 44%, #000 72%, transparent 100%)";

/** After the shortcuts: why lummo feels good to use, with the reasons set into a keyboard fading into the page. */
export default async function KeyboardSection() {
  const release = await getLatestRelease();

  return (
    <section
      id="download"
      aria-labelledby="keyboard-title"
      className="mx-auto grid w-full max-w-[1600px] items-center gap-4 px-5 pt-36 pb-36 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6 lg:px-16 lg:pt-56 lg:pb-60"
    >
      {/* under 1024px the text sits below the keyboard, on its faded bottom */}
      <div className="relative z-10 max-lg:order-2 max-lg:-mt-8">
        <h2 id="keyboard-title" className="text-[clamp(1.0625rem,1.35vw,1.3125rem)] leading-[1.3] font-medium tracking-[-0.02em] text-ink">
          It’s not about saving time.
          <br />
          <span className="text-ink-2">It’s about feeling like you’re never wasting it.</span>
        </h2>
        <div className="mt-8">
          <SystemDownload linux={release?.deb ?? RELEASES_URL} placement="keyboard-section" />
        </div>
      </div>

      <Keyboard />
    </section>
  );
}

/** Under 1024px it's the same keyboard, sized so all four lit keys fit and running off the screen's right edge. */
function Keyboard() {
  return (
    <div
      className="overflow-hidden max-lg:order-1 max-lg:-mx-5 max-lg:h-[calc(var(--kh)*4.7)]! max-lg:[--k:min(calc((100vw_-_84px)_/_4.9),100px)]! max-lg:[--kb-fade:linear-gradient(90deg,#000_calc(100%_-_22px),transparent_100%),linear-gradient(180deg,transparent_0%,transparent_8%,rgb(0_0_0/0.22)_22%,#000_38%,#000_82%,rgb(0_0_0/0.6)_88%,rgb(0_0_0/0.25)_94%,transparent_100%)]! max-lg:[--kh:max(var(--k),76px)]! sm:max-lg:-mx-10"
      style={
        {
          "--k": "clamp(72px, 6vw, 92px)",
          "--kh": "var(--k)",
          "--kb-fade": KEYBOARD_FADE,
          height: "calc(var(--k) * 3.45)",
          WebkitMaskImage: "var(--kb-fade)",
          WebkitMaskComposite: "source-in",
          maskImage: "var(--kb-fade)",
          maskComposite: "intersect",
        } as CSSProperties
      }
    >
      <div style={{ zoom: 0.8 }} className="mt-[calc(var(--k)*0.3)] ml-[16%] flex w-max flex-col gap-2.5 max-lg:ml-5 max-lg:[zoom:1]! sm:max-lg:ml-10">
        <Row caps={FUNCTION_ROW} short />
        <Row caps={NUMBER_ROW} />
        <div className="flex gap-2.5">
          <KeyCap cap={{ label: "Tab", width: 1.4, corner: true }} />
          <FeatureKey feature={KEYBOARD_FIRST} style={keySize(1.75)} />
          <FeatureKey feature={YOURS} style={keySize(1.75)} />
          {letters("RTYU").map((cap) => (
            <KeyCap key={cap.label} cap={cap} />
          ))}
        </div>
        <div className="flex gap-2.5">
          <FeatureKey feature={PRIVATE} style={keySize(1.95)} />
          <FeatureKey feature={FREE} style={keySize(1.75)} />
          {letters("FGHJK").map((cap) => (
            <KeyCap key={cap.label} cap={cap} />
          ))}
        </div>
        <Row caps={SHIFT_ROW} />
      </div>
    </div>
  );
}

const keySize = (width: number, height = 1): CSSProperties => ({
  width: `calc(var(--k) * ${width})`,
  height: `calc(var(--kh) * ${height})`,
});

function Row({ caps, short = false }: { caps: Cap[]; short?: boolean }) {
  return (
    <div aria-hidden className="flex gap-2.5">
      {caps.map((cap) => (
        <KeyCap key={cap.label ?? cap.pair?.[1]} cap={cap} short={short} />
      ))}
    </div>
  );
}

/** A dim key of the keyboard behind the reasons; it has no shine. */
function KeyCap({ cap, short = false }: { cap: Cap; short?: boolean }) {
  const { width = 1, label, pair, corner } = cap;
  return (
    <span
      aria-hidden
      style={keySize(width, short ? 0.45 : 1)}
      className={`relative flex shrink-0 rounded-[8px] border border-white/[0.07] bg-[linear-gradient(180deg,rgb(255_255_255/0.035)_0%,rgb(255_255_255/0.012)_100%)] text-white/30 ${
        corner ? "items-end justify-start p-2.5 text-[12px]" : "items-center justify-center"
      } ${short ? "text-[11px]" : label && !corner ? "text-[19px]" : ""}`}
    >
      {pair ? (
        <span className="flex flex-col items-center gap-1.5 leading-none">
          <span className="text-[13px]">{pair[0]}</span>
          <span className="text-[19px]">{pair[1]}</span>
        </span>
      ) : (
        label
      )}
    </span>
  );
}

/** One of the reasons, sitting in the keyboard as a lit key. */
function FeatureKey({ feature, style }: { feature: Feature; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className="relative flex shrink-0 flex-col justify-between rounded-[8px] border border-white/[0.16] bg-[linear-gradient(160deg,#242428_0%,#151518_100%)] p-2.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] max-sm:p-[7px]"
    >
      <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] text-ink-2 max-sm:size-3.5">
        {feature.icon}
      </svg>
      <p className="text-[11.5px] leading-[1.3] text-ink-2 max-sm:text-[10px] max-sm:leading-[1.2]">
        <span className="font-semibold text-ink">{feature.lead}</span> {feature.rest}
      </p>
      <CornerShine />
    </div>
  );
}
