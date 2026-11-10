import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The three clicks from a downloaded installer to a running one on Windows, each with a picture of
 * what's on screen at that moment. The pictures are drawn here rather than screenshots, so they stay
 * sharp at any size and name the file the visitor actually downloaded. Everything inside a picture
 * is sized in `cqw` (hundredths of the picture's width), so it scales as one with the card.
 */
export default function InstallSteps({ file }: { file: string }) {
  return (
    <ol className="grid w-full max-w-[28rem] gap-5 text-left lg:max-w-[72rem] lg:grid-cols-3 lg:gap-6">
      <Step number={1} title="Open the file" picture={<DownloadsPanel file={file} />}>
        Click <strong className="font-medium text-[#434343]">{file}</strong> in your browser&apos;s downloads, or
        find it in your Downloads folder.
      </Step>
      <Step number={2} title="Click “More info”" picture={<SmartScreen file={file} />}>
        Windows double-checks apps it hasn&apos;t seen many times yet, and lummo is new. Click{" "}
        <strong className="font-medium text-[#434343]">More info</strong> in the blue box.
      </Step>
      <Step number={3} title="Click “Run anyway”" picture={<SmartScreen file={file} expanded />}>
        The installer opens and sets lummo up in a few seconds. That&apos;s all, there&apos;s nothing else to
        click.
      </Step>
    </ol>
  );
}

function Step({ number, title, picture, children }: { number: number; title: string; picture: ReactNode; children: ReactNode }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)]">
      {/* a soft desktop for the picture to sit on */}
      <div
        aria-hidden
        className="@container flex aspect-[5/4] items-center justify-center bg-[linear-gradient(160deg,#dcebfd_0%,#eef4fb_55%,#f5f5f7_100%)]"
      >
        {picture}
      </div>
      <div className="flex flex-col gap-2 px-6 pt-5 pb-7">
        <h3 className="flex items-center gap-3 text-[17px] text-[#202020] lg:text-[18px]">
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(180deg,#4fa2fd_0%,#0971e6_100%)] text-[14px] text-white shadow-[inset_0_0_4px_0.5px_rgba(255,255,255,0.55)]">
            {number}
          </span>
          {title}
        </h3>
        <p className="text-[15px] leading-[1.6] text-[#6e6e6e]">{children}</p>
      </div>
    </li>
  );
}

/** A browser's downloads list with the installer in it. */
function DownloadsPanel({ file }: { file: string }) {
  return (
    <div className="w-[80cqw] rounded-[3cqw] border border-black/[0.08] bg-white p-[4cqw] text-left shadow-[0_18px_40px_-14px_rgba(0,0,0,0.3)]">
      <p className="text-[4cqw] font-medium text-[#202020]">Downloads</p>
      <div className="mt-[3.5cqw] flex items-center gap-[3cqw] rounded-[2cqw] bg-[#f3f6fb] p-[3cqw]">
        <Image src="/lummo/logo.png" alt="" width={616} height={616} sizes="48px" className="size-[10cqw] shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[3.5cqw] text-[#202020]">{file}</p>
          <p className="mt-[1.2cqw] text-[3cqw] text-[#6e6e6e]">Done</p>
        </div>
        <ClickHint ring="border-[#1076e8]">
          <span className="text-[3.4cqw] font-medium text-[#1076e8]">Open file</span>
        </ClickHint>
      </div>
    </div>
  );
}

/**
 * Microsoft Defender SmartScreen's "Windows protected your PC" box, as Windows shows it for a new
 * app: first with "More info", then, `expanded`, with the app and publisher and "Run anyway".
 */
function SmartScreen({ file, expanded = false }: { file: string; expanded?: boolean }) {
  return (
    <div className="flex aspect-[1.18] w-[80cqw] flex-col bg-[#0063b1] text-left font-['Segoe_UI',system-ui,sans-serif] text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,0.45)]">
      <div className="flex justify-end px-[3cqw] pt-[2cqw]">
        <svg viewBox="0 0 10 10" className="size-[3cqw]" stroke="currentColor" strokeWidth="1" aria-hidden>
          <path d="M1 1l8 8M9 1l-8 8" />
        </svg>
      </div>
      <div className="flex-1 px-[5cqw]">
        <p className="text-[4.9cqw] leading-[1.2] font-light whitespace-nowrap">Windows protected your PC</p>
        <p className="mt-[3cqw] text-[3.1cqw] leading-[1.45]">
          Microsoft Defender SmartScreen prevented an unrecognized app from starting. Running this app might put
          your PC at risk.
        </p>
        {expanded ? (
          <dl className="mt-[3cqw] grid grid-cols-[auto_1fr] gap-x-[3cqw] gap-y-[1cqw] text-[3.1cqw] leading-[1.45]">
            <dt>App:</dt>
            <dd className="truncate">{file}</dd>
            <dt>Publisher:</dt>
            <dd>Unknown publisher</dd>
          </dl>
        ) : (
          <p className="mt-[2.5cqw]">
            <ClickHint ring="border-white">
              <span className="text-[3.1cqw] underline underline-offset-[0.6cqw]">More info</span>
            </ClickHint>
          </p>
        )}
      </div>
      <div className="flex justify-end gap-[2cqw] px-[5cqw] pb-[5cqw]">
        {expanded && (
          <ClickHint ring="border-white">
            <WindowsButton>Run anyway</WindowsButton>
          </ClickHint>
        )}
        <WindowsButton>Don&apos;t run</WindowsButton>
      </div>
    </div>
  );
}

function WindowsButton({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-w-[22cqw] justify-center border-[0.5cqw] border-white/80 px-[3cqw] py-[1.2cqw] text-[3cqw]">
      {children}
    </span>
  );
}

/** Marks what to click: a ring that keeps pulsing outwards, and a mouse pointer resting on it. */
function ClickHint({ ring, children }: { ring: string; children: ReactNode }) {
  return (
    <span className="relative inline-flex">
      {children}
      <span
        className={`pointer-events-none absolute -inset-[1.5cqw] rounded-[1.5cqw] border-[0.6cqw] ${ring} animate-[click-ring_1.8s_ease-out_infinite] motion-reduce:animate-none`}
      />
      <svg
        viewBox="0 0 16 22"
        className="pointer-events-none absolute top-[55%] left-[60%] w-[4.2cqw] drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]"
        aria-hidden
      >
        <path d="M1 1v17l4.6-4.2 3.2 7 3-1.4-3.1-6.8H15z" fill="#fff" stroke="#000" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
