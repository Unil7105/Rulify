'use client';

import Link from 'next/link';
import type { McpServer } from '@/lib/api';

interface McpServerCardProps {
  mcpServer: McpServer;
  showPreview?: boolean;
}

export default function McpServerCard({ mcpServer, showPreview = true }: McpServerCardProps) {
  const handleExternalClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <Link href={`/mcps/${mcpServer.slug}`}>
      <div className="bg-[#161616] border border-[#212121] rounded-lg p-6 hover:bg-[#1B1B1B] transition-colors duration-200 h-full shadow-lg shadow-black/20 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-white line-clamp-2 flex-1 pr-2">
            {mcpServer.name}
          </h3>
          {mcpServer.provider && (
            <span className="px-3 py-1 bg-[#4DA3FF]/10 text-[#4DA3FF] text-xs rounded-full border border-[#4DA3FF]/20 whitespace-nowrap flex-shrink-0">
              {mcpServer.provider}
            </span>
          )}
        </div>
        
        {/* Description */}
        {showPreview && mcpServer.description && (
          <p className="text-[#C4C4C4] text-sm mb-4 line-clamp-3 flex-grow">
            {mcpServer.description}
          </p>
        )}

        {/* Metadata Section */}
        <div className="space-y-3 mt-auto">
          {/* Classification and Release Date */}
          <div className="flex flex-wrap gap-2">
            {mcpServer.classification && (
              <span className="px-3 py-1 bg-[#212121] text-[#868686] text-xs rounded-full border border-[#212121]">
                {mcpServer.classification}
              </span>
            )}
            {mcpServer.releaseDate && (
              <span className="px-3 py-1 bg-[#212121] text-[#868686] text-xs rounded-full border border-[#212121]">
                {formatDate(mcpServer.releaseDate) || mcpServer.releaseDate}
              </span>
            )}
          </div>

          {/* Links Section */}
          <div className="pt-3 border-t border-[#212121] space-y-2">
            {mcpServer.url && (
              <a
                href={mcpServer.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="text-[#4DA3FF] hover:text-[#3D8FE6] text-sm transition-colors duration-200 flex items-center gap-2 group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="truncate flex-1">Visit Server</span>
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
            {mcpServer.githubRepo && (
              <a
                href={mcpServer.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="text-[#4DA3FF] hover:text-[#3D8FE6] text-sm transition-colors duration-200 flex items-center gap-2 group"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="truncate flex-1">GitHub Repository</span>
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

