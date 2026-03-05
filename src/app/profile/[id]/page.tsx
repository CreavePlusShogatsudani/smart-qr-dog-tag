import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PublicPetProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet) {
        notFound()
    }

    if (pet.isEmergency) {
        return <EmergencyProfile pet={pet} />
    }

    return <NormalProfile pet={pet} />
}

function NormalProfile({ pet }: { pet: any }) {
    return (
        <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto bg-white">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-[2rem] p-8 text-white mb-8 text-center shadow-xl">
                <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4 backdrop-blur-md">
                    <i className="ri-user-heart-line text-4xl text-white"></i>
                </div>
                <h1 className="text-3xl font-black mb-2 tracking-tight">こんにちは！</h1>
                <p className="text-teal-50 font-medium">私の飼い主の友達になりましょう</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 mb-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-teal-50 flex items-center justify-center border-2 border-teal-100 p-1">
                        <div className="w-full h-full rounded-full bg-teal-100 flex items-center justify-center overflow-hidden">
                            <i className="ri-baidu-line text-4xl text-teal-600"></i>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-1">{pet.name}</h2>
                        <p className="text-gray-500 font-bold">Family Member</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-xl shadow-sm">
                            <i className="ri-cake-line text-2xl text-purple-600"></i>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Owner</p>
                            <p className="font-black text-gray-900">{pet.ownerName} 様</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-xl shadow-sm">
                            <i className="ri-phone-line text-2xl text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</p>
                            <a href={`tel:${pet.phoneNumber}`} className="font-black text-blue-600 hover:underline">{pet.phoneNumber}</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 mb-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl">
                        <i className="ri-information-line text-2xl text-green-600"></i>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">私について</h3>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                    {pet.features || '私の飼い主様が大切に守ってくれています。なにかあれば連絡先に教えてね！'}
                </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] p-8 border-2 border-indigo-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-indigo-500 rounded-xl shadow-lg">
                        <i className="ri-heart-line text-2xl text-white"></i>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 italic">Spread Love</h3>
                </div>
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">
                    PawTagを使って、あなたの大切な家族を守りましょう。
                </p>
                <Link href="/" className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                    <span>PawTagを詳しく知る</span>
                    <i className="ri-arrow-right-line"></i>
                </Link>
            </div>

            <div className="mt-10 py-6 text-center border-t border-gray-100">
                <p className="text-xs font-black text-gray-300 uppercase tracking-[0.3em]">Powered by PawTag</p>
            </div>
        </div>
    )
}

function EmergencyProfile({ pet }: { pet: any }) {
    return (
        <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto bg-[#FFF5F5]">
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-[2rem] p-10 text-white mb-8 text-center shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-6 backdrop-blur-md animate-pulse">
                        <i className="ri-alarm-warning-line text-5xl text-white"></i>
                    </div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">緊急モード</h1>
                    <p className="text-red-50 font-black text-lg">この子は現在、迷子になっています</p>
                </div>
                <i className="ri-shield-cross-line absolute -bottom-10 -right-10 text-[12rem] text-white/10 -rotate-12"></i>
            </div>

            <div className="bg-white border-4 border-orange-400 rounded-[2.5rem] p-8 mb-8 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-2xl shrink-0">
                        <i className="ri-information-fill text-3xl text-orange-600"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">保護ありがとうございます</h2>
                        <p className="text-gray-700 font-bold leading-relaxed">
                            飼い主は全力で探しています。以下の情報を確認し、連絡をお願いします。
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 mb-8 border border-red-100 shadow-lg">
                <div className="flex items-center gap-6 mb-8 border-b border-gray-50 pb-8">
                    <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center border-4 border-red-100 p-1">
                        <div className="w-full h-full rounded-full bg-red-100 flex items-center justify-center">
                            <i className="ri-baidu-line text-4xl text-red-600"></i>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-gray-900 mb-1">{pet.name}</h3>
                        <p className="text-red-600 font-black px-3 py-1 bg-red-50 rounded-full text-xs inline-block">緊急連絡希望</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="p-6 bg-red-50 rounded-[2rem] border border-red-100">
                        <p className="text-xs font-black text-red-400 uppercase tracking-wider mb-2">飼い主名</p>
                        <p className="text-2xl font-black text-gray-900">{pet.ownerName} 様</p>
                    </div>

                    <a href={`tel:${pet.phoneNumber}`} className="group p-6 bg-blue-600 rounded-[2rem] text-white shadow-xl hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-blue-200 uppercase tracking-wider mb-2">緊急連絡先（電話）</p>
                            <p className="text-2xl font-black">{pet.phoneNumber}</p>
                        </div>
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                            <i className="ri-phone-fill text-3xl"></i>
                        </div>
                    </a>

                    {pet.email && (
                        <a href={`mailto:${pet.email}`} className="group p-6 bg-gray-900 rounded-[2rem] text-white shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">メールアドレス</p>
                                <p className="text-xl font-black truncate max-w-[200px]">{pet.email}</p>
                            </div>
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform">
                                <i className="ri-mail-fill text-3xl"></i>
                            </div>
                        </a>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 mb-8 border-4 border-red-600 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-red-600 rounded-2xl text-white shadow-lg">
                        <i className="ri-heart-pulse-fill text-3xl"></i>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">医療・保護に関する注意</h3>
                </div>
                <div className="space-y-4">
                    <div className="p-6 bg-red-50 rounded-2xl">
                        <p className="text-xs font-black text-red-500 mb-2 tracking-widest uppercase">詳細・特徴</p>
                        <p className="text-gray-900 font-bold leading-relaxed whitespace-pre-wrap">{pet.features || '特になし'}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-500 px-2 italic">
                        ※アレルギーや持病がある可能性があるため、安易に食べ物を与えないでください。
                    </p>
                </div>
            </div>

            <div className="mt-12 text-center pb-10">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.4em]">Emergency Response System</p>
                <div className="mt-4 font-['Pacifico'] text-2xl text-red-400 opacity-50">PawTag</div>
            </div>
        </div>
    )
}
