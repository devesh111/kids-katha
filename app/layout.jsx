import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    description:
        "Explore magical stories in English and Hindi. Free and premium storytelling for kids. Screen-free audio stories for curious kids",
    keywords: ["stories", "kids", "children", "audio", "hindi", "english"],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://kidskatha.com",
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
                className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
