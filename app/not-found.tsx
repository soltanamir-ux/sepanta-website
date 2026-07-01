import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
        Sorry — the page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-midnight transition-colors hover:bg-accent-strong"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        Back to home
      </Link>
    </section>
  );
}
