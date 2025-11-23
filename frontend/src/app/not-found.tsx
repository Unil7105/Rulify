import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-white mb-4">404</h1>
            <div className="w-24 h-1 bg-[#4DA3FF] mx-auto"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Page Not Found
            </h2>
            <p className="text-[#C4C4C4] text-lg mb-2">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <p className="text-[#868686] text-sm">
              Check the URL or return to the homepage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="bg-[#4DA3FF] text-white px-8 py-3 rounded-lg hover:bg-[#3D8FE6] transition-colors duration-200 font-medium active:scale-[0.98]"
            >
              Go to Homepage
            </Link>
            <Link
              href="/rules"
              className="bg-[#161616] text-white border border-[#212121] px-8 py-3 rounded-lg hover:bg-[#1B1B1B] transition-colors duration-200 font-medium active:scale-[0.98]"
            >
              Browse Rules
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-[#212121]">
            <p className="text-[#868686] text-sm mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mcps"
                className="text-[#4DA3FF] hover:text-[#3D8FE6] transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                MCP Servers
              </Link>
              <Link
                href="/search"
                className="text-[#4DA3FF] hover:text-[#3D8FE6] transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                Search
              </Link>
              <Link
                href="/category"
                className="text-[#4DA3FF] hover:text-[#3D8FE6] transition-colors duration-200 text-sm underline-offset-4 hover:underline"
              >
                Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

