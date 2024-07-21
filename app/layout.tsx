import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import RootProvider from "@/components/providers/root-provider";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    keywords: ["Task.it", "Trello Clone", "Trello alternative"],
    authors: [
        {
            name: "shadcn",
            url: "https://shadcn.com",
        },
    ],
    //   creator: "shadcn",
    //   openGraph: {
    //     type: "website",
    //     locale: "en_US",
    //     url: siteConfig.url,
    //     title: siteConfig.name,
    //     description: siteConfig.description,
    //     siteName: siteConfig.name,
    //     images: [
    //       {
    //         url: siteConfig.ogImage,
    //         width: 1200,
    //         height: 630,
    //         alt: siteConfig.name,
    //       },
    //     ],
    //   },
    //   twitter: {
    //     card: "summary_large_image",
    //     title: siteConfig.name,
    //     description: siteConfig.description,
    //     images: [siteConfig.ogImage],
    //     creator: "@shadcn",
    //   },
    //   icons: {
    //     icon: "/favicon.ico",
    //     shortcut: "/favicon-16x16.png",
    //     apple: "/apple-touch-icon.png",
    //   },
    //   manifest: `${siteConfig.url}/site.webmanifest`,
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <RootProvider>
                        {children}
                        <Toaster />
                    </RootProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
