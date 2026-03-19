'use client';

import { useState } from 'react';

interface QRDisplayProps {
  tagHash?: string;
}

export default function QRDisplay({ tagHash }: QRDisplayProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!tagHash) return null;

  const qrUrl = `https://smart-qr-dog-tag.vercel.app/t/${tagHash}`;
  const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrUrl)}&margin=20`;

  const handleDownloadQR = () => {
    setIsDownloading(true);
    
    // ダウンロードを開始するため、自前のAPI Routeへ遷移させる（同一起源）
    // Content-Disposition により画面遷移せず直接ファイル保存ダイアログが開かれます
    const downloadApiUrl = `/api/download-qr?tagHash=${tagHash}&data=${encodeURIComponent(qrUrl)}`;
    
    // aタグを生成してクリックさせる（同一起源なら確実）
    const link = document.createElement('a');
    link.href = downloadApiUrl;
    link.download = `LIEN_QR_TAG_${tagHash.slice(0, 8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // すぐにボタンの状態を戻す
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-lg border-t-4 border-teal-500" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
      <div className="flex flex-col items-center mb-6 text-center">
        <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2 mb-2">
          <i className="ri-qr-code-line text-teal-500 text-2xl"></i>
          専用QRコード
        </h2>
        <p className="text-xs text-gray-500 leading-relaxed max-w-[250px]">
          あなたのペット専用のQRコードです。画像として保存し、オリジナルグッズ等に印刷してご活用ください。
        </p>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-white p-2 border-2 border-gray-100 rounded-2xl shadow-sm">
          <img 
            src={apiUrl} 
            alt="My QR Code" 
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      <button
        onClick={handleDownloadQR}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold text-white bg-teal-500 hover:bg-teal-600 transition shadow-[0_4px_20px_rgba(20,184,166,0.25)] disabled:bg-gray-400 disabled:shadow-none"
      >
        {isDownloading ? (
          <>
            <i className="ri-loader-4-line animate-spin text-lg"></i>
            ダウンロード中...
          </>
        ) : (
          <>
            <i className="ri-download-cloud-2-line text-lg"></i>
            QRコード画像を保存する
          </>
        )}
      </button>
    </div>
  );
}
