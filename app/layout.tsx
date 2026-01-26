import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jesse Johnson | Digital Marketing & E-commerce",
    template: "%s | Jesse Johnson",
  },
  description:
    "Digital marketer and e-commerce specialist with $4.5M+ in sales. 6 years Shopify experience. Currently E-commerce Manager at Quality Sewing.",
  keywords: [
    "digital marketing",
    "e-commerce",
    "Shopify",
    "SEO",
    "Seattle",
  ],
  authors: [{ name: "Jesse Johnson" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitaljesse.com",
    siteName: "Jesse Johnson",
    title: "Jesse Johnson | Digital Marketing & E-commerce",
    description:
      "Digital marketer and e-commerce specialist with $4.5M+ in sales.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesse Johnson | Digital Marketing & E-commerce",
    description:
      "Digital marketer and e-commerce specialist with $4.5M+ in sales.",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
