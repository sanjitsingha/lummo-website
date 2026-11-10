"use client";

import { useEffect } from "react";

/**
 * Starts the download once the page is on screen. GitHub sends the installer as an attachment,
 * so the browser saves it and the visitor stays on this page with the steps.
 */
export default function StartDownload({ url }: { url: string }) {
  useEffect(() => {
    // a moment's wait lets the page show before the browser's download prompt or bubble does;
    // clearing it means React's double run of effects in development still downloads once
    const timer = setTimeout(() => window.location.assign(url), 400);
    return () => clearTimeout(timer);
  }, [url]);
  return null;
}
