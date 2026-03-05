'use client';

import { ShoppingBag, Star, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
    const products = [
        {
            id: 'pawtag-pro',
            name: 'PawTag Pro (強化セラミック製)',
            price: '2,980',
            description: '最も耐久性が高く、高級感のある PawTag です。レーザー刻印によりQRコードが消える心配もありません。',
            image: 'https://public.readdy.ai/ai/img_res/2434676f-b092-4355-bc79-b61057271c75.png',
            features: ['防水・耐熱', '傷に強い', '永久QR保証', '全5色展開']
        },
        {
            id: 'pawtag-standard',
            name: 'PawTag Standard (軽量アクリル製)',
            price: '1,480',
            description: '日常使いに最適な、非常に軽い PawTag です。子犬や小型犬、猫ちゃんにも負担になりません。',
            image: 'https://public.readdy.ai/ai/img_res/2434676f-b092-4355-bc79-b61057271c75.png',
            features: ['超軽量 3g', '耐水性', 'ポップなカラー', '選べるサイズ']
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20">
            {/* ヒーローセクション（ショップ用） */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-600 to-teal-500 p-8 md:p-12 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                        愛犬に、新しいお守りを。
                    </h1>
                    <p className="text-teal-50 text-base md:text-lg mb-8 leading-relaxed font-medium">
                        PawTagは迷子ペットのための「しゃべる迷子札」です。<br />
                        もう一つの家族にも、最高の安心をプレゼントしましょう。
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <ShieldCheck size={18} /> 国内配送料無料
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                            <Star size={18} /> レビュー最高評価 4.9
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden md:block">
                    <ShoppingBag size={240} className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-12" />
                </div>
            </div>

            {/* 商品ラインナップ */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                        <ShoppingBag className="text-teal-600" />
                        商品ラインナップ
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center p-8 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-teal-600 font-black shadow-sm">
                                    ¥{product.price}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-black text-gray-900 mb-3">{product.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {product.description}
                                </p>
                                <div className="grid grid-cols-2 gap-y-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-600">
                                            <CheckCircle2 size={14} className="text-teal-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full bg-gray-900 hover:bg-teal-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98]">
                                    詳細・購入はこちら <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* よくある質問への誘導 */}
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100 italic">
                <p className="text-gray-500 mb-4 font-medium">使い心地や設定について詳しく知りたい方は</p>
                <Link href="/help" className="text-teal-600 font-black text-lg hover:underline inline-flex items-center gap-2">
                    ヘルプ・使い方ガイドを見る <ArrowRight size={20} />
                </Link>
            </div>
        </div>
    );
}
