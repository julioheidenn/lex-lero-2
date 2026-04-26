import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lex-Lero | Tradutor Jurídico",
  description: "Traduza linguagem popular para o juridiquês de forma rápida e humorística.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-6602882672663191" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script 
          async 
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6602882672663191`} 
          crossOrigin="anonymous" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}
