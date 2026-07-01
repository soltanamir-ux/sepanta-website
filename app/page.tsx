import Link from "next/link";
import {
  ArrowRight,
  Smartphone,
  Globe,
  Sparkles,
  LifeBuoy,
  ShieldCheck,
  Gauge,
  PenTool,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

const services = [
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Native-feeling iOS and Android apps that are fast, intuitive, and a pleasure to use every day.",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Responsive, reliable web apps — from quick tools to full products — built on a modern stack.",
  },
  {
    icon: Sparkles,
    title: "Consumer Tools",
    description:
      "Focused utilities that remove friction from everyday tasks and just work, right out of the box.",
  },
  {
    icon: LifeBuoy,
    title: "Ongoing Support",
    description:
      "We don't disappear at launch. We maintain, refine, and improve what we build over time.",
  },
] as const;

const values = [
  { icon: PenTool, label: "Thoughtful design" },
  { icon: Gauge, label: "Fast & reliable" },
  { icon: ShieldCheck, label: "Privacy-first" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="glow-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Software studio for everyday problems
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">
              We build apps that solve{" "}
              <span className="gradient-text">everyday problems.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {siteConfig.legalName} is a software company crafting mobile and web apps and practical
              consumer tools — the kind of software that quietly makes your day a little easier.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-midnight shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong"
              >
                Get in Touch
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                href="/#what-we-do"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-transparent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                What we do
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              {values.map((v) => (
                <li key={v.label} className="inline-flex items-center gap-2 text-sm text-muted">
                  <v.icon size={18} className="text-accent" aria-hidden="true" />
                  {v.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section id="about" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <Reveal>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">About us</p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  A small team with a simple mission.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  {siteConfig.legalName} is a software company focused on the everyday. We believe the
                  best software fades into the background — it solves a real problem, respects your
                  time, and doesn't get in the way.
                </p>
                <p>
                  We design and build mobile and web applications and consumer tools from first
                  principles. Every project starts with a genuine problem worth solving, and ends with
                  something people actually enjoy using.
                </p>
                <p>
                  We care about craft, clarity, and privacy. Whether we're shaping a brand-new idea or
                  refining an existing product, our goal is the same: practical software that makes
                  daily life a little smoother.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────── */}
      <section id="what-we-do" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent">
                What we do
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                From idea to shipped — and everything after.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                We work end to end across platforms, so a single team carries your product from
                concept through launch and beyond.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90}>
                <article className="card h-full p-6">
                  <span className="inline-flex rounded-xl bg-accent/12 p-3 text-accent" aria-hidden="true">
                    <service.icon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
              <div className="glow-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <h2 className="mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
                  Have a problem worth solving?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
                  Tell us what's slowing you down. We'll help you figure out whether software is the
                  answer — and if it is, we'll build it.
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-midnight shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong"
                >
                  Get in Touch
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
