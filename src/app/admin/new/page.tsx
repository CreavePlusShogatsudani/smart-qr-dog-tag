import { createPet } from '../actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SubmitButton } from '@/components/SubmitButton'

export default function NewPetPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6 pb-12">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="text-gray-500 hover:text-gray-800 transition-colors bg-white p-2 rounded-full border shadow-sm flex items-center justify-center">
                    <ArrowLeft size={20} />
                </Link>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ペットの新規登録</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                <form action={createPet} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">ペット情報</h3>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ペットの名前 <span className="text-red-500">*</span></label>
                            <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" placeholder="例: ポチ" />
                        </div>
                        <div>
                            <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">特徴・持病・必要なケアなど</label>
                            <textarea id="features" name="features" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y bg-white" placeholder="例: 左耳が少し垂れています。アレルギーがあるため、専用のドッグフード以外は与えないでください。"></textarea>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">飼い主の連絡先</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">飼い主のお名前 <span className="text-red-500">*</span></label>
                                <input type="text" id="ownerName" name="ownerName" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" placeholder="例: 山田 太郎" />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">電話番号 <span className="text-red-500">*</span></label>
                                <input type="tel" id="phoneNumber" name="phoneNumber" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" placeholder="例: 090-1234-5678" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス <span className="text-gray-400 text-xs font-normal">(任意)</span></label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white" placeholder="例: sample@example.com" />
                        </div>
                    </div>

                    <div className="pt-6 border-t mt-8">
                        <SubmitButton
                            label="ペット情報を登録してQRコードを作成する"
                            loadingLabel="登録処理中..."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
