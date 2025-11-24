import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import McpServerCard from '@/components/McpServerCard';
import AdToast from '@/components/AdToast';
import McpUsageGuide from '@/components/McpUsageGuide';
import { getMcpServerBySlug, getMcpServers } from '@/lib/api';
import type { McpServer } from '@/lib/api';

interface McpServerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: McpServerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const mcpServer = await getMcpServerBySlug(slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const serverUrl = `${siteUrl}/mcps/${slug}`;

    return {
      title: `${mcpServer.name} | MCP Server`,
      description: mcpServer.description || `Learn more about ${mcpServer.name} MCP server`,
      openGraph: {
        title: `${mcpServer.name} | MCP Server`,
        description: mcpServer.description || `Learn more about ${mcpServer.name} MCP server`,
        url: serverUrl,
        siteName: 'Rulify',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${mcpServer.name} | MCP Server`,
        description: mcpServer.description || `Learn more about ${mcpServer.name} MCP server`,
      },
      alternates: {
        canonical: serverUrl,
      },
    };
  } catch {
    return {
      title: 'MCP Server Not Found',
    };
  }
}

export default async function McpServerDetailPage({ params }: McpServerDetailPageProps) {
  const { slug } = await params;
  
  let mcpServer: McpServer;
  try {
    mcpServer = await getMcpServerBySlug(slug);
  } catch {
    notFound();
  }

  // Fetch a larger set of servers to find related ones
  let allMcpServers: McpServer[] = [];
  try {
    const allMcpServersResponse = await getMcpServers(1, 100);
    allMcpServers = allMcpServersResponse?.data || [];
  } catch (error) {
    console.error('Failed to fetch MCP servers for related section:', error);
    allMcpServers = [];
  }
  
  // Get related servers (same classification or provider, excluding current)
  const relatedServers = allMcpServers
    .filter(
      (server) =>
        server?.id !== mcpServer.id &&
        (server?.classification === mcpServer.classification ||
          server?.provider === mcpServer.provider)
    )
    .slice(0, 6);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: mcpServer.name,
    description: mcpServer.description || '',
    url: mcpServer.url || '',
    applicationCategory: mcpServer.classification || 'DeveloperApplication',
    provider: mcpServer.provider
      ? {
          '@type': 'Organization',
          name: mcpServer.provider,
        }
      : undefined,
    datePublished: mcpServer.releaseDate || undefined,
    codeRepository: mcpServer.githubRepo || undefined,
  };

  // Breadcrumb structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'MCP Servers',
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/mcps`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: mcpServer.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/mcps/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-[#868686]">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/mcps" className="hover:text-white transition-colors duration-200">
                  MCP Servers
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{mcpServer.name}</li>
            </ol>
          </nav>

          {/* Header Section */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">{mcpServer.name}</h1>
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              {mcpServer.provider && (
                <div>
                  <span className="text-[#868686] text-sm mr-2">Provider:</span>
                  <span className="text-[#C4C4C4]">{mcpServer.provider}</span>
                </div>
              )}
              {mcpServer.classification && (
                <div>
                  <span className="text-[#868686] text-sm mr-2">Classification:</span>
                  <span className="px-3 py-1 bg-[#212121] text-[#C4C4C4] text-sm rounded-full">
                    {mcpServer.classification}
                  </span>
                </div>
              )}
              {mcpServer.releaseDate && (
                <div>
                  <span className="text-[#868686] text-sm mr-2">Released On:</span>
                  <span className="text-[#C4C4C4]">{mcpServer.releaseDate}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {mcpServer.description && (
              <p className="text-[#C4C4C4] text-lg leading-relaxed max-w-3xl">
                {mcpServer.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {mcpServer.url && (
                <a
                  href={mcpServer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4DA3FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D8FE6] transition-colors duration-200 inline-flex items-center gap-2"
                >
                  Visit Server
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {mcpServer.githubRepo && (
                <a
                  href={mcpServer.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#161616] text-white border border-[#212121] px-6 py-3 rounded-lg hover:bg-[#1B1B1B] transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub Repo
                </a>
              )}
            </div>
          </header>

          {/* MCP Usage Guide */}
          <section className="mt-12">
            <McpUsageGuide />
          </section>

          {/* Related Servers Section */}
          {relatedServers.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-semibold text-white mb-6">Related Servers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServers.map((server) => (
                  <McpServerCard key={server.id} mcpServer={server} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={allMcpServers} />
    </>
  );
}

