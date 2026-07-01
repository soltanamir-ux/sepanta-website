import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
};

/** Consistent header band used at the top of subpages. */
export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div className="glow-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
        {description && (
          <div className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{description}</div>
        )}
      </div>
    </div>
  );
}
