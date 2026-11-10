import Image from "next/image";
import Link from "next/link";
import NavDownload from "@/components/NavDownload";

/** The logo, home, on the left and the download menu on the right; the same on every page. */
export default function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1512px] shrink-0 items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6">
      <Link
        href="/"
        aria-label="lummo home"
        className="flex items-center select-none transition-opacity hover:opacity-80"
      >
        <Image
          src="/lummo/logo.png"
          alt=""
          width={616}
          height={616}
          sizes="40px"
          loading="eager"
          draggable={false}
          className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
        />
      </Link>
      <nav className="flex items-center gap-7 text-[15px] font-normal text-[#202020] sm:gap-10 sm:text-base lg:gap-12 lg:text-[17px]">
        <NavDownload />
      </nav>
    </header>
  );
}
