import type { ReactNode } from "react";

/** A raised keycap that sits on the text's baseline and scales with it; `wide` draws a spacebar. */
export default function Key({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-[1.75em] items-center justify-center rounded-[0.45em] border border-white/[0.14] bg-[linear-gradient(180deg,#303034_0%,#222225_100%)] px-[0.6em] font-sans text-[0.75em] font-medium tracking-normal text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_0_rgba(0,0,0,0.65),0_4px_8px_-3px_rgba(0,0,0,0.7)] ${wide ? "min-w-[5em]" : "min-w-[2.4em]"}`}
    >
      {children}
    </kbd>
  );
}
