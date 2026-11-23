import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { sendToRecipients } from "@/lib/email";

// Sending to a large list takes a while (100 emails per request, ~2 requests/sec).
export const maxDuration = 60;

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { subject, message, testOnly } = await req.json();
  if (typeof subject !== "string" || !subject.trim() || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
  }

  // "Send test" goes only to the admin who is signed in.
  const recipients = testOnly
    ? [{ id: session.user.id, email: session.user.email, name: session.user.name }]
    : await prisma.user.findMany({
        where: { emailOptOut: false },
        select: { id: true, email: true, name: true },
      });

  try {
    const result = await sendToRecipients(recipients, subject.trim(), message.trim());
    return NextResponse.json({ ...result, total: recipients.length });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send" },
      { status: 500 }
    );
  }
}
