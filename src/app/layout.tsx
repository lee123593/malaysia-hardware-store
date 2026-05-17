import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "MY Hardware Pro — Premium Chinese Hardware Malaysia",
  description:
    "Malaysia hardware wholesale, China hardware supply Malaysia. Quality fasteners, tools, building hardware, power tools direct from China. Fast delivery to KL, Penang, Johor, Sabah, Sarawak.",
  keywords: [
    "Malaysia hardware wholesale",
    "China hardware supply Malaysia",
    "hardware store Malaysia",
    "五金批发马来西亚",
    "中国五金进口",
    "fasteners Malaysia",
    "power tools Malaysia",
    "building hardware KL",
    "hardware shop online Malaysia",
  ],
  openGraph: {
    title: "MY Hardware Pro — Premium Chinese Hardware Malaysia",
    description: "Quality Chinese hardware delivered to Malaysia. Factory-direct pricing, fast shipping nationwide.",
    type: "website",
    locale: "en_MY",
    siteName: "MY Hardware Pro",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="geo.region" content="MY" />
        <meta name="geo.placename" content="Malaysia" />
      </head>
      <body>
        <ToastProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
