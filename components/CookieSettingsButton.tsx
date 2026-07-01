"use client";

import { openCookiePreferences } from "@/lib/cookie-consent";

/** Footer link that re-opens the cookie-consent preferences banner. */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Cookie Settings
    </button>
  );
}
