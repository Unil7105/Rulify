import Link from 'next/link';
import type { Rule } from '@/lib/api';

interface RuleCardProps {
  rule: Rule;
}

export default function RuleCard({ rule }: RuleCardProps) {
  return (
    <Link href={`/rules/${rule.slug}`}>
      <div className="bg-[#161616] border border-[#444444] rounded-sm p-4 px-4 hover:bg-[#1B1B1B] transition-colors duration-200 h-full  flex flex-col shadow-lg shadow-black/20">
        {rule.contentPreview && (
          <p className="text-[#C4C4C4] text-sm mb-4 line-clamp-4" style={{ fontFamily: 'var(--font-geist-mono)' }}>
            {rule.contentPreview}
          </p>
        )}
        {/* {rule.category && (
          <span className="inline-block px-3 py-1 bg-[#4DA3FF]/10 text-[#4DA3FF] text-xs rounded-full border border-[#4DA3FF]/20">
            {rule.category.name}
          </span>
        )} */}
      </div>
    </Link>
  );
}