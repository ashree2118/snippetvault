// Admins are configured with a comma-separated list of emails, e.g.
// ADMIN_EMAILS="you@example.com,cofounder@example.com"
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return admins.includes(email.toLowerCase());
}
