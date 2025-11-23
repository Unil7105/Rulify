'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { McpServer } from '@/lib/api';

interface AdToastProps {
  mcpServers: McpServer[];
}

export default function AdToast({ mcpServers }: AdToastProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (mcpServers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mcpServers.length);
    }, 5000); // Change ad every 5 seconds

    return () => clearInterval(interval);
  }, [mcpServers.length]);

  if (mcpServers.length === 0 || !isVisible) return null;

  const currentAd = mcpServers[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-[#161616] border border-[#212121] rounded-lg p-4 shadow-lg shadow-black/20">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-[#868686] uppercase">Sponsored</span>
          <button
            onClick={() => setIsVisible(false)}
            className="text-[#868686] hover:text-white transition-colors duration-200"
            aria-label="Close ad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Link
          href={currentAd.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <h4 className="text-white font-semibold mb-1 hover:text-[#4DA3FF] transition-colors duration-200">
            {currentAd.name}
          </h4>
          {currentAd.description && (
            <p className="text-[#C4C4C4] text-sm line-clamp-2">
              {currentAd.description}
            </p>
          )}
          {currentAd.provider && (
            <p className="text-[#868686] text-xs mt-2">
              by {currentAd.provider}
            </p>
          )}
        </Link>
        {mcpServers.length > 1 && (
          <div className="flex gap-1 mt-3 justify-center">
            {mcpServers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-[#4DA3FF]' : 'bg-[#444444]'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

