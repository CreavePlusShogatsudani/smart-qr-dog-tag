'use client';

import Link from 'next/link';

interface PetHeroProps {
  isEmergencyMode: boolean;
  petData?: any;
}

export default function PetHero({ isEmergencyMode, petData }: PetHeroProps) {
  return (
    <div className="relative w-full bg-white">
      <div className="flex flex-col items-center pt-8 pb-4 px-5">
        {/* Emergency banner */}
        {isEmergencyMode && (
          <div className="mb-4 bg-red-600/90 text-white font-bold text-base px-5 py-2 rounded-full shadow-lg flex items-center gap-2 whitespace-nowrap">
            <i className="ri-alarm-warning-fill text-yellow-300 text-lg"></i>
            緊急モードに切り替えました
          </div>
        )}

        {/* Large centered pet avatar */}
        <div
          className={`w-36 h-36 rounded-full border-4 overflow-hidden shadow-2xl flex-shrink-0 transition-all duration-500 ${
            isEmergencyMode ? 'border-red-500' : 'border-white'
          }`}
        >
          <img
            src={petData?.image_url || "https://readdy.ai/api/search-image?query=A%20cute%20golden%20retriever%20puppy%20face%20close-up%20portrait%2C%20fluffy%20fur%2C%20big%20brown%20eyes%2C%20happy%20expression%2C%20soft%20white%20background%2C%20professional%20pet%20photography%2C%20adorable%2C%20high%20resolution%2C%20square%20crop&width=200&height=200&seq=pet-avatar-circle-01&orientation=squarish"}
            alt={petData?.name || "Pet"}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="mt-3 text-center">
          <h2 className="text-2xl font-bold text-gray-800">{petData?.name || "未登録"}</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {petData?.breed || "犬種未登録"}・{petData?.age_text || "年齢未登録"}
          </p>
        </div>

        <div className="mt-3">
          <Link href="/profile">
            <div className="px-5 py-1.5 rounded-full border-2 border-gray-300 text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition whitespace-nowrap">
              編集
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
