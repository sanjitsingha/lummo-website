import Image from "next/image";
import { REPO_URL } from "@/lib/release";

const LINKS = [
  { label: "Download", href: "#download" },
  { label: "FAQ", href: "#faq" },
  { label: "GitHub", href: REPO_URL, external: true },
];

/** The end of the page, in the FAQ's grey so the two read as one: who made it, a few links and the trademark notice. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-black/[0.08] bg-[#f5f5f7] text-[#6e6e6e]">
      <div className="mx-auto flex max-w-[1512px] flex-col gap-5 px-6 py-8 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex items-center gap-2.5 text-sm">
            <Image src="/lummo/logo.png" alt="" width={616} height={616} sizes="24px" draggable={false} className="size-6 select-none" />
            <span>© 2026 lummo</span>
          </div>
          <nav aria-label="Footer" className="flex items-center gap-6 text-sm sm:gap-8">
            {LINKS.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="transition-colors duration-150 hover:text-[#202020]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
        <p className="max-w-[60rem] text-xs leading-[1.6] text-[#86868b]">
          lummo is an independent project and is not affiliated with, endorsed by or sponsored by Apple Inc. Apple,
          Mac and Spotlight are trademarks of Apple Inc. Windows is a trademark of the Microsoft group of companies.
          Linux® is the registered trademark of Linus Torvalds.
        </p>
      </div>
    </footer>
  );
}
