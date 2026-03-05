import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm py-4 px-6 md:px-8 flex justify-between items-center sticky top-0 z-10">
                <h1 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                    🐾 QR迷子ペット管理
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 hidden md:inline-block">
                        {session.user?.name || session.user?.email || "デモ"} さんのアカウント
                    </span>
                    <LogoutButton />
                </div>
            </header>
            <main className="flex-grow p-6 md:p-8 max-w-5xl mx-auto w-full">
                {children}
            </main>
        </div>
    )
}
