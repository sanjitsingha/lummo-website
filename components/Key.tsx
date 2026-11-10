import type { ReactNode } from "react";

/** A raised keycap that sits on the text's baseline and scales with it; `wide` draws a spacebar. */
export default function Key({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <kbd
      className={`inline-flex h-[1.75em] items-center justify-center rounded-[0.45em] border border-black/[0.12] bg-[linear-gradient(180deg,#ffffff_0%,#f1f1f3_100%)] px-[0.6em] font-sans text-[0.75em] font-medium tracking-normal text-[#434343] shadow-[inset_0_1px_0_#fff,0_2px_0_rgba(0,0,0,0.1),0_4px_8px_-3px_rgba(0,0,0,0.18)] ${wide ? "min-w-[5em]" : "min-w-[2.4em]"}`}
    >
      {children}
    </kbd>
  );
}
