'use client';

import Link from 'next/link';

interface PetHeroProps {
  isEmergencyMode: boolean;
  petData?: any;
}

export default function PetHero({ isEmergencyMode, petData }: PetHeroProps) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* プレミアムグラデーション背景 */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isEmergencyMode 
            ? 'bg-gradient-to-b from-[#4d1010] to-[#2d1a14]' 
            : 'bg-gradient-to-b from-[#fbf0f0] via-[#edc2c2]/30 to-[#fdf8f8]'
        }`}
      />
      
      {/* 背景の装飾的な要素 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#edc2c2]/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-20 left-0 w-32 h-32 bg-[#e8836a]/10 rounded-full blur-2xl -ml-10"></div>

      <div className="relative flex flex-col items-center pt-12 pb-10 px-6">
        {/* 緊急バナー - より洗練されたデザイン */}
        {isEmergencyMode && (
          <div className="mb-8 scale-110 animate-bounce cursor-default">
            <div className="bg-red-600 text-white font-black text-xs px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center gap-2 border border-red-400/30 tracking-[0.1em] uppercase">
              <i className="ri-alarm-warning-fill text-yellow-300"></i>
              SOS: Emergency Mode Active
            </div>
          </div>
        )}

        {/* モダンな角丸長方形（SQ形状）のペット写真 */}
        <div className="relative group">
          {/* 装飾用フレーム */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#e8836a] to-[#f9d5c8] rounded-[40px] opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></div>
          
          <div
            className={`relative w-44 h-44 rounded-[36px] border-[3px] overflow-hidden shadow-[0_20px_40px_-10px_rgba(77,42,32,0.2)] transition-all duration-700 transform hover:scale-105 ${
              isEmergencyMode ? 'border-red-500 rotate-1' : 'border-white rotate-[-1deg]'
            }`}
          >
            <img
              src={petData?.image_url || "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400&h=240"}
              alt={petData?.name || "Pet"}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=400&h=240";
              }}
            />
          </div>
          
          {/* クオリティの高いオーバーアイコン */}
          <div className="absolute -bottom-2 -right-2 bg-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-gray-50 transform rotate-12">
            <i className="ri-heart-3-fill text-[#e8836a] text-xl"></i>
          </div>
        </div>

        {/* 強化されたタイポグラフィ */}
        <div className="mt-8 text-center space-y-1">
          <h2 className="text-3xl font-black text-[#4d2a20] tracking-tight">
            {petData?.name || "未登録"}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-bold text-[#a16565] tracking-[0.2em] uppercase bg-white/60 px-3 py-1 rounded-full border border-[#f5e0e0]">
              {petData?.breed || "犬種未登録"}
            </span>
            <span className="text-[10px] font-medium text-[#874e4e]/60 tracking-widest">
              / {petData?.age_text || "年齢未登録"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Link href="/profile" className="group">
            <div className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-white/80 border border-[#f5e0e0] text-xs font-bold text-[#4d2a20] transition-all hover:bg-white hover:scale-105 shadow-md backdrop-blur-md">
              <i className="ri-edit-2-line text-sm opacity-70 group-hover:opacity-100"></i>
              プロフィール編集
            </div>
          </Link>
          <div className="w-10 h-10 rounded-full bg-white/80 border border-[#f5e0e0] transition-all hover:bg-white flex items-center justify-center shadow-md cursor-pointer text-[#4d2a20]">
            <i className="ri-share-forward-line text-lg"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
