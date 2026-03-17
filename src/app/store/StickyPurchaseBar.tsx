'use client';

import { useState } from 'react';

export default function StickyPurchaseBar() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all cursor-pointer whitespace-nowrap shadow-lg hover:shadow-xl active:scale-[0.98]"
          style={{ backgroundColor: '#E07A5F' }}
        >
          <span className="flex items-center justify-center gap-2">
            <i className="ri-shopping-cart-line text-2xl"></i>
            カートに入れる
          </span>
        </button>
      </div>

      {showSuccess && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white rounded-3xl shadow-2xl px-8 py-10 text-center max-w-sm mx-4">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-emerald-100">
            <i className="ri-check-line text-4xl text-emerald-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">カートに追加しました</h3>
          <p className="text-sm text-gray-600">お買い物を続けるか、カートで確認できます</p>
        </div>
      )}
    </>
  );
}