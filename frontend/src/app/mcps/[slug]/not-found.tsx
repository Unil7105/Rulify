import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">MCP Server Not Found</h1>
        <p className="text-[#C4C4C4] mb-8">
          The MCP server you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/mcps"
            className="bg-[#4DA3FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D8FE6] transition-colors duration-200"
          >
            Browse MCP Servers
          </Link>
          <Link
            href="/"
            className="bg-[#161616] text-white border border-[#212121] px-6 py-3 rounded-lg hover:bg-[#1B1B1B] transition-colors duration-200"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

