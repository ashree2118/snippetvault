import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Dashboard from '@/components/Dashboard';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const snippets = session
    ? await prisma.snippet.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
      })
    : [];

  return <Dashboard initialSnippets={snippets} />;
}