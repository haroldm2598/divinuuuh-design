import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Design and Build by Divinuuuh",
    description: "Helps you to visualize your ideal design into real life",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Script
                    src="https://js.puter.com/v2/"
                    strategy="beforeInteractive"
                />
                <ClerkProvider appearance={{ theme: shadcn }}>
                    <Navbar />
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
