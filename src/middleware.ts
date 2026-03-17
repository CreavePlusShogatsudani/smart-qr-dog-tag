import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    // ユーザーのセッション（トークン）を取得
    const token = await getToken({ req });
    const isAuth = !!token;

    const pathname = req.nextUrl.pathname;

    // ログイン済みユーザーがアクセスすべきではないページ（LP、ログイン、新規登録）
    const isAuthPage = pathname === '/' || pathname === '/login' || pathname === '/register';

    // 未ログインユーザーがアクセスすべきではない保護されたページ
    const isProtectedRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/settings');

    // 1. もしログイン済みで、LPやログイン画面にアクセスした場合 -> ダッシュボードへ強制送還
    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        return NextResponse.next();
    }

    // 2. もし未ログインで、保護されたページにアクセスした場合 -> ログイン画面へ強制送還
    if (!isAuth && isProtectedRoute) {
        let from = req.nextUrl.pathname;
        if (req.nextUrl.search) {
            from += req.nextUrl.search;
        }
        return NextResponse.redirect(new URL(`/login?callbackUrl=${encodeURIComponent(from)}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*"
    ]
};
