import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Phone, Mail, AlertTriangle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PublicPetProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 pb-16">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header Alert */}
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3 shadow-sm mb-6">
                    <AlertTriangle className="shrink-0 text-red-600 mt-0.5" />
                    <p className="font-semibold text-sm leading-relaxed text-red-800">
                        この子は迷子になっている可能性があります。見つけた方は飼い主へのご連絡をお願いいたします。
                    </p>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-gray-900 mb-2">{pet.name}</h1>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-4">基本情報・特徴</h2>
                    <div className="bg-gray-50 rounded-xl p-4 text-gray-700 leading-relaxed whitespace-pre-wrap text-sm border border-gray-100 min-h-[5rem]">
                        {pet.features || '特記事項はありません'}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 border-b pb-3 mb-6">飼い主の連絡先</h2>

                    <dl className="space-y-5 mb-8">
                        <div>
                            <dt className="text-xs font-semibold text-gray-500 mb-1 tracking-wider uppercase">お名前</dt>
                            <dd className="font-medium text-gray-900">{pet.ownerName} 様</dd>
                        </div>
                        <div>
                            <dt className="text-xs font-semibold text-gray-500 mb-1 tracking-wider uppercase">電話番号</dt>
                            <dd className="font-bold text-gray-900 text-xl tracking-wide">{pet.phoneNumber}</dd>
                        </div>
                        {pet.email && (
                            <div>
                                <dt className="text-xs font-semibold text-gray-500 mb-1 tracking-wider uppercase">メールアドレス</dt>
                                <dd className="font-medium text-gray-900 break-all">{pet.email}</dd>
                            </div>
                        )}
                    </dl>

                    <div className="flex flex-col gap-3">
                        <a href={`tel:${pet.phoneNumber.replace(/[^0-9]/g, '')}`} className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-md transition-colors cursor-pointer group">
                            <Phone size={22} className="group-hover:animate-pulse" />
                            電話をかける
                        </a>
                        {pet.email && (
                            <a href={`mailto:${pet.email}?subject=迷子ペット(${pet.name})の保護について`} className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-xl font-semibold transition-colors cursor-pointer">
                                <Mail size={20} />
                                メールを送る
                            </a>
                        )}
                    </div>
                </div>

                <div className="text-center pt-8">
                    <p className="text-xs text-gray-400 font-medium">Smart QR Dog Tag</p>
                </div>
            </div>
        </div>
    )
}
