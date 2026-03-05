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
        <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto bg-white pb-20">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-[2.5rem] p-10 text-white mb-8 text-center shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4 backdrop-blur-md">
                        <i className="ri-user-heart-line text-4xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-black mb-1 tracking-tight">こんにちは！</h1>
                    <p className="text-teal-50 font-bold opacity-90">私の飼い主の友達になりましょう</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 mb-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-teal-50 flex items-center justify-center border-4 border-teal-100 p-1">
                            <div className="w-full h-full rounded-full bg-teal-100 flex items-center justify-center overflow-hidden">
                                <i className="ri-baidu-line text-5xl text-teal-600"></i>
                            </div>
                        </div>
                        {pet.instagram && (
                            <a href={`https://instagram.com/${pet.instagram}`} target="_blank" className="absolute -bottom-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                                <i className="ri-instagram-line text-xl text-pink-600"></i>
                            </a>
                        )}
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 mb-1">{pet.name}</h2>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {pet.breed && <span className="bg-teal-50 text-teal-700 text-[10px] font-black px-2.5 py-1 rounded-full">{pet.breed}</span>}
                            {pet.age && <span className="bg-purple-50 text-purple-700 text-[10px] font-black px-2.5 py-1 rounded-full">{pet.age}</span>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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

            <div className="bg-white rounded-[2.5rem] p-8 mb-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-xl">
                        <i className="ri-information-line text-2xl text-green-600"></i>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">私について</h3>
                </div>
                <div className="space-y-6">
                    {pet.features ? (
                        <p className="text-gray-700 leading-relaxed font-bold whitespace-pre-wrap">{pet.features}</p>
                    ) : (
                        <p className="text-gray-400 italic">プロフィールの詳細が設定されていません</p>
                    )}

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        {pet.weight && (
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Weight</p>
                                <p className="font-black text-gray-800">{pet.weight}</p>
                            </div>
                        )}
                        {pet.color && (
                            <div className="bg-gray-50 p-4 rounded-2xl">
                                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Color</p>
                                <p className="font-black text-gray-800">{pet.color}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2.5rem] p-10 border-2 border-indigo-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-indigo-500 rounded-2xl shadow-lg mx-auto mb-6">
                        <i className="ri-heart-line text-3xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 italic tracking-tight">Spread Love</h3>
                    <p className="text-gray-600 mb-8 font-bold leading-relaxed">
                        PawTagを使って、あなたの大切な家族を<br />テクノロジーで守りましょう。
                    </p>
                    <Link href="/" className="flex items-center justify-center gap-2 w-full py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                        <span>PawTagを詳しく知る</span>
                        <i className="ri-arrow-right-line text-xl"></i>
                    </Link>
                </div>
            </div>

            <div className="mt-12 py-8 text-center border-t border-gray-100">
                <p className="text-xs font-black text-gray-300 uppercase tracking-[0.4em]">Powered by PawTag</p>
                <div className="mt-4 font-['Pacifico'] text-2xl text-teal-400 opacity-30">PawTag</div>
            </div>
        </div>
    )
}

function EmergencyProfile({ pet }: { pet: any }) {
    return (
        <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto bg-[#FFF8F8] pb-24">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-[2.5rem] p-10 text-white mb-8 text-center shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <div className="w-24 h-24 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-6 backdrop-blur-md animate-pulse">
                        <i className="ri-alarm-warning-line text-5xl text-white"></i>
                    </div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight">緊急：迷子です</h1>
                    <p className="text-red-50 font-black text-lg">保護ありがとうございます。至急連絡を乞う</p>
                </div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                <i className="ri-shield-cross-line absolute -bottom-10 -right-10 text-[14rem] text-white/10 -rotate-12 pointer-events-none"></i>
            </div>

            <div className="bg-white border-4 border-orange-400 rounded-[2.5rem] p-8 mb-8 shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-2xl shrink-0 shadow-sm">
                        <i className="ri-information-fill text-3xl text-orange-600"></i>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2 leading-tight">飼い主が探しています</h2>
                        <p className="text-gray-700 font-bold leading-relaxed">
                            以下の情報を確認し、できるだけ早くご連絡をお願いします。
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 mb-8 border border-red-100 shadow-lg">
                <div className="flex items-center gap-6 mb-10 border-b border-gray-100 pb-10">
                    <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center border-4 border-red-100 p-1">
                        <div className="w-full h-full rounded-full bg-red-100 flex items-center justify-center">
                            <i className="ri-baidu-line text-5xl text-red-600"></i>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-4xl font-black text-gray-900 mb-2 leading-tight">{pet.name}</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-red-700 font-black px-3 py-1 bg-red-50 rounded-full text-xs border border-red-100 shadow-sm">緊急連絡希望</span>
                            {pet.breed && <span className="bg-gray-100 text-gray-600 text-[10px] font-black px-2.5 py-1 rounded-full">{pet.breed}</span>}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    <div className="p-8 bg-red-50 rounded-[2rem] border-2 border-red-100 shadow-inner">
                        <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2 ml-1">飼い主のお名前</p>
                        <p className="text-3xl font-black text-gray-900">{pet.ownerName} 様</p>
                    </div>

                    <a href={`tel:${pet.phoneNumber}`} className="group p-8 bg-blue-600 rounded-[2.2rem] text-white shadow-2xl hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-between border-b-8 border-blue-800 transform hover:-translate-y-1">
                        <div>
                            <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-2 ml-1">緊急連絡先 (電話)</p>
                            <p className="text-3xl font-black tracking-tighter">{pet.phoneNumber}</p>
                        </div>
                        <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform shadow-lg">
                            <i className="ri-phone-fill text-4xl"></i>
                        </div>
                    </a>

                    {pet.email && (
                        <a href={`mailto:${pet.email}`} className="group p-8 bg-gray-900 rounded-[2.2rem] text-white shadow-xl hover:bg-black transition-all active:scale-[0.98] flex items-center justify-between border-b-8 border-gray-950">
                            <div>
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">メールアドレス</p>
                                <p className="text-xl font-black truncate max-w-[200px]">{pet.email}</p>
                            </div>
                            <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center group-hover:-rotate-12 transition-transform">
                                <i className="ri-mail-fill text-4xl"></i>
                            </div>
                        </a>
                    )}

                    {pet.address && (
                        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1 ml-1">Home Area</p>
                            <div className="flex items-center gap-2">
                                <i className="ri-map-pin-line text-teal-600"></i>
                                <p className="font-black text-gray-800">{pet.address}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 医療・保護情報 - 緊急時に重要 */}
            <div className="bg-white rounded-[2.5rem] p-10 mb-8 border-4 border-red-600 shadow-2xl relative">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 flex items-center justify-center bg-red-600 rounded-2xl text-white shadow-lg">
                        <i className="ri-heart-pulse-fill text-4xl"></i>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">医療・保護に関する注意</h3>
                </div>

                <div className="space-y-6">
                    {(pet.medicalHistory || pet.medication || pet.features) && (
                        <div className="space-y-4">
                            {pet.medicalHistory && (
                                <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">既往症・持病</p>
                                    <p className="text-gray-900 font-bold leading-relaxed">{pet.medicalHistory}</p>
                                </div>
                            )}
                            {pet.medication && (
                                <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">服用中の薬</p>
                                    <p className="text-gray-900 font-bold leading-relaxed">{pet.medication}</p>
                                </div>
                            )}
                            {pet.medicalNotes && (
                                <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100">
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">特記事項</p>
                                    <p className="text-gray-900 font-bold leading-relaxed whitespace-pre-wrap">{pet.medicalNotes}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {(pet.clinicName || pet.clinicPhone) && (
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">かかりつけの動物病院</p>
                            <p className="text-xl font-black text-gray-900 mb-1">{pet.clinicName || '未登録'}</p>
                            {pet.clinicPhone && (
                                <a href={`tel:${pet.clinicPhone}`} className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
                                    <i className="ri-phone-line"></i>
                                    {pet.clinicPhone}
                                </a>
                            )}
                        </div>
                    )}

                    <div className="p-4 bg-orange-100/50 rounded-2xl">
                        <p className="text-xs font-bold text-orange-800 leading-relaxed italic">
                            ※アレルギーや持病がある可能性があるため、安易に食べ物や飲み物を与えないでください。
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center pb-12">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[0.5em]">Emergency Response System</p>
                <div className="mt-6 font-['Pacifico'] text-3xl text-red-500 opacity-40">PawTag</div>
            </div>
        </div>
    )
}
