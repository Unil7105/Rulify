import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AdToast from '@/components/AdToast';
import RuleActions from '@/components/RuleActions';
import { getRuleBySlug, getMcpServers } from '@/lib/api';
import type { Rule } from '@/lib/api';

interface RuleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RuleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const rule = await getRuleBySlug(slug);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';
    const ruleUrl = `${siteUrl}/rules/${slug}`;

    return {
      title: `${rule.title} | Rule`,
      description: rule.contentPreview || rule.content.substring(0, 160),
      openGraph: {
        title: `${rule.title} | Rulify`,
        description: rule.contentPreview || rule.content.substring(0, 160),
        url: ruleUrl,
        siteName: 'Rulify',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: rule.title,
        description: rule.contentPreview || rule.content.substring(0, 160),
      },
      alternates: {
        canonical: ruleUrl,
      },
    };
  } catch {
    return {
      title: 'Rule Not Found',
    };
  }
}

export default async function RuleDetailPage({ params }: RuleDetailPageProps) {
  const { slug } = await params;
  
  let rule: Rule;
  try {
    rule = await getRuleBySlug(slug);
  } catch {
    notFound();
  }

  // Safeguard: If title is the same as content or too long, extract first line
  let displayTitle = rule.title;
  if (rule.title === rule.content || rule.title.length > 200) {
    // Extract first line or first 100 characters
    const firstLine = rule.content.split('\n')[0] || rule.content.substring(0, 100);
    displayTitle = firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
  }

  const mcpServersResponse = await getMcpServers(1, 12);
  const mcpServers = mcpServersResponse.data;

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
      ...(rule.category ? [{
        '@type': 'ListItem',
        position: 2,
        name: rule.category.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/category/${rule.category.slug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: rule.category ? 3 : 2,
        name: displayTitle,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/rules/${slug}`,
      },
    ],
  };

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayTitle,
    description: rule.contentPreview || rule.content.substring(0, 200),
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/rules/${slug}`,
    datePublished: rule.createdAt,
    dateModified: rule.updatedAt,
    ...(rule.category && {
      articleSection: rule.category.name,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
              {rule.category && (
                <>
                  <li>/</li>
                  <li>
                    <Link href={`/category/${rule.category.slug}`} className="hover:text-white transition-colors duration-200">
                      {rule.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li>/</li>
              <li className="text-white line-clamp-1">{displayTitle}</li>
            </ol>
          </nav>

          {/* Rule Header */}
          <header className="mb-8">
            <div className="mb-4">
              {/* <h1 className="text-4xl font-bold text-white break-words">
                {displayTitle}
              </h1> */}
            </div>

            {rule.category && (
              <div className="mb-4">
                <Link
                  href={`/category/${rule.category.slug}`}
                  className="inline-block px-4 py-2 bg-[#4DA3FF]/10 text-[#4DA3FF] text-sm rounded-full border border-[#4DA3FF]/20 hover:bg-[#4DA3FF]/20 transition-colors duration-200"
                >
                  {rule.category.name}
                </Link>
              </div>
            )}
          </header>

          {/* Action Buttons */}
          <RuleActions title={displayTitle} content={rule.content} slug={rule.slug} />

          {/* Rule Content Container */}
          <div className="bg-[#161616] border border-[#212121] rounded-lg p-8 shadow-lg shadow-black/20">
            <article className="max-w-none">
              <div className="text-[#C4C4C4] text-base leading-relaxed whitespace-pre-wrap break-words">
                {rule.content}
              </div>
            </article>
          </div>

          {/* Metadata Footer */}
          <div className="mt-6 pt-6 border-t border-[#212121] flex flex-wrap items-center gap-6 text-sm text-[#868686]">
            {rule.createdAt && (
              <div>
                <span className="mr-2">Created:</span>
                <span className="text-[#C4C4C4]">
                  {new Date(rule.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
            {rule.updatedAt && rule.updatedAt !== rule.createdAt && (
              <div>
                <span className="mr-2">Updated:</span>
                <span className="text-[#C4C4C4]">
                  {new Date(rule.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Ad Toast */}
      <AdToast mcpServers={mcpServers} />
    </>
  );
}

