import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { clinic, siteUrl } from "@/data/clinic";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.name} | عيادة أسنان في المعادي، القاهرة`,
    template: `%s | ${clinic.name}`,
  },
  description:
    "Your Dent Clinic عيادة أسنان في المعادي، القاهرة. تعرّف على خدمات الأسنان المتاحة واستكشف خيارات الرعاية المناسبة لك وتواصل مع فريق العيادة للاستفسار عن المواعيد.",
  keywords: [...clinic.keywordsAr, ...clinic.keywordsEn],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: clinic.name,
    title: `${clinic.name} | عيادة أسنان في المعادي، القاهرة`,
    description:
      "تعرّف على خدمات الأسنان المتاحة في Your Dent Clinic، واستكشف خيارات الرعاية المناسبة لك، وتواصل مع فريق العيادة للاستفسار عن المواعيد.",
  },
  twitter: {
    card: "summary",
    title: `${clinic.name} | عيادة أسنان في المعادي، القاهرة`,
    description:
      "تعرّف على خدمات الأسنان المتاحة في Your Dent Clinic، واستكشف خيارات الرعاية المناسبة لك.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "ar-EG": "/",
      "en-US": "/en",
      "x-default": "/",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DentalClinic",
  name: clinic.name,
  description: clinic.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address,
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  telephone: clinic.mobileIntl,
  email: clinic.email,
  url: siteUrl,
  openingHours: ["Sa-Th 16:00-23:00"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "16:00",
      closes: "23:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
