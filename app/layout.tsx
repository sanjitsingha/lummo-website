import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "lummo — Spotlight & Caps Lock indicator for Windows and Linux";
const description =
  "lummo brings the Mac's Spotlight search and Caps Lock indicator to Windows and Linux. Hit alt + space to find apps, files and folders. Free download.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "lummo",
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "lummo", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased motion-safe:scroll-smooth`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
