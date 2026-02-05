import { prisma } from '@/lib/prisma'; // or '../lib/prisma'
import SnippetGrid from '@/components/SnippetGrid'; // Import the new component

export const dynamic = 'force-dynamic';

export default async function Home() {
  // 1. Fetch data on the Server
  const snippets = await prisma.snippet.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SnippetVault
            </h1>
            <p className="text-gray-400 mt-1">Your external brain for code.</p>
          </div>
        </header>

        {/* 2. Pass data to the Client Component */}
        <SnippetGrid initialData={snippets} />
        
      </div>
    </div>
  );
}