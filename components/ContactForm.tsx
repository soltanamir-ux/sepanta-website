"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  consent?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot — real users leave this empty

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!email.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Please enter a valid email address.";
    if (!message.trim()) next.message = "Please enter a message.";
    else if (message.trim().length < 10)
      next.message = "Please add a little more detail (at least 10 characters).";
    if (!consent) next.consent = "Please agree to the processing of your data to continue.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field so keyboard/screen-reader users
      // are taken straight to (and hear) the problem.
      if (found.name) nameRef.current?.focus();
      else if (found.email) emailRef.current?.focus();
      else if (found.message) messageRef.current?.focus();
      else if (found.consent) consentRef.current?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          consent,
          company, // honeypot
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
      setErrors({});
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="card flex flex-col items-center gap-4 p-8 text-center"
      >
        <span className="inline-flex rounded-full bg-accent/15 p-3 text-accent">
          <CheckCircle2 size={28} aria-hidden="true" />
        </span>
        <h2 className="text-xl font-semibold text-ink">Thanks — your message is on its way.</h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          We've received your message and will get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="name"
            ref={nameRef}
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-2 w-full rounded-xl border border-line bg-midnight px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-sm text-accent">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            ref={emailRef}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="mt-2 w-full rounded-xl border border-line bg-midnight px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-sm text-accent">
              {errors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-ink">
            Message
          </label>
          <textarea
            id="message"
            ref={messageRef}
            name="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className="mt-2 w-full resize-y rounded-xl border border-line bg-midnight px-4 py-3 text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
            placeholder="Tell us a little about what you're working on…"
          />
          {errors.message && (
            <p id="message-error" role="alert" className="mt-1.5 text-sm text-accent">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot — visually hidden, not announced to screen readers */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company (leave blank)</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Consent */}
        <div>
          <div className="flex items-start gap-3">
            <input
              id="consent"
              ref={consentRef}
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-accent"
            />
            <label htmlFor="consent" className="text-sm leading-relaxed text-muted">
              I agree to the processing of my data as described in the{" "}
              <Link href="/privacy" className="text-accent underline underline-offset-2 hover:text-glow">
                Privacy Policy
              </Link>
              .
            </label>
          </div>
          {errors.consent && (
            <p id="consent-error" role="alert" className="mt-1.5 text-sm text-accent">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Server error */}
        {status === "error" && serverError && (
          <p role="alert" className="flex items-center gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-ink">
            <AlertCircle size={18} className="shrink-0 text-accent" aria-hidden="true" />
            {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-midnight shadow-lg shadow-accent/25 transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
