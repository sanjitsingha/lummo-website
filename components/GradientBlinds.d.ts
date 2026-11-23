import type { CSSProperties, JSX } from "react";

export interface GradientBlindsProps {
  className?: string;
  style?: CSSProperties;
  dpr?: number;
  paused?: boolean;
  gradientColors?: string[];
  angle?: number;
  noise?: number;
  blindCount?: number;
  blindMinWidth?: number;
  mouseDampening?: number;
  mirrorGradient?: boolean;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  distortAmount?: number;
  shineDirection?: "left" | "right";
  lightColor?: string;
  perspective?: number;
  gradientSpeed?: number;
  shine?: number;
  relief?: number;
  glow?: number;
  sway?: number;
  speed?: number;
  hoverTilt?: number;
  clickEffect?: "ripple" | "none";
  idle?: "drift" | "center" | "stay";
  /** Pins the light at this share of the area (0 to 1), so it ignores the pointer and `idle`. */
  lightPosition?: { x: number; y: number };
  intro?: boolean;
  mixBlendMode?: CSSProperties["mixBlendMode"];
  lightMode?: boolean;
}

export default function GradientBlinds(props: GradientBlindsProps): JSX.Element;
