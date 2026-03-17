'use client';

import { useState } from 'react';

export default function VariantSelector() {
  const [selectedVariant, setSelectedVariant] = useState('brass');

  const variants = [
    { id: 'brass', label: '真鍮（ブラス）', icon: 'ri-medal-line' },
    { id: 'acrylic', label: 'アクリル', icon: 'ri-star-line' },
  ];

  return (
    <div className="py-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">素材を選択</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setSelectedVariant(variant.id)}
            className={`flex flex-col items-center gap-2 px-6 py-5 rounded-2xl border-2 transition-all cursor-pointer min-h-[80px] ${
              selectedVariant === variant.id
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <i className={`${variant.icon} text-3xl ${selectedVariant === variant.id ? 'text-teal-600' : 'text-gray-600'}`}></i>
            </div>
            <span className={`text-base font-semibold whitespace-nowrap ${
              selectedVariant === variant.id ? 'text-teal-900' : 'text-gray-700'
            }`}>
              {variant.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}