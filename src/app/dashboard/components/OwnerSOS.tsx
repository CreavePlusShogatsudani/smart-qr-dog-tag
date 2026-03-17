'use client';

import Link from 'next/link';

interface OwnerSOSProps {
  ownerData?: any;
  tagHash?: string;
}

export default function OwnerSOS({ ownerData, tagHash }: OwnerSOSProps) {
  const displayItems = [
    { icon: 'ri-user-line', color: 'bg-white text-teal-600', label: '連絡先担当者', value: ownerData?.name || '未登録' },
    { icon: 'ri-phone-line', color: 'bg-white text-teal-600', label: '電話番号', value: ownerData?.phone || '未登録' },
    { icon: 'ri-map-pin-line', color: 'bg-white text-teal-600', label: '自宅住所', value: ownerData?.address || '未登録' },
  ];

  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 flex items-center justify-center bg-teal-600/30 rounded-xl">
          <i className="ri-contacts-book-line text-teal-900 text-lg"></i>
        </div>
        <h3 className="font-bold text-teal-950 text-base">緊急連絡先の設定</h3>
      </div>

      <div className="space-y-3">
        {displayItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl">
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${item.color}`}>
              <i className={`${item.icon} text-base`}></i>
            </div>
            <div>
              <p className="text-xs text-teal-800 font-medium">{item.label}</p>
              <p className="text-sm text-teal-950 font-semibold mt-0.5">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {tagHash ? (
          <Link href={`/t/${tagHash}`} className="py-2.5 rounded-2xl text-sm font-semibold text-center text-teal-950 bg-white/90 hover:bg-white transition-opacity cursor-pointer whitespace-nowrap shadow-sm border border-teal-100 flex items-center justify-center">
            🔍 表示を確認
          </Link>
        ) : (
          <div className="py-2.5 rounded-2xl text-sm font-semibold text-center text-teal-950/40 bg-white/50 cursor-not-allowed whitespace-nowrap shadow-sm border border-teal-100/50 flex items-center justify-center">
            🔍 表示を確認
          </div>
        )}
        <Link href="/profile" className="py-2.5 rounded-2xl text-sm font-semibold text-center text-teal-900 bg-white/70 hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center">
          ✏️ 登録情報を変更
        </Link>
      </div>
    </div>
  );
}
