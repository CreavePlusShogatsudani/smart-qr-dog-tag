'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import NextAuthProvider from "@/components/NextAuthProvider";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLP = pathname === '/';

  return (
    <NextAuthProvider>
      {!isLP && <Header />}
      <main className={isLP ? "" : "pb-20"}>
        {children}
      </main>
      {!isLP && <BottomNav />}
    </NextAuthProvider>
  );
}
