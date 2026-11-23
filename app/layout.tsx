import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "lummo Space - Spotlight search and productivity tools for Windows and Linux";
const description =
  "Find apps and files, convert currencies and measurements, do quick math and bring back anything you copied, all from one hotkey. Free for Windows and Linux.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: "lummo",
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: "lummo", type: "website" },
  twitter: { card: "summary", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased motion-safe:scroll-smooth`}>
      <body className="flex min-h-full flex-col">{children}</body>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="1b20c271-964f-484e-95a5-4ef4b9dd1510"
      />
    </html>
  );
}
