import Link from 'next/link';
import type { Rule } from '@/lib/api';

interface RuleCardProps {
  rule: Rule;
}

export default function RuleCard({ rule }: RuleCardProps) {
  return (
    <Link href={`/rules/${rule.slug}`}>
      <div className="bg-[#161616] border border-[#212121] rounded-lg p-6 hover:bg-[#1B1B1B] transition-colors duration-200 h-full shadow-lg shadow-black/20">
        {rule.contentPreview && (
          <p className="text-[#C4C4C4] text-sm mb-4 line-clamp-3">
            {rule.contentPreview}
          </p>
        )}
        {rule.category && (
          <span className="inline-block px-3 py-1 bg-[#4DA3FF]/10 text-[#4DA3FF] text-xs rounded-full border border-[#4DA3FF]/20">
            {rule.category.name}
          </span>
        )}
      </div>
    </Link>
  );
}

