import { siteConfig } from "@/lib/site";

type LogoProps = {
  /** Show the "Sepanta" wordmark next to the mark. Defaults to true. */
  withWordmark?: boolean;
  /** Extra classes for the wrapping element. */
  className?: string;
  /** Pixel size of the square mark. Defaults to 34. */
  size?: number;
};

/**
 * Sepanta logo — an original abstract geometric mark (a bold, blocky "S"
 * cut from a coral-gradient tile) beside the wordmark. Not derived from any
 * existing brand.
 */
export default function Logo({ withWordmark = true, className = "", size = 34 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withWordmark && (
        <span
          className="font-display text-[1.35rem] font-bold tracking-tight text-ink"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}

/** The standalone geometric mark (no wordmark). */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      role="img"
      aria-label={`${siteConfig.legalName} logo`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sepanta-mark-grad" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff9a5b" />
          <stop offset="0.55" stopColor="#ff6a3d" />
          <stop offset="1" stopColor="#f5522e" />
        </linearGradient>
      </defs>
      {/* gradient tile */}
      <rect x="2" y="2" width="36" height="36" rx="11" fill="url(#sepanta-mark-grad)" />
      {/* blocky "S" cut as negative space (page-coloured) */}
      <g fill="#0b1120">
        <rect x="12" y="10.5" width="16" height="4.2" rx="2.1" />
        <rect x="12" y="17.9" width="16" height="4.2" rx="2.1" />
        <rect x="12" y="25.3" width="16" height="4.2" rx="2.1" />
        <rect x="12" y="10.5" width="4.2" height="11.6" rx="2.1" />
        <rect x="23.8" y="17.9" width="4.2" height="11.6" rx="2.1" />
      </g>
    </svg>
  );
}
