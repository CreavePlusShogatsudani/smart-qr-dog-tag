'use client';

import Link from 'next/link';

const actions = [
  { href: '/settings', icon: 'ri-notification-3-line', label: '通知設定', color: 'bg-white text-teal-600' },
  { href: '#', icon: 'ri-download-2-line', label: 'QRダウンロード', color: 'bg-white text-teal-600' },
  { href: '/help', icon: 'ri-question-line', label: 'ヘルプ', color: 'bg-white text-teal-600' },
  { href: '/profile', icon: 'ri-edit-line', label: 'プロフィール編集', color: 'bg-white text-teal-600' },
];

export default function QuickActions() {
  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 flex items-center justify-center bg-teal-600/30 rounded-xl">
          <i className="ri-apps-line text-teal-900 text-lg"></i>
        </div>
        <h3 className="font-bold text-teal-950 text-base">クイックアクション</h3>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((a, i) => (
          <Link key={i} href={a.href}>
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${a.color} group-hover:scale-105 transition-transform shadow-sm`}>
                <i className={`${a.icon} text-2xl`}></i>
              </div>
              <p className="text-xs text-teal-950 font-medium text-center leading-tight">{a.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
