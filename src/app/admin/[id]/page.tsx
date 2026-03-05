import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, QrCode } from 'lucide-react'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { headers } from 'next/headers'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DeletePetButton } from '@/components/DeletePetButton'

export const dynamic = 'force-dynamic'

export default async function AdminPetDetail({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const { id } = await params

    // ペット情報取得
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet || (userId && pet.userId !== userId)) {
        notFound()
    }

    // 他にペットがいるかチェック（一覧に戻るボタンの文言調整用）
    const otherPetsCount = userId ? await prisma.pet.count({
        where: { userId, id: { not: id } }
    }) : 0

    // リクエストヘッダーからホスト名を動的に取得
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const baseUrl = `${protocol}://${host}`
    const publicProfileUrl = `${baseUrl}/profile/${pet.id}`

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-4">
                    <div className="bg-teal-600 p-3 rounded-2xl shadow-lg ring-4 ring-teal-50">
                        <QrCode size={28} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">{pet.name} のダッシュボード</h2>
                        <p className="text-gray-500 text-sm font-medium mt-1">管理・編集センター</p>
                    </div>
                </div>

                {otherPetsCount > 0 && (
                    <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-teal-600 bg-white border border-gray-200 px-5 py-2.5 rounded-xl shadow-sm transition-all hover:border-teal-200">
                        他のペットに切り替え
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Pet Info */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-5 w-full">登録情報</h3>
                        <dl className="grid grid-cols-1 gap-y-6 text-sm">
                            <div>
                                <dt className="text-gray-500 font-medium mb-1">ペットの名前</dt>
                                <dd className="text-gray-900 font-medium text-lg">{pet.name}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 font-medium mb-1">特徴・持病・必要なケアなど</dt>
                                <dd className="text-gray-900 bg-gray-50 p-4 rounded-xl border border-gray-100 min-h-[4rem] whitespace-pre-wrap leading-relaxed">
                                    {pet.features || '未設定'}
                                </dd>
                            </div>
                            <div className="pt-6 border-t mt-2">
                                <dt className="text-gray-500 font-medium mb-1">飼い主のお名前</dt>
                                <dd className="text-gray-900 font-medium">{pet.ownerName}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 font-medium mb-1">電話番号</dt>
                                <dd className="text-gray-900 font-medium">{pet.phoneNumber}</dd>
                            </div>
                            <div>
                                <dt className="text-gray-500 font-medium mb-1">メールアドレス</dt>
                                <dd className="text-gray-900">{pet.email || '未設定'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* 2. QR Code */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center sticky top-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 w-full border-b pb-3 text-left">専用QRコード</h3>

                        <QRCodeDisplay url={publicProfileUrl} />

                        <div className="mt-6 pt-6 border-t w-full text-left space-y-3">
                            <p className="text-sm text-gray-500 mb-1 leading-relaxed">
                                このQRコードを印刷して首輪などに付けてください。読み取ると公開プロフィールが表示されます。
                            </p>
                            <a href={publicProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center">
                                <ExternalLink size={16} /> 公開用ページを確認
                            </a>
                            <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium bg-gray-100 px-4 py-2 rounded-lg transition-colors w-full justify-center">
                                <ArrowLeft size={16} /> 登録一覧に戻る
                            </Link>
                            <div className="pt-2">
                                <DeletePetButton petId={pet.id} petName={pet.name} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
