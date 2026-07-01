import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import EmailLink from "@/components/EmailLink";
import { siteConfig, LEGAL_LAST_UPDATED, LEGAL_LAST_UPDATED_LABEL } from "@/lib/site";

/*
  ⚠️  LEGAL DISCLAIMER
  This Privacy Policy is a good-faith template intended as a starting point.
  It is NOT legal advice. Before publishing, have it reviewed by a qualified
  lawyer to ensure it accurately reflects your actual data practices and
  complies with the GDPR and any other laws that apply to you.
*/

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.legalName} collects, uses and protects your personal data, and your rights under the GDPR.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={
          <>
            Last updated:{" "}
            <time dateTime={LEGAL_LAST_UPDATED}>{LEGAL_LAST_UPDATED_LABEL}</time>
          </>
        }
      />

      <article className="prose-legal mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p>
          This Privacy Policy explains how {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, shares and
          protects personal data when you visit {siteConfig.url} (the &ldquo;Site&rdquo;) or contact
          us. It also describes your rights under the EU General Data Protection Regulation (GDPR)
          and how to exercise them.
        </p>

        <h2>1. Data controller</h2>
        <p>
          The data controller responsible for your personal data is:
        </p>
        <ul>
          <li>
            <strong>{siteConfig.legalName}</strong>
          </li>
          <li>Address: {siteConfig.address}</li>
          <li>
            Email:{" "}
            <EmailLink />
          </li>
        </ul>
        <p>
          If you have any questions about this policy or how we handle your data, please contact us
          using the details above.
        </p>

        <h2>2. Personal data we collect</h2>
        <p>We keep data collection to a minimum. We may process the following categories of data:</p>
        <ul>
          <li>
            <strong>Contact form data.</strong> When you use our contact form, we collect the name,
            email address and message content you provide, together with your consent to process it.
          </li>
          <li>
            <strong>Analytics and technical data.</strong> If — and only if — you accept analytics
            cookies, we may collect limited, largely anonymised information such as pages visited,
            approximate region, browser type and device type. No analytics are loaded until you
            consent.
          </li>
          <li>
            <strong>Server logs.</strong> Our hosting provider may automatically process technical
            information (such as IP address and request metadata) as part of delivering the Site
            securely and reliably.
          </li>
        </ul>
        <p>
          We do not intentionally collect special categories of data (such as health, biometric or
          political data), and we do not knowingly collect data from children under 16.
        </p>

        <h2>3. Lawful bases for processing</h2>
        <p>Under the GDPR, we rely on the following lawful bases:</p>
        <ul>
          <li>
            <strong>Consent (Art. 6(1)(a)).</strong> For processing your contact-form submission and
            for setting non-essential analytics cookies. You may withdraw consent at any time.
          </li>
          <li>
            <strong>Legitimate interests (Art. 6(1)(f)).</strong> For keeping the Site secure,
            preventing abuse and spam, and maintaining the reliable operation of our services, where
            those interests are not overridden by your rights and freedoms.
          </li>
        </ul>

        <h2>4. How we use your data</h2>
        <ul>
          <li>To respond to your enquiries and communicate with you.</li>
          <li>To operate, secure, maintain and improve the Site.</li>
          <li>To detect, prevent and address technical issues, spam or abuse.</li>
          <li>To comply with legal obligations where applicable.</li>
        </ul>
        <p>
          We do not sell your personal data, and we do not use it for automated decision-making or
          profiling that produces legal or similarly significant effects.
        </p>

        <h2>5. Data retention</h2>
        <p>
          We keep personal data only for as long as necessary for the purposes described above:
        </p>
        <ul>
          <li>
            <strong>Contact enquiries:</strong> retained for as long as needed to handle your request
            and for a reasonable period afterwards for our records, then deleted.{" "}
            <em>[Adjust this retention period to your actual practice.]</em>
          </li>
          <li>
            <strong>Analytics data:</strong> retained according to the settings and defaults of our
            analytics provider.
          </li>
          <li>
            <strong>Server logs:</strong> retained by our hosting provider for a limited period for
            security and diagnostics.
          </li>
        </ul>

        <h2>6. Third-party processors</h2>
        <p>
          We share personal data only with service providers who process it on our behalf under
          appropriate data-processing terms. These currently include:
        </p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong> — hosting and content delivery for the Site.
          </li>
          <li>
            <strong>Resend</strong> (email API) — delivering contact-form messages to our inbox.
          </li>
          <li>
            <em>
              [Placeholder for any additional processors — e.g. analytics provider, CRM, or
              customer-support tools. List each provider and its purpose here.]
            </em>
          </li>
        </ul>

        <h2>7. International data transfers</h2>
        <p>
          Some of our processors are located outside the European Economic Area (EEA), including in
          the United States. Where personal data is transferred outside the EEA, we rely on
          appropriate safeguards such as the European Commission&rsquo;s Standard Contractual Clauses
          or an equivalent recognised transfer mechanism, so that your data continues to receive an
          adequate level of protection.
        </p>

        <h2>8. Cookies and similar technologies</h2>
        <p>
          We use a small number of <strong>essential cookies</strong> and local storage that are
          strictly necessary for the Site to function and to remember your cookie preferences. These
          do not require consent.
        </p>
        <p>
          <strong>Non-essential cookies</strong> (such as analytics) are only set after you give
          consent through our cookie banner. You can accept, reject, or fine-tune your choice at any
          time — including withdrawing consent — using{" "}
          <CookieSettingsButton className="cursor-pointer text-accent underline underline-offset-2 hover:text-glow" />{" "}
          or the &ldquo;Cookie Settings&rdquo; link in the footer.
        </p>

        <h2>9. Your rights under the GDPR</h2>
        <p>
          If you are in the EEA (and in many cases beyond), you have the following rights in relation
          to your personal data:
        </p>
        <ul>
          <li>
            <strong>Right of access</strong> — to obtain confirmation of whether we process your data
            and a copy of it.
          </li>
          <li>
            <strong>Right to rectification</strong> — to have inaccurate or incomplete data corrected.
          </li>
          <li>
            <strong>Right to erasure</strong> (&ldquo;right to be forgotten&rdquo;) — to have your
            data deleted in certain circumstances.
          </li>
          <li>
            <strong>Right to restriction of processing</strong> — to limit how we use your data in
            certain circumstances.
          </li>
          <li>
            <strong>Right to data portability</strong> — to receive your data in a structured,
            commonly used, machine-readable format and to transmit it to another controller.
          </li>
          <li>
            <strong>Right to object</strong> — to object to processing based on legitimate interests,
            including for direct marketing.
          </li>
          <li>
            <strong>Right to withdraw consent</strong> — to withdraw any consent you have given at any
            time, without affecting the lawfulness of processing before withdrawal.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <EmailLink />. We will respond
          within the time limits required by law.
        </p>

        <h2>10. Right to lodge a complaint</h2>
        <p>
          If you believe we have not handled your personal data lawfully, you have the right to lodge
          a complaint with your local data-protection supervisory authority. You can find your
          authority via the European Data Protection Board at{" "}
          <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">
            edpb.europa.eu
          </a>
          . We would, however, appreciate the chance to address your concerns first.
        </p>

        <h2>11. How we protect your data</h2>
        <p>
          We use technical and organisational measures appropriate to the risk, including encryption
          in transit (HTTPS), access controls, and data minimisation. No method of transmission or
          storage is completely secure, but we work to protect your data and to notify you and the
          relevant authority of any breach where required by law.
        </p>

        <h2>12. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the
          &ldquo;Last updated&rdquo; date above and, where changes are significant, take reasonable
          steps to notify you. Please review this page periodically.
        </p>

        <h2>13. Contact us</h2>
        <p>
          For any privacy-related questions or requests, contact {siteConfig.legalName} at{" "}
          <EmailLink /> or at the
          address listed in Section 1.
        </p>
      </article>
    </>
  );
}
