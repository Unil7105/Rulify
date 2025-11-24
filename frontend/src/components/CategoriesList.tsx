'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import CategorySection from './CategorySection';
import type { Category, Rule, PaginatedResponse } from '@/lib/api';

interface CategoryWithRules {
  category: Category;
  rules: Rule[];
}

interface CategoriesListProps {
  initialCategories: Category[];
  initialPage: number;
  initialLimit: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function CategoriesList({
  initialCategories,
  initialPage,
  initialLimit,
}: CategoriesListProps) {
  const [categoriesWithRules, setCategoriesWithRules] = useState<CategoryWithRules[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch rules for categories
  const fetchRulesForCategories = useCallback(async (categories: Category[]): Promise<CategoryWithRules[]> => {
    const categoriesWithRulesPromises = categories.map(async (category) => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories/${category.id}/rules`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          return { category, rules: [] };
        }
        const rules: Rule[] = await res.json();
        return { category, rules };
      } catch (error) {
        console.error(`Failed to fetch rules for category ${category.id}:`, error);
        return { category, rules: [] };
      }
    });

    return Promise.all(categoriesWithRulesPromises);
  }, []);

  // Initialize with initial categories
  useEffect(() => {
    fetchRulesForCategories(initialCategories).then((data) => {
      setCategoriesWithRules(data);
    });
  }, [initialCategories, fetchRulesForCategories]);

  const fetchMoreCategories = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_BASE_URL}/categories?page=${nextPage}&limit=${initialLimit}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch more categories');
      }

      const data: PaginatedResponse<Category> = await res.json();
      
      // Fetch rules for the new categories
      const newCategoriesWithRules = await fetchRulesForCategories(data.data);
      
      setCategoriesWithRules((prev) => [...prev, ...newCategoriesWithRules]);
      setPage(nextPage);
      setHasMore(nextPage < data.totalPages);
    } catch (error) {
      console.error('Error fetching more categories:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, initialLimit, fetchRulesForCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMoreCategories();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchMoreCategories, hasMore, isLoading]);

  return (
    <>
      <div className="space-y-16">
        {categoriesWithRules.map(({ category, rules }) => (
          <CategorySection
            key={category.id}
            category={category}
            rules={rules}
          />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center mt-16">
        {isLoading && (
          <div className="flex items-center gap-2 text-[#868686]">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">Loading more categories...</span>
          </div>
        )}
        {!hasMore && categoriesWithRules.length > 0 && (
          <p className="text-[#868686] text-sm">No more categories to load</p>
        )}
      </div>

      {/* Empty State */}
      {categoriesWithRules.length === 0 && !isLoading && (
        <div className="text-center py-20">
          <p className="text-[#C4C4C4] text-lg">No categories found. Check back soon!</p>
        </div>
      )}
    </>
  );
}

