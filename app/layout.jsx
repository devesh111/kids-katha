import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Root layout for Kids Katha app
 * Provides global styling, fonts, and metadata
 */
export const metadata = {
  title: "Kids Katha - Stories for Children",
  description: "Explore magical stories in English and Hindi. Free and premium storytelling for kids.",
  keywords: ["stories", "kids", "children", "audio", "hindi", "english"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kids-katha.com",
    siteName: "Kids Katha",
    title: "Kids Katha - Stories for Children",
    description: "Explore magical stories in English and Hindi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kids Katha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kids Katha - Stories for Children",
    description: "Explore magical stories in English and Hindi",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a1a1a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
