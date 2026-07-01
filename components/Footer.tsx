import Link from "next/link";
import Logo from "@/components/Logo";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import { siteConfig } from "@/lib/site";

const linkClass =
  "text-sm text-muted transition-colors hover:text-ink focus-visible:text-ink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-midnight">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {siteConfig.legalName} builds apps and practical tools that solve everyday problems for
              people.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <nav aria-label="Company">
              <h2 className="text-sm font-semibold text-ink">Company</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/#about" className={linkClass}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/#what-we-do" className={linkClass}>
                    What We Do
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={linkClass}>
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h2 className="text-sm font-semibold text-ink">Legal</h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy" className={linkClass}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={linkClass}>
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton className={`${linkClass} cursor-pointer`} />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Registered in {siteConfig.governingLawState}, {siteConfig.country}.
          </p>
        </div>
      </div>
    </footer>
  );
}
