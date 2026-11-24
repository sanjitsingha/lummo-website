export type ChangelogEntry = { version: string; date: string; changes: string[] };

/** What changed for people using lummo, newest first. Add each new release at the top. Build-only releases are left out. */
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.1.35",
    date: "2026-11-24",
    changes: [
      "A new lummo logo for the app, tray, installer and About page.",
      "322 system commands on Windows that act directly: Wi-Fi, Bluetooth, volume and microphone, keep awake, power mode, sleep timeouts, taskbar, dark mode, window snapping and more.",
      "The Shortcut page's category filter now works on Windows, with Settings pages sorted into the same categories.",
      "A topic word on its own, such as \"wifi\", never flips a switch.",
    ],
  },
  {
    version: "0.1.34",
    date: "2026-11-23",
    changes: [
      "Quick files now work on Windows, with your clipboard history carried over.",
      "New Shortcut page: search your commands, settings and apps, then give each an alias or a global hotkey, or turn it off.",
      "About 140 system commands on Windows for power, sound, displays, folders and tools.",
      "376 system commands on elementary OS, with a category filter. Bluetooth, dark mode, volume and more now act directly.",
      "Anything that could lose your work asks first.",
      "Spotlight names its best result by what it is, such as Application, Image or Document.",
      "Settings gets new icons, dropdowns, a text size option and a tray icon toggle. Updates and Privacy move to About.",
    ],
  },
  {
    version: "0.1.33",
    date: "2026-11-22",
    changes: [
      "Quick files on Linux: press Tab in Spotlight for your clipboard history and screenshots, filtered by kind.",
      "Currency and measurement answers that understand typos, Hindi and natural phrasing.",
      "Exchange rates are saved once a day, so conversions work offline.",
    ],
  },
  {
    version: "0.1.32",
    date: "2026-11-21",
    changes: ["A new dark-only design, with a quieter Spotlight and Settings.", "Smaller text, icons and controls, with far less explanatory text."],
  },
  {
    version: "0.1.31",
    date: "2026-11-16",
    changes: ["The Windows clipboard panel now always opens on top, including over fullscreen apps."],
  },
  {
    version: "0.1.30",
    date: "2026-11-11",
    changes: [
      "Clipboard history on Windows, in a panel at the top of the screen. Click a copy to reuse it, or drag it into another app.",
      "App and file icons in Spotlight no longer sit on a plate.",
    ],
  },
  {
    version: "0.1.29",
    date: "2026-11-10",
    changes: ["A slimmer, pill-shaped Spotlight search bar.", "The search field now shows what kind of result is selected."],
  },
  {
    version: "0.1.28",
    date: "2026-11-08",
    changes: ["The Caps Lock indicator now sits correctly in Linux password fields.", "Your settings are kept when you switch between versions."],
  },
  {
    version: "0.1.27",
    date: "2026-11-08",
    changes: ["An app's actions get their own heading and full-size rows.", "The results list scrolls without a scrollbar, and its text is cleaner."],
  },
  { version: "0.1.26", date: "2026-11-07", changes: ["lummo now uses your system's own font."] },
  {
    version: "0.1.25",
    date: "2026-11-06",
    changes: [
      "Search for tasks like “Turn on dark mode” or “Connect to Wi-Fi” to jump to the right settings page.",
      "App actions on Windows, such as a new incognito window in Chrome.",
      "Actions now show the icon of the app they open.",
    ],
  },
  {
    version: "0.1.24",
    date: "2026-11-05",
    changes: ["New “Until you type” display time for the Caps Lock indicator.", "No indicator in number fields, where Caps Lock does nothing."],
  },
  {
    version: "0.1.23",
    date: "2026-11-05",
    changes: ["The Caps Lock indicator only shows when Caps Lock is on.", "It only appears in the window you're typing in."],
  },
  { version: "0.1.22", date: "2026-11-05", changes: ["Spotlight shows each file's real type icon, such as PDF, Word or Photoshop."] },
  {
    version: "0.1.21",
    date: "2026-11-05",
    changes: ["The Caps Lock indicator works in Google Docs on Linux.", "A clearer pop when it appears."],
  },
  { version: "0.1.20", date: "2026-11-04", changes: ["The Caps Lock indicator waits for a text cursor when text is selected."] },
  {
    version: "0.1.19",
    date: "2026-11-04",
    changes: ["The Caps Lock indicator springs in, and pops into a new field instead of gliding there."],
  },
  { version: "0.1.18", date: "2026-11-04", changes: ["The Caps Lock indicator hides when a field loses focus and returns when one gets it."] },
  {
    version: "0.1.17",
    date: "2026-11-04",
    changes: ["Anonymous usage statistics, on by default, with a setting to turn them off. Nothing you type or open is included."],
  },
  { version: "0.1.16", date: "2026-11-03", changes: ["A new look for Settings, and a new lummo logo."] },
  { version: "0.1.15", date: "2026-11-03", changes: ["Lumio is now lummo. Existing installs and settings carry over."] },
  {
    version: "0.1.14",
    date: "2026-11-02",
    changes: ["Simpler General, Spotlight and Caps Lock settings.", "A live preview, plus size, opacity and corner radius for the indicator."],
  },
  {
    version: "0.1.13",
    date: "2026-11-02",
    changes: ["The Caps Lock indicator now finds the text cursor in more Linux apps, including Terminal and VS Code."],
  },
  { version: "0.1.12", date: "2026-11-02", changes: ["New 0.2, 0.3, 0.5 and 0.8 second display times for the indicator."] },
  { version: "0.1.11", date: "2026-11-02", changes: ["The Caps Lock indicator works in every Chrome field on Linux, not just the first."] },
  { version: "0.1.10", date: "2026-11-02", changes: ["The indicator follows the text cursor in rich editors like Gmail and WhatsApp Web."] },
  {
    version: "0.1.9",
    date: "2026-11-02",
    changes: ["Spotlight gets app actions, a calculator and Google search.", "Smoother opening, closing and resizing."],
  },
  { version: "0.1.8", date: "2026-11-01", changes: ["The indicator finds the text cursor in Chrome and on empty LibreOffice lines."] },
  { version: "0.1.7", date: "2026-11-01", changes: ["Support for GTK 4 text fields, and faster repeated presses."] },
  { version: "0.1.6", date: "2026-11-01", changes: ["The indicator works in LibreOffice and finds the cursor faster."] },
  { version: "0.1.5", date: "2026-11-01", changes: ["The indicator shows nothing by default where there's no text cursor."] },
  {
    version: "0.1.4",
    date: "2026-11-01",
    changes: ["The Caps Lock indicator now appears at your text cursor.", "Fixed it disappearing after the first time it showed."],
  },
  { version: "0.1.1", date: "2026-11-01", changes: ["Hidden dot-folders are now left out of file search on Windows."] },
  {
    version: "0.1.0",
    date: "2026-11-01",
    changes: ["The first release: hotkey search and a Caps Lock indicator for Windows and elementary OS, with signed in-app updates."],
  },
];
