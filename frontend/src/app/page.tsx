import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import CategoriesList from '@/components/CategoriesList';
import AdToast from '@/components/AdToast';
import { getCategoriesPaginated, getMcpServers } from '@/lib/api';

export default async function Home() {
  // Fetch initial page of categories server-side
  const categoriesResponse = await getCategoriesPaginated(1, 5);
  const initialCategories = categoriesResponse.data;
  const mcpServersResponse = await getMcpServers(1, 12);
  const mcpServers = mcpServersResponse.data;

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Rulify',
    description: 'Explore and discover Cursor rules organized by category',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
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
          {/* Logo Section */}
          <div className="text-center mb-12">
            <Logo />
            <p className="mt-4 text-[#C4C4C4] text-lg max-w-2xl mx-auto">
              Discover and explore a comprehensive collection of Cursor rules and MCP servers. 
              Browse organized categories, search for specific rules, and find the perfect development guidelines for your projects.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-16">
            <SearchBar />
          </div>

          {/* Categories and Rules with Infinite Scroll */}
          <CategoriesList
            initialCategories={initialCategories}
            initialPage={categoriesResponse.page}
            initialLimit={categoriesResponse.limit}
          />
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}
