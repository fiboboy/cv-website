import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mikhail.vercel.app'),
  title: 'Mikhail Dziubenko - Portfolio',
  description: 'Portfolio of Mikhail Dziubenko: aviation operations, AI data review, QA, transcription, translation, packaging design, and UX/UI prototype work.',
  keywords: ['Air Traffic Control', 'Aviation Operations', 'QA', 'Transcription', 'Translation', 'Packaging Design', 'UX/UI', 'Portfolio'],
  authors: [{ name: 'Mikhail Dziubenko', url: 'https://mikhail.vercel.app' }],
  creator: 'Mikhail Dziubenko',
  publisher: 'Mikhail Dziubenko',
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
  verification: {
    google: 'fDRuWOfSIaXgTiN2YyEUJssXtgx_QUj3jnH5AJYkK6s',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Mikhail Dziubenko - Portfolio',
    description: 'Aviation operations, AI data review, QA, translation, packaging design, and UX/UI prototype work.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Mikhail Dziubenko Portfolio',
  },
  alternates: {
    canonical: 'https://mikhail.vercel.app',
  },
  other: {
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
    'baidu-site-verification': 'your-baidu-verification-code'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://mikhail.vercel.app/"
              },
              "mainEntity": {
                "@type": "Person",
                "name": "Mikhail Dziubenko",
                "description": "Operations, QA, and design-oriented specialist with aviation, transcription, review, translation, packaging, and UX/UI prototype experience",
                "jobTitle": "Operations and QA Specialist",
                "url": "https://mikhail.vercel.app/"
              }
            }
          `}
        </script>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
