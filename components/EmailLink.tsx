import { siteConfig } from "@/lib/site";

/**
 * Renders the contact email as a mailto link — but only once a real address
 * has been set in lib/site.ts. While it is still the "[YOUR EMAIL]"
 * placeholder we render plain text instead of emitting a broken
 * `mailto:[YOUR EMAIL]` link. See the go-live checklist in README.md.
 */
export default function EmailLink({ className }: { className?: string }) {
  const email = siteConfig.contactEmail;
  const isPlaceholder = email.includes("[");

  if (isPlaceholder) {
    return <span className={className}>{email}</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
