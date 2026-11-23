"use client";

import { useState } from "react";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text?: string };

export default function AdminEmailForm({ adminEmail }: { adminEmail: string }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function send(testOnly: boolean) {
    if (!testOnly && !confirm("Send this email to ALL subscribed users? This can't be undone.")) return;

    setStatus({ kind: "sending", text: testOnly ? "Sending test…" : "Sending to all users…" });
    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message, testOnly }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      const summary = testOnly
        ? `Test sent to ${adminEmail}.`
        : `Sent ${data.sent} of ${data.total}.`;
      setStatus(
        data.failed > 0
          ? { kind: "error", text: `${summary} ${data.failed} failed: ${data.errors.join("; ")}` }
          : { kind: "ok", text: summary }
      );
    } catch (err) {
      setStatus({ kind: "error", text: err instanceof Error ? err.message : "Failed to send" });
    }
  }

  const sending = status.kind === "sending";
  const disabled = sending || !subject.trim() || !message.trim();
  const input =
    "w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-sm text-[#e0e0e0] placeholder:text-[#555] focus:outline-none focus:border-[#444]";
  const button =
    "text-sm border px-4 py-2 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="flex flex-col gap-4">
      <input
        className={input}
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className={`${input} min-h-[260px] leading-relaxed`}
        placeholder={"Hi {{name}},\n\nWe just shipped…\n\nLeave a blank line between paragraphs. Replies go to your reply-to address, so you can ask for feedback."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <p className="text-xs text-[#666]">
        Plain text. <code className="text-[#999]">{"{{name}}"}</code> becomes the user&apos;s first name. An unsubscribe link is added automatically.
      </p>

      <div className="flex gap-3">
        <button
          className={`${button} border-[#333] text-[#ccc] hover:border-[#555] hover:text-white`}
          disabled={disabled}
          onClick={() => send(true)}
        >
          Send test to me
        </button>
        <button
          className={`${button} border-[#15B19A] text-[#15B19A] hover:bg-[#15B19A] hover:text-black`}
          disabled={disabled}
          onClick={() => send(false)}
        >
          Send to all users
        </button>
      </div>

      {status.text && (
        <p
          className={`text-sm ${
            status.kind === "error" ? "text-[#ef4444]" : status.kind === "ok" ? "text-[#22c55e]" : "text-[#888]"
          }`}
        >
          {status.text}
        </p>
      )}
    </div>
  );
}
