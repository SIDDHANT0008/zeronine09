import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zeronine — Digital Products, Engineered Differently.",
  description:
    "zeronine is a development studio building high-performance digital products, AI systems, SaaS platforms and immersive web experiences.",
  keywords: [
    "development studio",
    "digital products",
    "SaaS",
    "AI",
    "web development",
    "software engineering",
    "product design",
  ],
  openGraph: {
    title: "zeronine — Digital Products, Engineered Differently.",
    description:
      "Development studio for ambitious products, brands and ideas.",
    url: "https://zeronine.studio",
    siteName: "zeronine",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "zeronine — Digital Products, Engineered Differently.",
    description:
      "Development studio for ambitious products, brands and ideas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
