import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, ShieldCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import EmailLink from "@/components/EmailLink";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.legalName}. Tell us about the everyday problem you'd like to solve.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Tell us what you're working on or the everyday problem you'd like to solve. We read every message and reply as soon as we can."
      />

      <section className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14">
          {/* Aside */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-semibold text-ink">Prefer email?</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-muted">
                    {/* Placeholder — replace with your real address in lib/site.ts (see README). */}
                    <EmailLink className="text-ink underline underline-offset-2 hover:text-accent" />
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-muted">{siteConfig.address}</span>
                </li>
              </ul>
            </div>

            <div className="card p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted">
                  We only use the details you send to reply to your message. Read how we handle your
                  data in our{" "}
                  <Link href="/privacy" className="text-accent underline underline-offset-2 hover:text-glow">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
