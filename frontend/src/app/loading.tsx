export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-12">
          {/* Header Skeleton */}
          <div className="text-center">
            <div className="h-12 w-64 bg-[#161616] rounded-lg mx-auto mb-8"></div>
            <div className="h-12 w-full max-w-2xl bg-[#161616] rounded-lg mx-auto"></div>
          </div>

          {/* Category Sections Skeleton */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-[#161616] rounded"></div>
                <div className="h-6 w-24 bg-[#161616] rounded"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="bg-[#161616] border border-[#212121] rounded-lg p-6 h-48"
                  >
                    <div className="h-6 w-3/4 bg-[#212121] rounded mb-4"></div>
                    <div className="h-4 w-full bg-[#212121] rounded mb-2"></div>
                    <div className="h-4 w-5/6 bg-[#212121] rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

