import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Suprema Consultoria em TI | Tecnologia e Inovação",
    template: "%s | Suprema Consultoria em TI",
  },
  description: "Consultoria especializada em TI: desenvolvimento de sistemas, segurança da informação, cloud computing, infraestrutura e arquitetura de software.",
  keywords: ["consultoria TI", "desenvolvimento software", "segurança informação", "cloud computing", "LGPD", "arquitetura software"],
  authors: [{ name: "Suprema Consultoria em TI" }],
  creator: "Suprema Consultoria em TI",
  publisher: "Suprema Consultoria em TI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://suprema-ti.com.br",
    siteName: "Suprema Consultoria em TI",
    title: "Suprema Consultoria em TI | Tecnologia e Inovação",
    description: "Consultoria especializada em TI: desenvolvimento, segurança, cloud e infraestrutura.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suprema Consultoria em TI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suprema Consultoria em TI",
    description: "Consultoria especializada em TI: desenvolvimento, segurança, cloud e infraestrutura.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E3A5F" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}