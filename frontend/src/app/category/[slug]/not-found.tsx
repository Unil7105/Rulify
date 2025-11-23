import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">Category Not Found</h1>
        <p className="text-[#C4C4C4] mb-8">
          The category you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-[#4DA3FF] text-white px-6 py-3 rounded-lg hover:bg-[#3D8FE6] transition-colors duration-200"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

