"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

// アプリ用Header/BottomNavを表示しないパス一覧
// LP（/）、ログイン（/login）、登録（/register）、公開プロフィール（/profile）
const HIDE_SHELL_PATHS = ["/", "/login", "/register"];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const showShell = !HIDE_SHELL_PATHS.includes(pathname) && !pathname.startsWith("/profile/");

    if (!showShell) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="pb-20 bg-gray-50">
                {children}
            </main>
            <BottomNav />
        </>
    );
}
