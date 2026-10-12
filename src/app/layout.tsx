import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import NavBar from "./ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta');
  const locale = await getLocale();
  const isEnglish = locale === 'en';

  return {
  metadataBase: new URL('https://bytecraft-technologies.com'),
  title: {
    default: t('title'),
    template: "%s | BYTECRAFT TECHNOLOGIES",
  },
  description: t('description'),
  keywords: t.raw('keywords') as string[],
  authors: [{ name: "ByteCraft Technologies" }],
  creator: "ByteCraft Technologies",
  publisher: "ByteCraft Technologies",
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
  openGraph: {
    type: 'website',
    locale: isEnglish ? 'en_US' : 'fr_FR',
    alternateLocale: isEnglish ? 'fr_FR' : 'en_US',
    url: 'https://bytecraft-technologies.com',
    siteName: 'ByteCraft Technologies',
    title: t('title'),
    description: t('ogDescription'),
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: t('ogAlt'),
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: t('title'),
    description: t('twitterDescription'),
    images: ['/og-image.svg'],
    creator: '@bytecraft_tech',
  },
  verification: {
    google: 'votre-code-google-search-console',
  },
  category: 'technology',
  };
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ByteCraft Technologies',
  url: 'https://bytecraft-technologies.com',
  logo: 'https://bytecraft-technologies.com/icon.svg',
  description: 'Agence de développement web et mobile au Bénin',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Porto-Novo',
    addressCountry: 'BJ',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@bytecrafttechnologie.com',
    contactType: 'customer service',
    availableLanguage: ['French', 'English'],
  },
  sameAs: [
    'https://github.com/Byte-Craft-Technologies',
  ],
  founder: {
    '@type': 'Person',
    name: 'ByteCraft Team',
  },
  foundingDate: '2023',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 6.4969,
      longitude: 2.6289,
    },
    geoRadius: '5000',
  },
  serviceType: [
    'Web Development',
    'Mobile App Development',
    'API Development',
    'AI Solutions',
    'IT Consulting',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations('meta');
  const localizedJsonLd = {
    ...jsonLd,
    description: t('ogDescription'),
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NavBar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
