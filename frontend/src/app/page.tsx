import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';
import AdToast from '@/components/AdToast';
import { getCategories, getRulesByCategory, getMcpServers } from '@/lib/api';
import type { Category } from '@/lib/api';

export default async function Home() {
  // Fetch all data server-side
  const categories = await getCategories();
  const mcpServers = await getMcpServers();
  
  // Fetch rules for each category
  const categoriesWithRules = await Promise.all(
    categories.map(async (category: Category) => {
      const rules = await getRulesByCategory(category.id);
      return { category, rules };
    })
  );

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
          </div>

          {/* Search Bar */}
          <div className="mb-16">
            <SearchBar />
          </div>

          {/* Categories and Rules */}
          <div className="space-y-16">
            {categoriesWithRules.map(({ category, rules }) => (
              <CategorySection
                key={category.id}
                category={category}
                rules={rules}
              />
            ))}
          </div>

          {/* Empty State */}
          {categoriesWithRules.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[#C4C4C4] text-lg">No categories found. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}
