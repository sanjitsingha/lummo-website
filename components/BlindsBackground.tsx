import type { CSSProperties } from "react";
import GradientBlinds from "@/components/GradientBlinds";

/** The gradient blinds, purple unless given a `color`: the light stays put at the top centre, and the bottom fades out. All 16 blinds are always drawn. Its parent needs `relative isolate`. */
export default function BlindsBackground({
  color = "#7c3aed",
  shine = 0.68,
  shineWidth = 1,
  phoneWidth = 720,
  phoneShine,
}: {
  color?: string;
  shine?: number;
  shineWidth?: number;
  /** How wide the blinds are drawn on screens under 640px; smaller scales them down. */
  phoneWidth?: number;
  /** The blinds' bright lines on screens under 640px; without it they match `shine`. */
  phoneShine?: number;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(180deg,#000_0%,#000_60%,transparent_100%)]"
    >
      {/* never narrower than 720px (`phoneWidth` on phones), so the blinds stay wide and the sides crop off */}
      <div
        style={{ "--blinds-phone-width": `${phoneWidth}px` } as CSSProperties}
        className="absolute inset-y-0 left-1/2 w-[max(100%,720px)] -translate-x-1/2 max-sm:w-[max(100%,var(--blinds-phone-width))]"
      >
        <GradientBlinds
          gradientColors={["#000000", color]}
          angle={-39}
          blindCount={16}
          blindMinWidth={0}
          spotlightRadius={0.5}
          shine={shine}
          phoneShine={phoneShine}
          shineWidth={shineWidth}
          relief={0.5}
          glow={0.4}
          sway={0}
          hoverTilt={0}
          clickEffect="none"
          noise={0.15}
          lightPosition={{ x: 0.5, y: 0.1 }}
          mixBlendMode="normal"
        />
      </div>
    </div>
  );
}
