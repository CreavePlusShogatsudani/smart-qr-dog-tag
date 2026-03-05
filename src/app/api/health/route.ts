import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const checks: Record<string, string> = {}

    // 環境変数チェック
    checks['DATABASE_URL'] = process.env.DATABASE_URL ? 'set' : 'MISSING'
    checks['DIRECT_URL'] = process.env.DIRECT_URL ? 'set' : 'MISSING'
    checks['NEXTAUTH_SECRET'] = process.env.NEXTAUTH_SECRET ? 'set' : 'MISSING'
    checks['NEXTAUTH_URL'] = process.env.NEXTAUTH_URL || 'MISSING'

    // DBコネクションチェック
    try {
        await prisma.$queryRaw`SELECT 1`
        checks['db'] = 'ok'
    } catch (e: unknown) {
        checks['db'] = `error: ${e instanceof Error ? e.message : String(e)}`
    }

    return NextResponse.json(checks)
}
