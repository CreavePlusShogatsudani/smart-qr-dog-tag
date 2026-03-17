'use client';

import { useState } from 'react';
import StoreHeader from './StoreHeader';
import ProductCard from './ProductCard';
import CartToast from './CartToast';

const products = [
  {
    id: 'premium-tag',
    name: 'LIEN プレミアム迷子札',
    subtitle: '真鍮・アクリル素材 / QRコード内蔵',
    price: '¥2,480',
    badge: '人気No.1',
    image: 'https://readdy.ai/api/search-image?query=A%20premium%20brass%20pet%20ID%20tag%20with%20elegant%20engraving%20and%20QR%20code%20attached%20to%20a%20soft%20brown%20leather%20collar%2C%20photographed%20on%20a%20clean%20white%20marble%20surface%20with%20soft%20natural%20lighting%2C%20minimalist%20composition%2C%20professional%20product%20photography%2C%20warm%20tones%2C%20high-end%20boutique%20aesthetic%2C%20simple%20white%20background&width=800&height=800&seq=pawtag-tag-001&orientation=squarish',
    tags: ['💧 防水', '🛡️ 頑丈', '🇯🇵 国内製造'],
  },
  {
    id: 'qr-harness',
    name: 'LIEN QRハーネス',
    subtitle: 'QRコード刺繍入り / 全サイズ対応',
    price: '¥4,980',
    badge: '新登場',
    image: 'https://readdy.ai/api/search-image?query=A%20stylish%20modern%20dog%20harness%20in%20soft%20sage%20green%20color%20with%20an%20embroidered%20QR%20code%20patch%20on%20the%20back%2C%20displayed%20on%20a%20clean%20white%20background%20with%20soft%20studio%20lighting%2C%20premium%20pet%20product%20photography%2C%20minimalist%20and%20elegant%20composition%2C%20high-end%20boutique%20aesthetic&width=800&height=800&seq=pawtag-harness-001&orientation=squarish',
    tags: ['🐾 全サイズ', '🔖 QR刺繍', '✂️ 調節可能'],
  },
  {
    id: 'qr-collar',
    name: 'LIEN QR首輪',
    subtitle: 'QRコードプレート付き / 本革仕上げ',
    price: '¥3,280',
    image: 'https://readdy.ai/api/search-image?query=A%20premium%20genuine%20leather%20dog%20collar%20in%20warm%20tan%20brown%20color%20with%20a%20small%20metal%20QR%20code%20plate%20attached%2C%20photographed%20on%20white%20marble%20surface%20with%20soft%20natural%20side%20lighting%2C%20luxury%20pet%20accessory%20product%20photo%2C%20clean%20minimal%20background%2C%20professional%20e-commerce%20style&width=800&height=800&seq=pawtag-collar-001&orientation=squarish',
    tags: ['🪡 本革', '🔖 QRプレート', '💧 防水'],
  },
  {
    id: 'silicone-tag',
    name: 'LIEN シリコンタグ',
    subtitle: '軽量・カラフル / 子犬・小型犬向け',
    price: '¥1,280',
    image: 'https://readdy.ai/api/search-image?query=A%20set%20of%20colorful%20soft%20silicone%20pet%20ID%20tags%20in%20pastel%20pink%2C%20mint%20green%2C%20and%20sky%20blue%20colors%20with%20QR%20code%20engraved%20on%20surface%2C%20arranged%20on%20a%20clean%20white%20background%20with%20soft%20diffused%20lighting%2C%20cute%20and%20modern%20pet%20accessory%20product%20photography%2C%20minimalist%20style&width=800&height=800&seq=pawtag-silicone-001&orientation=squarish',
    tags: ['🌈 カラフル', '🪶 超軽量', '🐶 小型犬向け'],
  },
];

function StoreContent() {
  const [cartToast, setCartToast] = useState<{ name: string } | null>(null);

  const handleAddToCart = (product: { name: string }) => {
    setCartToast({ name: product.name });
    setTimeout(() => setCartToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pb-28">
      <StoreHeader />

      <div className="px-4 pt-5 pb-4">
        <p className="text-sm text-gray-500">全 {products.length} 商品</p>
      </div>

      <div className="px-4 grid grid-cols-2 gap-4" data-product-shop>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      <div className="mx-4 mt-8 rounded-3xl overflow-hidden">
        <div
          className="relative w-full h-40 flex flex-col items-center justify-center text-center px-6"
          style={{
            backgroundImage: "url('https://readdy.ai/api/search-image?query=A%20warm%20cozy%20scene%20of%20a%20happy%20golden%20retriever%20dog%20sitting%20outdoors%20in%20soft%20sunlight%20with%20blurred%20green%20nature%20background%2C%20joyful%20and%20heartwarming%20mood%2C%20soft%20pastel%20tones%2C%20professional%20lifestyle%20pet%20photography&width=800&height=320&seq=pawtag-banner-001&orientation=landscape')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <div className="relative z-10">
            <p className="text-white font-bold text-lg leading-snug">大切な家族を守る</p>
            <p className="text-white/80 text-sm mt-1">LIENで、いつでも安心を。</p>
          </div>
        </div>
      </div>

      {cartToast && (
        <CartToast productName={cartToast.name} onClose={() => setCartToast(null)} />
      )}
    </div>
  );
}

export default function StorePage() {
  return <StoreContent />;
}
