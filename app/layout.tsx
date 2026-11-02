import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "lummo — find anything on your PC",
  description: "Just hit a shortcut, type what you're looking for, and let your PC do the finding.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased motion-safe:scroll-smooth`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
