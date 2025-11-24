import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="inline-block">
      <h1 className="text-4xl font-medium text-white hover:text-[#4DA3FF] transition-colors duration-200">
        Rulify
      </h1>
    </Link>
  );
}

