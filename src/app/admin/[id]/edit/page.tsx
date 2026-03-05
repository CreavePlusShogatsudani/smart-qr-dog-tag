import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SubmitButton } from '@/components/SubmitButton'
import { updatePet } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function EditPetPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect('/login')
    }

    const { id } = await params
    const userId = session.user.id

    // ペット情報取得
    const pet = await prisma.pet.findUnique({
        where: { id }
    })

    if (!pet || pet.userId !== userId) {
        notFound()
    }

    // Server ActionにIDをバインド
    const updatePetWithId = updatePet.bind(null, pet.id)

    return (
        <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto pb-24">
            <div className="flex items-center gap-4 mb-8">
                <Link href={`/admin/${pet.id}`} className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-full border shadow-sm flex items-center justify-center">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">プロフィールの編集</h1>
                    <p className="text-gray-500 font-bold">情報を最新に保ちましょう</p>
                </div>
            </div>

            <form action={updatePetWithId} className="space-y-8">
                {/* 基本情報 */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-2xl shadow-sm">
                            <i className="ri-user-heart-line text-2xl text-purple-600"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">基本情報</h2>
                    </div>

                    <div className="flex justify-center mb-10">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center border-4 border-purple-50 p-1 overflow-hidden">
                                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                                    <i className="ri-image-line text-4xl text-gray-300"></i>
                                </div>
                            </div>
                            <button type="button" className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg cursor-pointer transform hover:scale-110 active:scale-95">
                                <i className="ri-camera-line text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-black text-gray-700 mb-2 ml-1">名前 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={pet.name}
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="breed" className="block text-sm font-black text-gray-700 mb-2 ml-1">犬種</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                defaultValue={pet.breed || ''}
                                placeholder="例: ゴールデンレトリバー"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="age" className="block text-sm font-black text-gray-700 mb-2 ml-1">年齢</label>
                                <input
                                    type="text"
                                    id="age"
                                    name="age"
                                    defaultValue={pet.age || ''}
                                    placeholder="例: 3歳"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="weight" className="block text-sm font-black text-gray-700 mb-2 ml-1">体重</label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    defaultValue={pet.weight || ''}
                                    placeholder="例: 30kg"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="color" className="block text-sm font-black text-gray-700 mb-2 ml-1">毛色</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                defaultValue={pet.color || ''}
                                placeholder="例: ゴールド"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="features" className="block text-sm font-black text-gray-700 mb-2 ml-1">紹介文</label>
                            <textarea
                                id="features"
                                name="features"
                                rows={4}
                                defaultValue={pet.features || ''}
                                placeholder="性格や好きなこと、保護時に役立つ情報など"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900 resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="instagram" className="block text-sm font-black text-gray-700 mb-2 ml-1">Instagram</label>
                            <div className="relative group">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-teal-500">@</span>
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    defaultValue={pet.instagram || ''}
                                    placeholder="user_id"
                                    className="w-full pl-10 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 医療情報 */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-2xl shadow-sm">
                            <i className="ri-heart-pulse-line text-2xl text-red-600"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">医療情報</h2>
                    </div>

                    <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 mb-8">
                        <div className="flex items-start gap-3">
                            <i className="ri-information-line text-xl text-orange-600 mt-0.5"></i>
                            <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                この情報は緊急モードでのみ表示されます。迷子になった際、発見者が適切なケアを提供できるようにします。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="medicalHistory" className="block text-sm font-black text-gray-700 mb-2 ml-1">既往症・持病</label>
                            <textarea
                                id="medicalHistory"
                                name="medicalHistory"
                                rows={3}
                                defaultValue={pet.medicalHistory || ''}
                                placeholder="アレルギー、慢性疾患など"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-gray-900 resize-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="medication" className="block text-sm font-black text-gray-700 mb-2 ml-1">服用中の薬</label>
                            <textarea
                                id="medication"
                                name="medication"
                                rows={3}
                                defaultValue={pet.medication || ''}
                                placeholder="薬の名前と用量"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-gray-900 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="clinicName" className="block text-sm font-black text-gray-700 mb-2 ml-1">かかりつけ動物病院</label>
                                <input
                                    type="text"
                                    id="clinicName"
                                    name="clinicName"
                                    defaultValue={pet.clinicName || ''}
                                    placeholder="病院名"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="clinicPhone" className="block text-sm font-black text-gray-700 mb-2 ml-1">獣医師の電話番号</label>
                                <input
                                    type="tel"
                                    id="clinicPhone"
                                    name="clinicPhone"
                                    defaultValue={pet.clinicPhone || ''}
                                    placeholder="03-XXXX-XXXX"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="medicalNotes" className="block text-sm font-black text-gray-700 mb-2 ml-1">医療特記事項</label>
                            <textarea
                                id="medicalNotes"
                                name="medicalNotes"
                                rows={3}
                                defaultValue={pet.medicalNotes || ''}
                                placeholder="その他の重要な医療情報"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all font-bold text-gray-900 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 飼い主情報 */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-2xl shadow-sm">
                            <i className="ri-user-line text-2xl text-blue-600"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">飼い主情報</h2>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-8">
                        <div className="flex items-start gap-3">
                            <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
                            <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                緊急モード時に発見者に表示される重要な情報です。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="ownerName" className="block text-sm font-black text-gray-700 mb-2 ml-1">飼い主名 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                defaultValue={pet.ownerName}
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-black text-gray-700 mb-2 ml-1">住所（エリア）</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                defaultValue={pet.address || ''}
                                placeholder="例: 東京都渋谷区"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-black text-gray-700 mb-2 ml-1">緊急連絡先 <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                defaultValue={pet.phoneNumber}
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-black text-gray-700 mb-2 ml-1">メールアドレス</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                defaultValue={pet.email || ''}
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex flex-col gap-4">
                    <SubmitButton
                        label="変更内容を保存する"
                        loadingLabel="保存中..."
                    />
                    <Link href={`/admin/${pet.id}`} className="w-full py-4 text-center font-bold text-gray-400 hover:text-gray-600 transition-colors">
                        変更を破棄して戻る
                    </Link>
                </div>
            </form>
        </div>
    )
}
