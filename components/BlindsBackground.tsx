import GradientBlinds from "@/components/GradientBlinds";

/** The gradient blinds, purple unless given a `color`: the light stays put at the top centre, and the bottom fades out. Its parent needs `relative isolate`. */
export default function BlindsBackground({ color = "#7c3aed" }: { color?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,#000_0%,#000_60%,transparent_100%)]"
    >
      <GradientBlinds
        gradientColors={["#000000", color]}
        angle={-39}
        blindCount={16}
        blindMinWidth={60}
        spotlightRadius={0.5}
        shine={0.68}
        relief={0.5}
        glow={0.4}
        sway={0}
        hoverTilt={0}
        clickEffect="none"
        noise={0.15}
        lightPosition={{ x: 0.5, y: 0.1 }}
      />
    </div>
  );
}
