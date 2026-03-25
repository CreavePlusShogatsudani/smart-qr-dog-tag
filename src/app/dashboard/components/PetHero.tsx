'use client';

import Link from 'next/link';

interface PetHeroProps {
  isEmergencyMode: boolean;
  petData?: any;
}

export default function PetHero({ isEmergencyMode, petData }: PetHeroProps) {
  return (
    <div className={`relative w-full overflow-hidden transition-all duration-700 ${isEmergencyMode ? 'rounded-b-[40px] shadow-md mb-6' : ''}`}>
      {/* ヒーロー画像 (Edge-to-Edge) */}
      <div className="absolute inset-0">
        <img
          src={petData?.image_url || "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800&h=600"}
          alt={petData?.name || "Pet"}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800&h=600";
          }}
        />
        {/* テキストを読みやすくするためのグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5"></div>
        
        {/* 緊急時の赤いオーバーレイ */}
        {isEmergencyMode && (
          <div className="absolute inset-0 bg-red-600/40 mix-blend-multiply"></div>
        )}
      </div>

      <div className="relative min-h-[380px] flex flex-col justify-end pt-16 pb-8 px-6 text-white z-10 w-full">
        {/* 緊急バナー */}
        {isEmergencyMode && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-max animate-pulse cursor-default">
            <div className="bg-white text-red-600 font-extrabold text-xs px-6 py-2.5 rounded-full shadow-lg flex items-center gap-2 tracking-[0.15em] uppercase border border-red-100">
              <i className="ri-alarm-warning-fill text-lg"></i>
              SOS: 緊急モード
            </div>
          </div>
        )}

        {/* テキスト・ステータスエリア */}
        <div className="w-full">
          <h2 className="text-4xl font-black text-white tracking-tight drop-shadow-md mb-4 leading-tight">
            {petData?.name || "未登録"}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {petData?.gender === 'male' && (
              <span className="text-[10px] font-bold text-white tracking-[0.1em] uppercase bg-blue-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-400/50 flex items-center gap-1 shadow-sm">
                <i className="ri-men-line"></i> 男の子
              </span>
            )}
            {petData?.gender === 'female' && (
              <span className="text-[10px] font-bold text-white tracking-[0.1em] uppercase bg-pink-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-400/50 flex items-center gap-1 shadow-sm">
                <i className="ri-women-line"></i> 女の子
              </span>
            )}
            <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/30 shadow-sm">
              {petData?.breed || "犬種未登録"}
            </span>
            <span className="text-[11px] font-medium text-white/90 tracking-widest drop-shadow-sm ml-1 mt-1 sm:mt-0">
              / 🎂 {petData?.birthday || "-"} / {petData?.age_text || "年齢未登録"}
            </span>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex items-center gap-3 mt-8">
          <Link href="/profile" className="flex-1 group">
            <div className="flex items-center justify-center gap-2 w-full py-4 rounded-[20px] bg-white/25 backdrop-blur-md border border-white/40 text-sm font-bold text-white transition-all hover:bg-white/40 shadow-lg">
              <i className="ri-edit-2-line text-lg opacity-90 group-hover:opacity-100"></i>
              プロフィール編集
            </div>
          </Link>
          <div className="w-14 h-[56px] rounded-[20px] bg-white/25 backdrop-blur-md border border-white/40 transition-all hover:bg-white/40 flex items-center justify-center shadow-lg cursor-pointer text-white">
            <i className="ri-share-forward-line text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
