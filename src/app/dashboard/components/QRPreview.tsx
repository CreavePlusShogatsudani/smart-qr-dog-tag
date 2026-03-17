'use client';

import Link from 'next/link';

interface QRPreviewProps {
  tagHash?: string;
}

export default function QRPreview({ tagHash }: QRPreviewProps) {
  if (!tagHash) return null;

  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 flex items-center justify-center bg-teal-600/30 rounded-xl">
          <i className="ri-qr-code-line text-teal-900 text-lg"></i>
        </div>
        <h3 className="font-bold text-teal-950 text-base">公開ページのプレビュー</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/t/${tagHash}`}>
          <div className="bg-white/90 rounded-2xl p-4 border border-teal-300 hover:border-teal-400 transition-all cursor-pointer h-full">
            <div className="w-full aspect-square bg-teal-50 rounded-xl mb-3 flex items-center justify-center shadow-sm">
              <i className="ri-layout-grid-line text-4xl text-teal-600"></i>
            </div>
            <p className="text-center font-bold text-teal-950 text-sm">通常表示を確認</p>
            <p className="text-xs text-center text-teal-800 mt-0.5">登録内容のプレビュー</p>
          </div>
        </Link>
        <Link href={`/t/${tagHash}?preview=lost`}>
          <div className="bg-white rounded-2xl p-4 border border-teal-300 hover:border-teal-400 transition-all cursor-pointer h-full">
            <div className="w-full aspect-square bg-red-50 rounded-xl mb-3 flex items-center justify-center shadow-sm">
              <i className="ri-alarm-warning-line text-4xl text-red-500"></i>
            </div>
            <p className="text-center font-bold text-teal-950 text-sm">迷子時の表示</p>
            <p className="text-xs text-center text-teal-800 mt-0.5">緊急情報のプレビュー</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
