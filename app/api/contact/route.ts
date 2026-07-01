import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

// Contact-form submissions are sent by email via Resend.
// Runs on the Node.js runtime (default) so process.env is available.

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  consent?: unknown;
  company?: unknown; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── Very small in-memory rate limiter ────────────────────────────────
// Good enough to blunt casual abuse. NOTE: serverless instances are
// ephemeral and not shared, so for real protection use a durable store
// (e.g. Upstash Redis / Vercel KV). Limit: 5 requests / 10 min / IP.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request): string {
  // Take the first (client) entry of X-Forwarded-For, but fall through to
  // X-Real-IP / "unknown" if that entry is missing or blank — otherwise a
  // malformed header would collapse many clients into one empty-string bucket.
  const first = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (first) return first;
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Trim, cap length, and strip dangerous control characters.
 * Keeps tab (9), newline (10) and carriage return (13); drops the rest
 * of the C0 controls and DEL — done via char codes so the source stays
 * free of literal control bytes.
 */
function clean(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 0;
    if (code === 127) continue;
    if (code < 32 && code !== 9 && code !== 10 && code !== 13) continue;
    out += ch;
  }
  return out.trim().slice(0, maxLen);
}

/** Escape HTML so submitted text can't inject markup into the email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // Reject oversized payloads before buffering/parsing them (defense in depth;
  // the platform body limit is the ultimate backstop). 20KB comfortably covers
  // the max legitimate payload (5000-char message + name + email + overhead).
  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength && contentLength > 20_000) {
    return NextResponse.json({ error: "Payload too large." }, { status: 413 });
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept (so bots don't learn) but do nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a little while." },
      { status: 429 }
    );
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const consent = body.consent === true;

  // Server-side validation (never trust the client).
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: "Please add a little more detail." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Consent is required to process your message." },
      { status: 400 }
    );
  }

  // ── TODO(before launch): set these in .env.local and in Vercel ──────
  //   RESEND_API_KEY      — https://resend.com/api-keys
  //   CONTACT_EMAIL       — inbox that receives submissions
  //   CONTACT_FROM_EMAIL  — a verified sender on your Resend domain
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error("[contact] Missing RESEND_API_KEY or CONTACT_EMAIL env var.");
    return NextResponse.json(
      { error: "The contact form isn't fully configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `${siteConfig.legalName} Website <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #0b1120;">
          <h2 style="margin:0 0 12px;">New contact form message</h2>
          <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
