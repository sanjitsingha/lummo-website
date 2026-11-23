import Image from "next/image";
import Link from "next/link";
import NavDownload from "@/components/NavDownload";

/** The logo, home, on the left and the download menu on the right, over the top of every page. */
export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 mx-auto flex w-full max-w-[1512px] items-center justify-between px-6 py-4 sm:px-10 sm:py-5 lg:px-16 lg:py-6">
      <Link href="/" aria-label="lummo home" className="flex items-center select-none transition-opacity hover:opacity-80">
        <Image
          src="/lummo/logo.png"
          alt=""
          width={616}
          height={616}
          sizes="40px"
          loading="eager"
          draggable={false}
          className="size-8 sm:size-9 lg:size-10"
        />
      </Link>
      <nav className="text-[15px] text-ink sm:text-base lg:text-[17px]">
        <NavDownload />
      </nav>
    </header>
  );
}
