'use client';

interface CartToastProps {
  productName: string;
  onClose: () => void;
}

export default function CartToast({ productName, onClose }: CartToastProps) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] bg-white rounded-3xl shadow-2xl px-8 py-10 text-center w-[300px]">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-full bg-emerald-100">
        <i className="ri-check-line text-4xl text-emerald-600"></i>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">カートに追加しました</h3>
      <p className="text-sm text-gray-500 mb-5">{productName}</p>
      <button
        onClick={onClose}
        className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm cursor-pointer hover:bg-gray-200 transition-all whitespace-nowrap"
      >
        閉じる
      </button>
    </div>
  );
}
