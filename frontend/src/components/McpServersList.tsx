'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import McpServerCard from './McpServerCard';
import type { McpServer, PaginatedResponse } from '@/lib/api';

interface McpServersListProps {
  initialServers: McpServer[];
  initialTotal: number;
  initialPage: number;
  initialLimit: number;
  initialTotalPages: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function McpServersList({
  initialServers,
  initialTotal,
  initialPage,
  initialLimit,
  initialTotalPages,
}: McpServersListProps) {
  const [servers, setServers] = useState<McpServer[]>(initialServers);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPage < initialTotalPages);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchMoreServers = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_BASE_URL}/mcp-servers?page=${nextPage}&limit=${initialLimit}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch more servers');
      }

      const data: PaginatedResponse<McpServer> = await res.json();
      
      setServers((prev) => [...prev, ...data.data]);
      setPage(nextPage);
      setHasMore(nextPage < data.totalPages);
    } catch (error) {
      console.error('Error fetching more servers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, initialLimit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchMoreServers();
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
  }, [fetchMoreServers, hasMore, isLoading]);

  return (
    <>
      <div className="mb-6">
        <p className="text-[#868686] text-sm">
          {servers.length} of {initialTotal} {initialTotal === 1 ? 'server' : 'servers'} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <McpServerCard key={server.id} mcpServer={server} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={observerTarget} className="h-20 flex items-center justify-center">
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
            <span className="text-sm">Loading more servers...</span>
          </div>
        )}
        {!hasMore && servers.length > 0 && (
          <p className="text-[#868686] text-sm">No more servers to load</p>
        )}
      </div>
    </>
  );
}

