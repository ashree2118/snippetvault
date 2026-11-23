import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import AdminEmailForm from "@/components/AdminEmailForm";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  // Pretend the page doesn't exist for anyone who isn't an admin.
  if (!session || !isAdmin(session.user.email)) notFound();

  const [subscribed, total] = await Promise.all([
    prisma.user.count({ where: { emailOptOut: false } }),
    prisma.user.count(),
  ]);

  return (
    <div className="min-h-screen bg-black text-[#e0e0e0] flex justify-center">
      <div className="max-w-[680px] w-full px-5 py-8">
        <h1 className="text-[22px] font-bold text-[#F1F1F1] tracking-[-0.02em] mb-1">Email users</h1>
        <p className="text-sm text-[#888] mb-7">
          {subscribed} of {total} users will receive this ({total - subscribed} unsubscribed).
        </p>
        <AdminEmailForm adminEmail={session.user.email} />
      </div>
    </div>
  );
}
