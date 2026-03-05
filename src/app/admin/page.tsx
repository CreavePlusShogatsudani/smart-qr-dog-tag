import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PlusCircle, QrCode } from 'lucide-react'

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    const pets = await prisma.pet.findMany({
        where: userId ? { userId } : { id: 'no-match' }, // 念のため取得制限
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">登録ペット一覧</h2>
                <Link href="/admin/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm font-medium text-sm">
                    <PlusCircle size={18} />
                    <span>新規登録</span>
                </Link>
            </div>

            {pets.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
                    <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <QrCode className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">まだペットが登録されていません</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">最初のペット情報を登録して、専用のプロフィールURLとQRコードを作成しましょう。</p>
                    <Link href="/admin/new" className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors">
                        <PlusCircle size={18} />
                        登録を始める
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map(pet => (
                        <Link key={pet.id} href={`/admin/${pet.id}`} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all p-6 group block relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{pet.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1 font-medium">飼い主: {pet.ownerName}</p>
                                </div>
                                <div className="bg-blue-50 bg-opacity-50 p-2.5 rounded-xl text-blue-600 group-hover:bg-blue-100 transition-colors">
                                    <QrCode size={22} />
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 space-y-2">
                                <p className="flex items-center gap-2">
                                    <span className="w-16 inline-block text-gray-400">連絡先:</span>
                                    <span className="font-medium truncate">{pet.phoneNumber}</span>
                                </p>
                                {pet.features && (
                                    <p className="flex items-start gap-2 mt-2">
                                        <span className="w-16 inline-block text-gray-400 mt-0.5">特徴:</span>
                                        <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 text-xs flex-1 line-clamp-2 leading-relaxed border border-gray-100">{pet.features}</span>
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
