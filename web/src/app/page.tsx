import { prisma } from '@/lib/prisma';
import Dashboard from '@/components/Dashboard'; // Import your new Client Component

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Run Server-Side Logic (Database)
  const snippets = await prisma.snippet.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // 2. Pass data to Client Component
  return <Dashboard initialSnippets={snippets} />;
}