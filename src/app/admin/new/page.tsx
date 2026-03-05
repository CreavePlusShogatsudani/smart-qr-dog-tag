import { createPet } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SubmitButton } from '@/components/SubmitButton'

export default function NewPetPage() {
    return (
        <div className="min-h-screen px-4 py-8 max-w-2xl mx-auto pb-24">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-full border shadow-sm flex items-center justify-center">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 leading-tight">ペットの新規登録</h1>
                    <p className="text-gray-500 font-bold">新しい家族を守る準備をしましょう</p>
                </div>
            </div>

            <form action={createPet} className="space-y-8">
                {/* 基本情報 */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-2xl shadow-sm">
                            <i className="ri-baidu-line text-2xl text-purple-600"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">基本情報</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-black text-gray-700 mb-2 ml-1">名前 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                placeholder="例: ポチ"
                            />
                        </div>

                        <div>
                            <label htmlFor="breed" className="block text-sm font-black text-gray-700 mb-2 ml-1">犬種</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                placeholder="例: 柴犬"
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
                                    placeholder="例: 2歳"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="weight" className="block text-sm font-black text-gray-700 mb-2 ml-1">体重</label>
                                <input
                                    type="text"
                                    id="weight"
                                    name="weight"
                                    placeholder="例: 10kg"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="features" className="block text-sm font-black text-gray-700 mb-2 ml-1">紹介文 / 特徴</label>
                            <textarea
                                id="features"
                                name="features"
                                rows={4}
                                placeholder="性格や好きなこと、保護時に役立つ情報など"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-gray-900 resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* 連絡先情報 */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-2xl shadow-sm">
                            <i className="ri-user-line text-2xl text-blue-600"></i>
                        </div>
                        <h2 className="text-xl font-black text-gray-900">飼い主情報</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="ownerName" className="block text-sm font-black text-gray-700 mb-2 ml-1">飼い主名 <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                                placeholder="例: 山田 太郎"
                            />
                        </div>

                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-black text-gray-700 mb-2 ml-1">緊急連絡先 <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                required
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                                placeholder="例: 090-1234-5678"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-black text-gray-700 mb-2 ml-1">メールアドレス <span className="text-gray-400 text-xs font-normal">(任意)</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-[1.2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-gray-900"
                                placeholder="例: sample@example.com"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <SubmitButton
                        label="ペットを登録してQRコードを作成"
                        loadingLabel="登録処理中..."
                    />
                </div>
            </form>
        </div>
    )
}
