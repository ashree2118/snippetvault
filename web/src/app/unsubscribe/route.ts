import { prisma } from "@/lib/prisma";
import { verifyUnsubscribe } from "@/lib/email";

async function unsubscribe(req: Request): Promise<boolean> {
  const url = new URL(req.url);
  const userId = url.searchParams.get("u");
  const sig = url.searchParams.get("sig");
  if (!userId || !sig || !verifyUnsubscribe(userId, sig)) return false;

  const result = await prisma.user.updateMany({
    where: { id: userId },
    data: { emailOptOut: true },
  });
  return result.count > 0;
}

function page(title: string, text: string, status = 200) {
  return new Response(
    `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#000;color:#e0e0e0;font-family:-apple-system,system-ui,sans-serif">
<div style="text-align:center;padding:24px"><h1 style="font-size:20px;margin:0 0 8px">${title}</h1>
<p style="color:#888;margin:0">${text}</p></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

// Clicking the link in the email.
export async function GET(req: Request) {
  return (await unsubscribe(req))
    ? page("You're unsubscribed", "You won't receive update emails from Snippet anymore.")
    : page("Invalid link", "This unsubscribe link is invalid or has expired.", 400);
}

// One-click unsubscribe from the Gmail/Outlook button (RFC 8058).
export async function POST(req: Request) {
  return new Response(null, { status: (await unsubscribe(req)) ? 200 : 400 });
}
