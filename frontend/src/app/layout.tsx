import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  title: {
    default: 'Rulify',
    template: '%s | Rulify'
  },
  description: 'Explore and discover Cursor rules organized by category. Find the best development rules for your projects.',
  keywords: ['cursor', 'rules', 'development', 'coding', 'best practices', 'cursor rules', 'development guidelines'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Rulify',
    title: 'Rulify',
    description: 'Explore and discover Cursor rules organized by category. Find the best development rules for your projects.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Rulify',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rulify',
    description: 'Explore and discover Cursor rules organized by category',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} font-sans antialiased bg-[#0D0D0D] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
