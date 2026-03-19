'use client';

import Link from 'next/link';

interface PetHeroProps {
  isEmergencyMode: boolean;
  petData?: any;
}

export default function PetHero({ isEmergencyMode, petData }: PetHeroProps) {
  return (
    <div className={`relative w-full overflow-hidden transition-all duration-700 ${isEmergencyMode ? 'rounded-b-[40px] shadow-md mb-6' : ''}`}>
      {/* プレミアムグラデーション背景 / または緊急時のソリッドな赤背景 */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isEmergencyMode 
            ? 'bg-red-600' 
            : 'bg-gradient-to-b from-[#fbf0f0] via-[#edc2c2]/30 to-[#fdf8f8]'
        }`}
      />
      
      {/* 背景の装飾的な要素 */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-20 -mt-20 ${isEmergencyMode ? 'bg-white/10' : 'bg-[#edc2c2]/20'}`}></div>
      <div className={`absolute bottom-20 left-0 w-32 h-32 rounded-full blur-2xl -ml-10 ${isEmergencyMode ? 'bg-black/10' : 'bg-[#e8836a]/10'}`}></div>

      <div className="relative flex flex-col items-center pt-12 pb-12 px-6">
        {/* 緊急バナー - シンプルで視認性の高いデザイン */}
        {isEmergencyMode && (
          <div className="mb-8 animate-pulse cursor-default">
            <div className="bg-white text-red-600 font-extrabold text-xs px-7 py-3 rounded-full shadow-lg flex items-center gap-2 tracking-[0.15em] uppercase">
              <i className="ri-alarm-warning-fill text-xl text-red-500"></i>
              SOS: 緊急モード作動中
            </div>
          </div>
        )}

        {/* モダンな角丸長方形（SQ形状）のペット写真（傾きなし） */}
        <div className="relative group">
          {/* 装飾用フレーム */}
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#e8836a] to-[#f9d5c8] rounded-[40px] opacity-30 blur-sm group-hover:opacity-50 transition-opacity"></div>
          
          <div
            className={`relative w-44 h-44 rounded-[36px] border-[4px] overflow-hidden transition-all duration-500 transform hover:scale-105 ${
              isEmergencyMode 
                ? 'border-white/90 shadow-[0_20px_50px_-5px_rgba(220,38,38,0.5)]' 
                : 'border-white shadow-[0_20px_40px_-5px_rgba(0,0,0,0.15)]'
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
