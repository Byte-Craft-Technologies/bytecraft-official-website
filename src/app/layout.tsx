import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import NavBar from "./ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://bytecraft-technologies.com'),
  title: {
    default: "BYTECRAFT TECHNOLOGIES | Solutions Digitales Innovantes",
    template: "%s | BYTECRAFT TECHNOLOGIES",
  },
  description: "Agence de développement web et mobile au Bénin. Création de sites web, applications mobiles, APIs et solutions IA sur mesure. Technologies: React, Next.js, Spring Boot, React Native.",
  keywords: [
    "développement web",
    "développement mobile",
    "application mobile",
    "site web",
    "React",
    "Next.js",
    "Spring Boot",
    "React Native",
    "agence digitale",
    "Bénin",
    "Porto-Novo",
    "développeur",
    "freelance",
    "API",
    "intelligence artificielle",
    "IA",
  ],
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
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    url: 'https://bytecraft-technologies.com',
    siteName: 'ByteCraft Technologies',
    title: 'BYTECRAFT TECHNOLOGIES | Solutions Digitales Innovantes',
    description: 'Agence de développement web et mobile au Bénin. Création de sites web, applications mobiles, APIs et solutions IA sur mesure.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'ByteCraft Technologies - Solutions Digitales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYTECRAFT TECHNOLOGIES | Solutions Digitales Innovantes',
    description: 'Agence de développement web et mobile au Bénin. Sites web, applications mobiles, APIs et solutions IA.',
    images: ['/og-image.svg'],
    creator: '@bytecraft_tech',
  },
  verification: {
    google: 'votre-code-google-search-console',
  },
  category: 'technology',
};

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
    email: 'bytecraft.technologies@gmail.com',
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

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
