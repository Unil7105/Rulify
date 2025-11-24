import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import RuleCard from '@/components/RuleCard';
import AdToast from '@/components/AdToast';
import { searchRules, getMcpServers } from '@/lib/api';
import type { Rule } from '@/lib/api';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q || '';

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const searchUrl = query ? `${siteUrl}/search?q=${encodeURIComponent(query)}` : `${siteUrl}/search`;

  return {
    title: query ? `Search Results for "${query}"` : 'Search Rules',
    description: query
      ? `Search results for "${query}" in Rulify`
      : 'Search for rules and guidelines in Rulify',
    openGraph: {
      title: query ? `Search: ${query} | Rulify` : 'Search Rules | Rulify',
      description: query
        ? `Search results for "${query}" in Rulify`
        : 'Search for rules and guidelines',
      url: searchUrl,
      siteName: 'Rulify',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: query ? `Search: ${query}` : 'Search Rules',
      description: query ? `Search results for "${query}"` : 'Search for rules and guidelines',
    },
    robots: {
      index: false, // Don't index search pages
      follow: true,
    },
    alternates: {
      canonical: searchUrl,
    },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const mcpServersResponse = await getMcpServers(1, 12);
  const mcpServers = mcpServersResponse.data;

  let rules: Rule[] = [];
  let hasSearched = false;

  if (query) {
    hasSearched = true;
    try {
      rules = await searchRules(query);
    } catch (error) {
      console.error('Search error:', error);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar />
          </div>

          {/* Search Results */}
          {hasSearched && (
            <>
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  {query ? `Search Results for "${query}"` : 'Search Rules'}
                </h1>
                <p className="text-[#C4C4C4] text-lg">
                  {rules.length} {rules.length === 1 ? 'result' : 'results'} found
                </p>
              </header>

              {rules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rules.map((rule) => (
                    <RuleCard key={rule.id} rule={rule} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-[#C4C4C4] text-lg mb-2">No results found for &quot;{query}&quot;</p>
                  <p className="text-[#868686] text-sm">Try a different search term</p>
                </div>
              )}
            </>
          )}

          {/* Initial State */}
          {!hasSearched && (
            <div className="text-center py-20">
              <p className="text-[#C4C4C4] text-lg">Enter a search term above to find rules</p>
            </div>
          )}
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}

