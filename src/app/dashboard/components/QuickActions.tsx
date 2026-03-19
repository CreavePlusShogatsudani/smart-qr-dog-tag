'use client';

import Link from 'next/link';

interface QuickActionsProps {
  tagHash?: string;
}

export default function QuickActions({ tagHash }: QuickActionsProps) {
  const handleDownloadQR = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!tagHash) {
      alert("QRコード情報が見つかりません。");
      return;
    }

    const qrUrl = `https://smart-qr-dog-tag.vercel.app/t/${tagHash}`;
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}&margin=20`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `LIEN_QR_TAG_${tagHash.slice(0, 8)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("QRコードのダウンロードに失敗しました", error);
      alert("ダウンロードに失敗しました。時間をおいて再度お試しください。");
    }
  };

  const actions = [
    { href: '/settings', icon: 'ri-notification-3-line', label: '通知設定', color: 'bg-white text-teal-600' },
    { href: '#', icon: 'ri-download-2-line', label: 'QRダウンロード', color: 'bg-white text-teal-600', onClick: handleDownloadQR },
    { href: '/help', icon: 'ri-question-line', label: 'ヘルプ', color: 'bg-white text-teal-600' },
    { href: '/profile', icon: 'ri-edit-line', label: 'プロフィール編集', color: 'bg-white text-teal-600' },
  ];

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
          <a key={i} href={a.href} onClick={a.onClick} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl ${a.color} group-hover:scale-105 transition-transform shadow-sm`}>
              <i className={`${a.icon} text-2xl`}></i>
            </div>
            <p className="text-xs text-teal-950 font-medium text-center leading-tight">{a.label}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

