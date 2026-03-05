"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors cursor-pointer bg-gray-50 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-red-200"
        >
            <LogOut size={16} />
            <span className="hidden sm:inline">ログアウト</span>
        </button>
    );
}
