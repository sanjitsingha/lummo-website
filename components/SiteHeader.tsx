import Image from "next/image";
import Link from "next/link";
import HeaderFade from "@/components/HeaderFade";
import NavDownload from "@/components/NavDownload";

/** The logo, home, on the left and the download menu on the right, fixed to the top of every page. */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <HeaderFade />
      <div className="mx-auto flex w-full max-w-[1512px] items-center justify-between px-6 py-3 sm:px-10 sm:py-3.5 lg:px-16 lg:py-4">
      <Link href="/" aria-label="lummo home" className="flex items-center select-none transition-opacity hover:opacity-80">
        <Image
          src="/lummo/logo.png"
          alt=""
          width={292}
          height={292}
          sizes="40px"
          loading="eager"
          draggable={false}
          className="size-8 sm:size-9 lg:size-10"
        />
      </Link>
      <nav className="text-[15px] text-ink sm:text-base lg:text-[17px]">
        <NavDownload />
      </nav>
      </div>
    </header>
  );
}
