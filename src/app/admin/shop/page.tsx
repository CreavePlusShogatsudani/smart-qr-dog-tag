'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ShopPage() {
    const categories = [
        {
            name: 'QRタグ',
            icon: 'ri-qr-code-line',
            color: 'bg-teal-100',
            textColor: 'text-teal-600',
            products: [
                {
                    name: 'スタンダードタグ',
                    price: '1,980',
                    badge: '人気No.1',
                    badgeColor: 'bg-teal-600',
                    desc: 'シンプルで丈夫なステンレス製QRタグ。どんな首輪にも合うベーシックデザイン。',
                    features: ['ステンレス製', '防水・耐傷', '直径30mm', '全5色展開'],
                    image: 'https://readdy.ai/api/search-image?query=Single%20round%20stainless%20steel%20pet%20ID%20tag%20lying%20flat%20on%20white%20surface%20with%20large%20black%20QR%20code%20matrix%20barcode%20clearly%20printed%20in%20center%20of%20tag%20shiny%20metallic%20finish%20small%20ring%20attachment%20at%20top%20isolated%20white%20background%20macro%20product%20shot%20sharp%20focus%20studio%20lighting&width=600&height=500&seq=qrtag-std-2025a'
                },
                {
                    name: 'プレミアムタグ',
                    price: '3,480',
                    badge: 'おすすめ',
                    badgeColor: 'bg-amber-500',
                    desc: '本革ストラップ付きのプレミアムモデル。高級感あるデザインで愛犬をおしゃれに。',
                    features: ['本革ストラップ付き', '真鍮製ゴールド仕上げ', '直径35mm', '名前刻印無料'],
                    image: 'https://readdy.ai/api/search-image?query=Luxury%20gold%20brass%20oval%20pet%20tag%20with%20prominent%20QR%20code%20engraved%20on%20polished%20surface%20brown%20genuine%20leather%20cord%20attached%20elegant%20jewelry%20style%20product%20photography%20pure%20white%20background%20warm%20studio%20lighting%20premium%20accessory%20close%20up&width=600&height=500&seq=qrtag-prm-2025b'
                },
                {
                    name: 'シリコンタグ',
                    price: '1,280',
                    badge: '軽量',
                    badgeColor: 'bg-blue-500',
                    desc: '軽くて柔らかいシリコン素材。小型犬や子犬にも安心して使えるやさしい素材。',
                    features: ['シリコン製', '超軽量8g', '全8色展開', '子犬・小型犬向け'],
                    image: 'https://readdy.ai/api/search-image?query=Soft%20flexible%20silicone%20rubber%20pet%20tag%20in%20pastel%20pink%20color%20with%20black%20QR%20code%20square%20printed%20clearly%20on%20smooth%20flat%20surface%20lightweight%20small%20tag%20with%20hole%20for%20attachment%20white%20background%20product%20photography%20bright%20studio%20lighting%20cute%20minimal%20design&width=600&height=500&seq=qrtag-sil-2025c'
                }
            ]
        },
        {
            name: '首輪',
            icon: 'ri-links-line',
            color: 'bg-amber-100',
            textColor: 'text-amber-600',
            products: [
                {
                    name: 'レザーカラー',
                    price: '4,980',
                    badge: '人気',
                    badgeColor: 'bg-amber-500',
                    desc: '上質な本革を使用したクラシックな首輪。QRタグホルダー付きで安全管理も万全。',
                    features: ['本革製', 'QRタグホルダー付き', 'サイズ調整可能', '全4色展開'],
                    image: 'https://readdy.ai/api/search-image?query=Brown%20genuine%20leather%20dog%20collar%20laid%20flat%20on%20white%20background%20with%20silver%20metal%20buckle%20and%20D-ring%20small%20round%20metal%20tag%20with%20visible%20QR%20code%20barcode%20hanging%20from%20ring%20product%20photography%20overhead%20shot%20clean%20minimal%20studio%20lighting&width=600&height=500&seq=collar-lth-2025a'
                },
                {
                    name: 'ナイロンカラー',
                    price: '2,480',
                    badge: '丈夫',
                    badgeColor: 'bg-teal-600',
                    desc: '耐久性に優れたナイロン素材。水洗いOKで清潔に保てる実用的な首輪。',
                    features: ['ナイロン製', '水洗い可能', '反射テープ付き', '全6色展開'],
                    image: 'https://readdy.ai/api/search-image?query=Teal%20blue%20nylon%20webbing%20dog%20collar%20flat%20lay%20on%20white%20background%20with%20plastic%20quick%20release%20buckle%20reflective%20strip%20and%20small%20square%20QR%20code%20tag%20sewn%20onto%20collar%20label%20product%20photography%20overhead%20clean%20white%20background%20studio%20lighting&width=600&height=500&seq=collar-nyl-2025b'
                },
                {
                    name: 'フラワーカラー',
                    price: '3,280',
                    badge: 'かわいい',
                    badgeColor: 'bg-rose-500',
                    desc: '花柄刺繍が可愛いフェミニンな首輪。女の子の愛犬にぴったりのデザイン。',
                    features: ['刺繍デザイン', '柔らかコットン素材', 'QRタグ対応', '全3柄展開'],
                    image: 'https://readdy.ai/api/search-image?query=Pink%20cotton%20dog%20collar%20with%20colorful%20floral%20embroidery%20pattern%20laid%20flat%20on%20white%20background%20cable%20knit%20texture%20turtleneck%20style%20small%20QR%20code%20tag%20sewn%20onto%20collar%20label%20product%20photography%20overhead%20flat%20lay%20clean%20white%20studio%20lighting%20cozy%20winter%20pet%20clothing&width=600&height=500&seq=collar-flw-2025c'
                }
            ]
        },
        {
            name: 'ハーネス',
            icon: 'ri-shield-line',
            color: 'bg-blue-100',
            textColor: 'text-blue-600',
            products: [
                {
                    name: 'メッシュハーネス',
                    price: '5,480',
                    badge: '通気性抜群',
                    badgeColor: 'bg-blue-500',
                    desc: '通気性に優れたメッシュ素材のハーネス。夏場の散歩も快適に過ごせます。',
                    features: ['メッシュ素材', '通気性抜群', 'QRタグポケット付き', 'S/M/L/XL対応'],
                    image: 'https://readdy.ai/api/search-image?query=Light%20blue%20breathable%20mesh%20dog%20harness%20laid%20flat%20on%20white%20background%20showing%20chest%20plate%20back%20panel%20adjustable%20straps%20plastic%20buckles%20small%20QR%20code%20tag%20attached%20to%20front%20metal%20ring%20product%20photography%20flat%20lay%20overhead%20clean%20white%20studio%20lighting%20cute%20pet%20clothing%20minimal&width=600&height=500&seq=harness-msh-2025a'
                },
                {
                    name: 'ステップインハーネス',
                    price: '6,280',
                    badge: 'おすすめ',
                    badgeColor: 'bg-teal-600',
                    desc: '足を通すだけで簡単装着。引っ張り防止設計で散歩トレーニングにも最適。',
                    features: ['ステップイン式', '引っ張り防止設計', '反射テープ付き', 'QRタグ対応'],
                    image: 'https://readdy.ai/api/search-image?query=Teal%20green%20step-in%20dog%20harness%20flat%20lay%20on%20white%20background%20two%20leg%20holes%20visible%20padded%20chest%20piece%20reflective%20strips%20metal%20D-ring%20with%20small%20QR%20code%20tag%20clipped%20on%20product%20photography%20overhead%20shot%20clean%20white%20background%20studio%20lighting&width=600&height=500&seq=harness-stp-2025b'
                },
                {
                    name: 'タクティカルハーネス',
                    price: '8,980',
                    badge: 'プロ仕様',
                    badgeColor: 'bg-gray-700',
                    desc: '大型犬にも対応するタフなタクティカルハーネス。ハンドルグリップ付きで安全管理も万全。',
                    features: ['ミリタリーゲレード', 'ハンドルグリップ付き', 'モジュラーポーチ対応', 'L/XL/XXL対応'],
                    image: 'https://readdy.ai/api/search-image?query=Dark%20olive%20green%20tactical%20military%20dog%20harness%20flat%20lay%20on%20white%20background%20molle%20webbing%20handle%20grip%20heavy%20duty%20metal%20buckles%20QR%20code%20tag%20attached%20to%20front%20D-ring%20product%20photography%20overhead%20clean%20white%20studio%20lighting%20rugged%20outdoor%20gear&width=600&height=500&seq=harness-tac-2025c'
                }
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
            {/* ヒーローセクション */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 aspect-[21/9] md:aspect-[3/1] flex items-center shadow-2xl">
                <img
                    src="https://readdy.ai/api/search-image?query=Happy%20dog%20owner%20hugging%20golden%20retriever%20in%20beautiful%20Japanese%20park%20cherry%20blossoms%20warm%20golden%20sunset%20light%20emotional%20heartwarming%20scene%20professional%20photography%20cinematic%20quality%20wide%20shot&width=1600&height=600&seq=shop-hero"
                    alt="Shop Hero"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent"></div>
                <div className="relative z-10 px-8 md:px-16 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                        愛犬にぴったりの<br />
                        <span className="text-teal-400 font-['Pacifico'] text-2xl md:text-4xl">Items</span>
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
                        迷子札から首輪・ハーネスまで、愛犬の安全とおしゃれを両立するアイテムが揃っています。
                    </p>
                </div>
            </div>

            {/* カテゴリー別商品リスト */}
            {categories.map((category) => (
                <div key={category.name} className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                            <i className={`${category.icon} ${category.textColor} text-2xl`}></i>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{category.name}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {category.products.map((product) => (
                            <div key={product.name} className="bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group border border-gray-100 flex flex-col">
                                <div className="relative h-60 md:h-64 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="max-h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className={`absolute top-5 left-5 ${product.badgeColor} text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg`}>
                                        {product.badge}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="font-black text-gray-900 text-xl tracking-tight leading-tight">{product.name}</h3>
                                        <span className="text-teal-600 font-black text-2xl ml-2 tracking-tighter">¥{product.price}</span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 italic">
                                        {product.desc}
                                    </p>
                                    <ul className="grid grid-cols-2 gap-2 mb-8">
                                        {product.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                                <i className="ri-checkbox-circle-fill text-teal-400 text-sm"></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="mt-auto w-full bg-gray-900 text-white py-4 rounded-2xl text-sm font-black hover:bg-teal-600 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3">
                                        <i className="ri-shopping-cart-2-line text-lg"></i>
                                        カートに追加
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* ヘルプ誘導 */}
            <div className="bg-teal-50 rounded-[2.5rem] p-10 md:p-16 text-center border-2 border-teal-100 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-teal-600 text-xs font-black tracking-widest uppercase mb-4">Support</p>
                    <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">使い心地や設定について<br className="md:hidden" />詳しく知りたい方へ</h2>
                    <Link href="/help">
                        <button className="inline-flex items-center gap-3 bg-white text-teal-600 px-8 py-4 rounded-full font-black text-lg shadow-xl hover:-translate-y-1 transition-all active:scale-[0.98] border border-teal-100">
                            ヘルプ・使い方ガイドを見る <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>
                <i className="ri-question-line absolute -bottom-10 -right-10 text-[15rem] text-teal-100 opacity-50 rotate-12"></i>
            </div>
        </div>
    );
}
