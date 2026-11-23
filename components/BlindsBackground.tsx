import GradientBlinds from "@/components/GradientBlinds";

/** The gradient blinds, purple unless given a `color`: the light stays put at the top centre, and the bottom fades out. All 16 blinds are always drawn. Its parent needs `relative isolate`. */
export default function BlindsBackground({ color = "#7c3aed" }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(180deg,#000_0%,#000_60%,transparent_100%)]"
    >
      {/* never narrower than 720px, so on phones the blinds stay wide and the sides crop off */}
      <div className="absolute inset-y-0 left-1/2 w-[max(100%,720px)] -translate-x-1/2">
        <GradientBlinds
          gradientColors={["#000000", color]}
          angle={-39}
          blindCount={16}
          blindMinWidth={0}
          spotlightRadius={0.5}
          shine={0.68}
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
