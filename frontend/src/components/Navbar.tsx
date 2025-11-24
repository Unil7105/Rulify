import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#111111] border-b border-[#212121] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-semibold text-white hover:text-[#4DA3FF] transition-colors duration-200">
              Rulify
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/rules" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
                Rules
              </Link>
              {/* <Link href="/trending" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
                Trending
              </Link> */}
              {/* <Link href="/jobs" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
                Jobs
              </Link> */}
              <Link href="/mcps" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
                MCPs
              </Link>
              {/* <Link href="/generate" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
                Generate
              </Link> */}
            </div>
          </div>
          {/* <div className="flex items-center gap-4">
            <Link href="/members" className="text-[#C4C4C4] hover:text-white transition-colors duration-200">
              Members
            </Link>
            <button className="bg-[#4DA3FF] text-white px-4 py-2 rounded-lg hover:bg-[#3D8FE6] transition-colors duration-200 active:scale-[0.98]">
              Submit +
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

