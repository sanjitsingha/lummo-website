export type Platform = "windows" | "linux";

/** The system never changes while the page is open, so there's nothing to listen for. */
export const subscribeToPlatform = () => () => {};

/** Android phones say Linux too, but can't run the .deb, so they count as Windows here. */
export function detectPlatform(): Platform {
  const agent = navigator.userAgent;
  return /Linux|X11/.test(agent) && !/Android/.test(agent) ? "linux" : "windows";
}

/** What the server renders, before the browser can say which system it's on. */
export const serverPlatform = (): Platform => "windows";
