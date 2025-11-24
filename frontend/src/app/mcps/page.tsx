import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import McpServersList from '@/components/McpServersList';
import AdToast from '@/components/AdToast';
import { getMcpServers } from '@/lib/api';

export const metadata: Metadata = {
  title: 'MCP Servers',
  description: 'Explore and discover MCP (Model Context Protocol) servers. Find the best MCP servers for your development needs.',
  openGraph: {
    title: 'MCP Servers | Rulify',
    description: 'Explore and discover MCP (Model Context Protocol) servers',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/mcps`,
    siteName: 'Rulify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MCP Servers',
    description: 'Explore and discover MCP (Model Context Protocol) servers',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/mcps`,
  },
};

export default async function McpServersPage() {
  const mcpServersResponse = await getMcpServers(1, 12);
  const mcpServers = mcpServersResponse.data;

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MCP Servers',
    description: 'A collection of MCP (Model Context Protocol) servers',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/mcps`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: mcpServersResponse.total,
      itemListElement: mcpServers.map((server, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: server.name,
          url: server.url,
          description: server.description || '',
          applicationCategory: server.classification || 'DeveloperApplication',
          provider: server.provider ? {
            '@type': 'Organization',
            name: server.provider,
          } : undefined,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">MCP Servers</h1>
            <p className="text-[#C4C4C4] text-lg max-w-2xl mx-auto">
              Explore and discover MCP (Model Context Protocol) servers. Find the best tools and integrations for your development workflow.
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* MCP Servers Grid */}
          {mcpServers.length > 0 ? (
            <McpServersList
              initialServers={mcpServers}
              initialTotal={mcpServersResponse.total}
              initialPage={mcpServersResponse.page}
              initialLimit={mcpServersResponse.limit}
              initialTotalPages={mcpServersResponse.totalPages}
            />
          ) : (
            <div className="text-center py-20">
              <p className="text-[#C4C4C4] text-lg">No MCP servers found. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}

