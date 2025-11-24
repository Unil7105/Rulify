import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import RuleCard from '@/components/RuleCard';
import AdToast from '@/components/AdToast';
import { getCategoryBySlug, getRulesByCategory, getMcpServers } from '@/lib/api';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
  const categoryUrl = `${siteUrl}/category/${slug}`;

  return {
    title: `${category.name} Rules`,
    description: `Explore all ${category.name} rules and guidelines. Find the best development practices for ${category.name}.`,
    openGraph: {
      title: `${category.name} Rules | Rulify`,
      description: `Explore all ${category.name} rules and guidelines`,
      url: categoryUrl,
      siteName: 'Rulify',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} Rules`,
      description: `Explore all ${category.name} rules and guidelines`,
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const mcpServersResponse = await getMcpServers(1, 12);
  const mcpServers = mcpServersResponse.data;

  if (!category) {
    notFound();
  }

  const rules = await getRulesByCategory(category.id);

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
        name: category.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/category/${slug}`,
      },
    ],
  };

  // CollectionPage structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} Rules`,
    description: `A collection of ${category.name} rules and guidelines`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/category/${slug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: rules.length,
      itemListElement: rules.map((rule, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: rule.title,
          url: rule.url,
          description: rule.contentPreview || rule.content.substring(0, 160),
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
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
              <li className="text-white">{category.name}</li>
            </ol>
          </nav>

          {/* Category Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">{category.name}</h1>
            <p className="text-[#C4C4C4] text-lg">
              {rules.length} {rules.length === 1 ? 'rule' : 'rules'} found
            </p>
          </header>

          {/* Rules Grid */}
          {rules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rules.map((rule) => (
                <RuleCard key={rule.id} rule={rule} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#C4C4C4] text-lg">No rules found in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}

