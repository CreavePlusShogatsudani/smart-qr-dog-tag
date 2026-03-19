'use client';

import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import NextAuthProvider from "@/components/NextAuthProvider";
import { usePathname } from "next/navigation";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LIEN Digital Tag",
  description: "大切な家族を見守るスマートドッグタグ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "LIEN Tag",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#edc2c2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLP = pathname === '/';

  return (
    <html lang="ja" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-white`}
      >
        <NextAuthProvider>
          {!isLP && <Header />}
          <main className={isLP ? "" : "pb-20"}>
            {children}
          </main>
          {!isLP && <BottomNav />}
        </NextAuthProvider>
      </body>
    </html>
  );
}
