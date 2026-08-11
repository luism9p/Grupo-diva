import type { Metadata } from "next";
import { Anton, Lato } from "next/font/google";
import Footer4 from "@/components/ui/footer-section-4";
import { Header } from "@/components/layout/header";
import { SplashCurtain } from "@/components/layout/splash-curtain";
import { LenisProvider } from "@/components/layout/lenis-provider";
import { WhatsappButton } from "@/components/layout/whatsapp-button";
import { locations } from "@/lib/locations";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diva Benidorm — Cocina Italiana Premium",
  description:
    "Diva Benidorm — Auténtica cocina italiana premium. Pizzas artesanales, pastas frescas y una experiencia gastronómica única en Benidorm, España.",
  keywords: [
    "pizza Benidorm",
    "restaurante italiano Benidorm",
    "cocina italiana premium",
    "Diva Benidorm",
    "pizzería artesanal",
  ],
  authors: [{ name: "Grupo Diva" }],
  openGraph: {
    title: "Diva Benidorm — Cocina Italiana Premium",
    description:
      "Auténtica cocina italiana, elaborada con pasión y los mejores ingredientes. Ven y disfruta en nuestras 6 ubicaciones en Benidorm.",
    images: ["/pizza.jpg"],
    type: "website",
    locale: "es_ES",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Grupo Diva",
  description: "Grupo de pizzerías italianas premium en Benidorm, España",
  url: "https://divabenidorm.com",
  telephone: "+34650904402",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plaza de la Creu Alameda 13",
    addressLocality: "Benidorm",
    postalCode: "03502",
    addressCountry: "ES",
  },
  subOrganization: locations.map((location) => ({
    "@type": "Restaurant",
    name: location.name,
    servesCuisine: "Italian",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${location.street} ${location.streetNumber}`,
      addressLocality: location.city,
      postalCode: location.postalCode,
      addressCountry: "ES",
    },
    telephone: location.phoneHref,
    openingHours: location.openingHours,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${anton.variable} ${lato.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full" suppressHydrationWarning>
        <LenisProvider>
          <SplashCurtain />
          <Header />
          <main>{children}</main>
          <Footer4 />
          <WhatsappButton />
        </LenisProvider>
      </body>
    </html>
  );
}
