import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import EmailLink from "@/components/EmailLink";
import { siteConfig, LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_LABEL } from "@/lib/site";

/*
  ⚠️  LEGAL DISCLAIMER
  These Terms & Conditions are a good-faith template and a starting point
  only. They are NOT legal advice. Have them reviewed by a qualified lawyer
  before publishing to ensure they fit your business and jurisdiction.
*/

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms and conditions governing your use of the ${siteConfig.legalName} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        description={
          <>
            Last updated:{" "}
            <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
          </>
        }
      />

      <article className="prose-legal mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p>
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
          website at {siteConfig.url} (the &ldquo;Site&rdquo;), operated by {siteConfig.legalName}{" "}
          (&ldquo;{siteConfig.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;).
          By accessing or using the Site, you agree to these Terms.
        </p>

        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using the Site, you confirm that you have read, understood and agree to be
          bound by these Terms and by our{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the Site. If
          you are using the Site on behalf of an organisation, you represent that you are authorised
          to accept these Terms on its behalf.
        </p>

        <h2>2. Use of the website</h2>
        <p>You agree to use the Site only for lawful purposes. In particular, you agree not to:</p>
        <ul>
          <li>Use the Site in any way that breaches applicable laws or regulations.</li>
          <li>
            Attempt to gain unauthorised access to the Site, its servers, or any systems or networks
            connected to it.
          </li>
          <li>
            Introduce malware or any other malicious or technologically harmful material, or attempt
            to disrupt or overload the Site.
          </li>
          <li>
            Use the contact form or any other feature to send spam, unlawful, abusive, or misleading
            content.
          </li>
          <li>Scrape, copy, or reproduce the Site&rsquo;s content except as permitted below.</li>
        </ul>
        <p>
          We may suspend or restrict access to the Site (or take other appropriate action) if we
          reasonably believe you have breached these Terms.
        </p>

        <h2>3. Intellectual property</h2>
        <p>
          Unless otherwise stated, all content on the Site — including text, graphics, logos, the
          Sepanta name and mark, layout, and software — is owned by or licensed to{" "}
          {siteConfig.legalName} and is protected by intellectual-property laws. You may view and
          temporarily download Site content for your personal, non-commercial use only. You may not
          reproduce, distribute, modify, or create derivative works from our content without our
          prior written permission.
        </p>

        <h2>4. Third-party links</h2>
        <p>
          The Site may contain links to third-party websites or resources. We provide these links for
          convenience only and do not endorse and are not responsible for the content, products, or
          practices of any third-party sites. Accessing third-party sites is at your own risk and
          subject to their terms.
        </p>

        <h2>5. Disclaimers</h2>
        <p>
          The Site and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis, without warranties of any kind, whether express or implied,
          including but not limited to implied warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the Site will be
          uninterrupted, timely, secure, or error-free, or that any information on it is accurate,
          complete, or current. Nothing on the Site constitutes professional advice.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.legalName} and its owners, officers,
          and contributors will not be liable for any indirect, incidental, special, consequential,
          or punitive damages, or for any loss of profits, data, goodwill, or other intangible
          losses, arising out of or in connection with your use of (or inability to use) the Site.
          Where liability cannot be excluded, it is limited to the maximum extent permitted by
          applicable law. Nothing in these Terms excludes or limits liability that cannot lawfully be
          excluded or limited.
        </p>

        <h2>7. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless {siteConfig.legalName} from and against any claims,
          damages, liabilities, and expenses (including reasonable legal fees) arising out of your
          misuse of the Site or your breach of these Terms.
        </p>

        <h2>8. Governing law</h2>
        <p>
          These Terms and any dispute or claim arising out of or in connection with them are governed
          by and construed in accordance with the laws of the State of{" "}
          {siteConfig.governingLawState}, {siteConfig.country}, without regard to its conflict-of-law
          principles. You agree to the exclusive jurisdiction of the state and federal courts located
          in the State of {siteConfig.governingLawState} for the resolution of any disputes, to the
          extent permitted by applicable law. If you access the Site from outside the{" "}
          {siteConfig.country}, you are responsible for compliance with your local laws.
        </p>

        <h2>9. Changes to these terms</h2>
        <p>
          We may revise these Terms from time to time. The updated version will be indicated by the
          &ldquo;Last updated&rdquo; date above and will take effect as soon as it is posted. Your
          continued use of the Site after any change constitutes your acceptance of the revised
          Terms. Please review this page periodically.
        </p>

        <h2>10. Severability</h2>
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision will
          be limited or removed to the minimum extent necessary, and the remaining provisions will
          remain in full force and effect.
        </p>

        <h2>11. Contact us</h2>
        <p>
          If you have any questions about these Terms, please contact {siteConfig.legalName} at{" "}
          <EmailLink />.
        </p>
      </article>
    </>
  );
}
