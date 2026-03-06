import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation'
import { DeletePetButton } from '@/components/DeletePetButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect('/login')
    }

    const userId = session.user.id

    // ペット一覧を取得
    const pets = await prisma.pet.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })

    // ペットが1匹だけの場合は自動的にその詳細（ダッシュボード）へリダイレクト
    if (pets.length === 1) {
        redirect(`/admin/${pets[0].id}`)
    }

    return (
        <div className="max-w-4xl mx-auto pb-20 px-4">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">My Pets</h1>
                    <p className="text-gray-500 font-medium">登録されている家族の一覧</p>
                </div>
                <Link href="/admin/new">
                    <button className="flex items-center gap-3 bg-teal-600 hover:bg-teal-700 text-white font-black px-8 py-4 rounded-[1.5rem] shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]">
                        <PlusCircle size={22} />
                        新しく仲間を加える
                    </button>
                </Link>
            </div>

            {pets.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-12 md:p-20 text-center border-2 border-dashed border-gray-100 shadow-sm group">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-teal-50 transition-colors">
                        <i className="ri-ghost-line text-5xl text-gray-300 group-hover:text-teal-400"></i>
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-4">まだ登録されていません</h2>
                    <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed italic">
                        QRタグを使って、あなたの大切な家族を守りましょう。
                    </p>
                    <Link href="/admin/new" className="inline-flex items-center gap-2 text-teal-600 font-black text-lg hover:underline underline-offset-8 decoration-2 decoration-teal-200">
                        最初のペットを登録する <PlusCircle size={20} />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pets.map((pet) => (
                        <div key={pet.id} className="group relative">
                            <Link href={`/admin/${pet.id}`}>
                                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center">
                                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center mb-6 border-2 border-white shadow-inner overflow-hidden">
                                        <i className="ri-baidu-line text-4xl text-teal-600"></i>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{pet.name}</h3>
                                        {pet.breed && <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-bold">{pet.breed}</span>}
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium mb-6 italic line-clamp-1">{pet.features || 'プロフィール設定済み'}</p>

                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-8">
                                        <div className="flex items-center gap-1.5">
                                            <i className="ri-user-smile-line text-teal-500"></i>
                                            {pet.ownerName}様
                                        </div>
                                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                        <div className="flex items-center gap-1.5 font-mono tracking-tighter">
                                            <i className="ri-qr-code-line text-teal-500"></i>
                                            {pet.id.slice(0, 8)}...
                                        </div>
                                    </div>

                                    <div className="w-full py-4 bg-gray-50 rounded-2xl text-teal-600 font-black text-sm group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                        詳細・管理画面を開く
                                    </div>
                                </div>
                            </Link>

                            {/* 削除ボタン（モバイルでも常時表示） */}
                            <div className="absolute top-6 right-6">
                                <DeletePetButton petId={pet.id} petName={pet.name} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ショップへの誘導 */}
            <div className="mt-20 relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-gray-900 to-black p-10 md:p-16 text-white shadow-2xl">
                <div className="relative z-10 max-w-lg">
                    <span className="inline-block bg-teal-500/20 text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg mb-6 border border-teal-500/30">
                        Official Store
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mb-6 leading-[1.2]">
                        新しい家族、新しい装備。<br />
                        <span className="text-teal-400 font-['Pacifico']">Items for special moments</span>
                    </h2>
                    <p className="text-gray-400 mb-10 leading-relaxed font-light italic">
                        もっと安全に、もっとおしゃれに。PawTag公認の首輪やハーネスを手に入れましょう。
                    </p>
                    <Link href="/admin/shop">
                        <button className="bg-white text-gray-950 font-black px-8 py-4 rounded-full shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] flex items-center gap-3 group">
                            ショップを見る
                            <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </Link>
                </div>
                <i className="ri-shopping-cart-line absolute -bottom-10 -right-10 text-[20rem] text-white/[0.03] -rotate-12 hidden md:block"></i>
            </div>
        </div>
    )
}
