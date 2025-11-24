import Link from 'next/link';
import RuleCard from './RuleCard';
import type { Category, Rule } from '@/lib/api';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  rules: Rule[];
}

export default function CategorySection({ category, rules }: CategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-medium text-whiteb capitalize">{category.name}</h2>
        <div>

        </div>
        <Link
          href={`/category/${category.slug}`}
          className="text-[#4DA3FF] flex items-center gap-1 hover:text-[#3D8FE6] transition-colors duration-200 underline-offset-4 hover:underline"
        >
          View all 
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </section>
  );
}

