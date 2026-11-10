import { getLatestRelease, RELEASES_URL } from "@/lib/release";

/**
 * The navbar's "download" link. Hovering (or tabbing into) it drops down a direct
 * link to each installer; a tap on touch screens just scrolls to the download section.
 */
export default async function NavDownload() {
  const release = await getLatestRelease();
  const options = [
    // the download page starts the installer and shows how to open it past Windows' warning
    { name: "windows", format: ".exe", href: "/download" },
    { name: "linux", format: ".deb", href: release?.deb ?? RELEASES_URL },
  ];

  return (
    <div className="group relative">
      <a
        href="#download"
        className="flex items-center gap-1.5 transition-colors duration-150 group-hover:text-black/50"
      >
        download
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-200 group-focus-within:rotate-180 group-hover:rotate-180"
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </a>
      {/* the top padding bridges the gap, so the menu stays open while the pointer travels down to it */}
      <div className="invisible absolute top-full left-1/2 z-20 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,translate,visibility] duration-200 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <ul className="min-w-[13rem] rounded-2xl border border-black/[0.06] bg-white/90 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          {options.map(({ name, format, href }) => (
            <li key={name}>
              <a
                href={href}
                data-umami-event="download"
                data-umami-event-platform={name}
                data-umami-event-placement="navbar"
                className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] text-[#202020] transition-colors duration-150 hover:bg-black/[0.05] focus-visible:bg-black/[0.05] focus-visible:outline-none"
              >
                for {name}
                <span className="ml-auto text-[12px] text-[#a1a1a1]">{format}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
