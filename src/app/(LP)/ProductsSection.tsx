'use client';
import React from 'react';

export default function ProductsSection() {
  const products = [
    {
      name: 'スタンダード首輪',
      price: '¥4,980',
      badge: '人気No.1',
      features: ['耐久性抜群のナイロン素材', 'サイズ調整可能（S/M/L）', 'QRコード耐水加工'],
      img: 'https://readdy.ai/api/search-image?query=stylish%20minimalist%20dog%20collar%20with%20small%20QR%20code%20tag%2C%20teal%20navy%20color%2C%20placed%20on%20light%20beige%20linen%20fabric%2C%20natural%20daylight%2C%20Japanese%20product%20photography%20aesthetic%2C%20clean%20and%20simple%20composition&width=700&height=500&seq=prod-collar-v3&orientation=landscape',
      featured: true,
    },
    {
      name: '調整式ハーネス',
      price: '¥5,980',
      badge: '快適フィット',
      features: ['胸部への負担軽減設計', '反射材付きで夜間も安心', '通気性メッシュ素材'],
      img: 'https://readdy.ai/api/search-image?query=dog%20harness%20with%20QR%20code%20tag%20on%20white%20background%2C%20navy%20blue%20adjustable%20straps%2C%20clean%20product%20photography%2C%20soft%20shadow%2C%20minimalist%20Japanese%20style&width=700&height=500&seq=prod-harness-v3&orientation=landscape',
    },
    {
      name: 'LED光る首輪',
      price: '¥6,980',
      badge: '夜間も安心',
      features: ['3色LED切替可能', 'USB充電式（約8時間点灯）', '防水仕様IPX5'],
      img: 'https://readdy.ai/api/search-image?query=glowing%20LED%20dog%20collar%20with%20QR%20code%20on%20dark%20background%2C%20soft%20colorful%20light%20glow%2C%20product%20photography%2C%20modern%20design%2C%20safety%20feature%2C%20cinematic%20lighting&width=700&height=500&seq=prod-led-v3&orientation=landscape',
    },
    {
      name: 'QRキーホルダー',
      price: '¥2,980',
      badge: 'コンパクト',
      features: ['既存の首輪に取り付け可能', '軽量アルミ製', '耐水・耐衝撃'],
      img: 'https://readdy.ai/api/search-image?query=small%20aluminum%20QR%20code%20keychain%20tag%20for%20dog%20collar%2C%20placed%20on%20white%20marble%20surface%2C%20minimal%20product%20photography%2C%20natural%20light%2C%20clean%20background&width=700&height=500&seq=prod-key-v3&orientation=landscape',
    },
    {
      name: 'LED光るキーホルダー',
      price: '¥3,980',
      badge: '夜散歩に最適',
      features: ['点滅・点灯モード切替', '電池式（CR2032）', 'カラビナ付き'],
      img: 'https://readdy.ai/api/search-image?query=small%20glowing%20LED%20keychain%20tag%20for%20dog%2C%20dark%20background%20with%20soft%20colorful%20glow%2C%20product%20photography%2C%20safety%20accessory%2C%20minimal%20composition&width=700&height=500&seq=prod-ledkey-v3&orientation=landscape',
    },
    {
      name: '愛犬そっくり3Dアクセサリー',
      price: '¥12,800〜',
      badge: '世界に1つだけ',
      features: ['写真から3Dモデル作成', '食品グレード樹脂使用', 'QRコード内蔵タイプ'],
      img: 'https://readdy.ai/api/search-image?query=3D%20printed%20miniature%20dog%20figurine%20keychain%20accessory%2C%20colorful%20resin%20material%2C%20placed%20on%20white%20background%2C%20soft%20natural%20light%2C%20cute%20pet%20memorial%20gift%2C%20Japanese%20product%20photography&width=700&height=500&seq=prod-3d-v3&orientation=landscape',
    },
  ];

  return (
    <section id="products" className="py-36 bg-white">
      <div className="w-full px-10 md:px-16 lg:px-24">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-24 gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-5">Products</p>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
              QRコード印字<br />
              <span className="font-semibold">商品ラインナップ</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-[2] max-w-xs lg:text-right">
            すべての商品にQRコード印字サービスが含まれています。<br />
            送料無料・税込価格。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100" data-product-shop>
          {products.map((p) => (
            <div
              key={p.name}
              className="border-r border-b border-gray-100 group cursor-default"
            >
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-72 object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <span className="text-xs tracking-widest bg-white text-teal-500 px-4 py-2 shadow-sm">
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="p-8 bg-white">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-3xl font-light text-gray-900 mb-6">
                  {p.price}
                  <span className="text-xs font-normal text-gray-400 ml-2">税込・送料無料</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-teal-500 text-sm"></i>
                      </div>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full text-sm tracking-widest font-medium py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white whitespace-nowrap transition-all cursor-pointer"
                >
                  カートに追加
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm tracking-wide leading-relaxed">
            QRコードの作成・管理は無料です。商品購入時にQRコードを印字してお届けします。
          </p>
        </div>
      </div>
    </section>
  );
}
