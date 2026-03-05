import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function AdminPetDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet) {
        notFound()
    }

    // リクエストヘッダーからホスト名を動的に取得（Vercel/ローカル両対応）
    const headersList = await headers()
    const host = headersList.get('host') || 'localhost:3000'
    const protocol = headersList.get('x-forwarded-proto') || 'http'
    const baseUrl = `${protocol}://${host}`
    const publicProfileUrl = `${baseUrl}/profile/${pet.id}`

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 text-sm rounded-full border shadow-sm flex items-center justify-center">
                        <ArrowLeft size={20} />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{pet.name} の詳細管理</h2>
                </div>
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

                        <div className="mt-6 pt-6 border-t w-full text-left">
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                                このQRコードを印刷して首輪などに付けてください。読み取ると公開プロフィールが表示されます。
                            </p>
                            <a href={publicProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center">
                                <ExternalLink size={16} /> 公開用ページを確認
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
