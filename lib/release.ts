import { cacheLife } from "next/cache";

const REPO = "sanjitsingha/lumio";
/** The app's source code. */
export const REPO_URL = `https://github.com/${REPO}`;
/** The release page: where the buttons fall back to when a file can't be looked up. */
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

/** Direct download links to the latest installers. */
export type Release = {
  windows: string | null;
  deb: string | null;
};

type GitHubRelease = {
  assets: { name: string; browser_download_url: string }[];
};

/**
 * The newest GitHub release's installers. The file names carry the version
 * (Lumio_0.1.14_x64-setup.exe), so they are looked up rather than written
 * into the page; a new release appears here within the hour.
 */
export async function getLatestRelease(): Promise<Release | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "lummo-website",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
    if (!res.ok) return null;
    const release = (await res.json()) as GitHubRelease;
    const find = (suffix: string) =>
      release.assets.find((a) => a.name.endsWith(suffix))?.browser_download_url ?? null;
    return { windows: find("-setup.exe"), deb: find(".deb") };
  } catch {
    return null;
  }
}
