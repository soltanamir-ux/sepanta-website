"use client";

import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  getStoredConsent,
  type ConsentValue,
} from "@/lib/cookie-consent";

/**
 * Consent gate for non-essential analytics.
 *
 * This component renders NOTHING until the visitor has explicitly accepted
 * analytics cookies via the cookie banner. It re-checks whenever consent
 * changes, so analytics can be enabled or disabled at any time.
 *
 * ▸ To wire up real analytics, drop your provider inside the `enabled`
 *   branch below. Examples:
 *
 *   // Vercel Analytics (npm i @vercel/analytics):
 *   //   import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
 *   //   return <VercelAnalytics />;
 *
 *   // Google Analytics (next/script):
 *   //   import Script from "next/script";
 *   //   return (
 *   //     <>
 *   //       <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" strategy="afterInteractive" />
 *   //       <Script id="ga-init" strategy="afterInteractive">{`
 *   //         window.dataLayer = window.dataLayer || [];
 *   //         function gtag(){dataLayer.push(arguments);}
 *   //         gtag('js', new Date());
 *   //         gtag('config', 'G-XXXX');
 *   //       `}</Script>
 *   //     </>
 *   //   );
 */
export default function Analytics() {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    setConsent(getStoredConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentValue>).detail;
      setConsent(detail ?? getStoredConsent());
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  const enabled = consent === "accepted";

  if (!enabled) return null;

  // ── Analytics is enabled here (user accepted). Load providers below. ──
  // Nothing is loaded by default so the template ships privacy-first.
  return null;
}
