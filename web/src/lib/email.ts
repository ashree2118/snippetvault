import { createHmac, timingSafeEqual } from "crypto";
import { Resend } from "resend";

const APP_URL = process.env.BETTER_AUTH_URL || "https://snippet.anushreesh.com";
const BATCH_SIZE = 100; // Resend batch API limit

export type Recipient = { id: string; email: string; name: string | null };

// ---------- Unsubscribe links ----------
// Each email gets a per-user link signed with the auth secret, so nobody can
// unsubscribe someone else by guessing user IDs.

function sign(userId: string): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) throw new Error("BETTER_AUTH_SECRET is not set");
  return createHmac("sha256", secret).update(`unsubscribe:${userId}`).digest("base64url");
}

export function verifyUnsubscribe(userId: string, sig: string): boolean {
  const expected = Buffer.from(sign(userId));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

export function unsubscribeUrl(userId: string): string {
  return `${APP_URL}/unsubscribe?u=${encodeURIComponent(userId)}&sig=${sign(userId)}`;
}

// ---------- Rendering ----------

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Message is written as plain text; blank lines separate paragraphs,
// and {{name}} is replaced with the user's first name.
function personalize(text: string, r: Recipient): string {
  const first = r.name?.split(" ")[0] || "there";
  return text.replace(/\{\{\s*name\s*\}\}/g, first);
}

function renderHtml(body: string, unsubUrl: string): string {
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f6f6">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;padding:28px;font-family:-apple-system,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#222">
${paragraphs}
<hr style="border:none;border-top:1px solid #eee;margin:24px 0 12px">
<p style="margin:0;font-size:12px;color:#999">You're receiving this because you use Snippet.
<a href="${unsubUrl}" style="color:#999">Unsubscribe</a></p>
</div></body></html>`;
}

// ---------- Sending ----------

export async function sendToRecipients(
  recipients: Recipient[],
  subject: string,
  message: string
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) throw new Error("RESEND_API_KEY and EMAIL_FROM must be set");

  const resend = new Resend(apiKey);
  const replyTo = process.env.EMAIL_REPLY_TO || undefined;
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const chunk = recipients.slice(i, i + BATCH_SIZE);
    const emails = chunk.map((r) => {
      const unsub = unsubscribeUrl(r.id);
      const body = personalize(message, r);
      return {
        from,
        to: r.email,
        replyTo,
        subject: personalize(subject, r),
        html: renderHtml(body, unsub),
        text: `${body}\n\n---\nUnsubscribe: ${unsub}`,
        headers: {
          // Lets Gmail/Outlook show their built-in "Unsubscribe" button.
          "List-Unsubscribe": `<${unsub}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    });

    const { error } = await resend.batch.send(emails);
    if (error) {
      failed += chunk.length;
      errors.push(error.message);
    } else {
      sent += chunk.length;
    }

    // Stay under Resend's default rate limit (2 requests/second).
    if (i + BATCH_SIZE < recipients.length) {
      await new Promise((res) => setTimeout(res, 600));
    }
  }

  return { sent, failed, errors };
}
