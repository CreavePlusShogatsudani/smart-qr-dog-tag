'use client';

import { useState, useEffect } from 'react';

interface RecommendCardProps {
  petData?: any;
}

export default function RecommendCard({ petData }: RecommendCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const petName = petData?.name || 'この子';
  const petBreed = petData?.breed || 'ワンちゃん';

  const items = [
    {
      img: 'https://readdy.ai/api/search-image?query=A%20golden%20retriever%20dog%20gently%20walking%20on%20a%20soft%20grassy%20path%20in%20warm%20afternoon%20sunlight%2C%20peaceful%20and%20healthy%20lifestyle%2C%20shallow%20depth%20of%20field%2C%20warm%20tones%2C%20professional%20pet%20photography%2C%20no%20text&width=400&height=240&seq=concierge-joint-01&orientation=landscape',
      category: '健康アドバイス',
      title: '健やかな毎日のための関節ケア',
      desc: `${petName}の元気な歩みを、今からしっかりサポート。`,
      pr: true,
    },
    {
      img: 'https://readdy.ai/api/search-image?query=A%20happy%20golden%20retriever%20dog%20eating%20from%20a%20clean%20ceramic%20bowl%2C%20natural%20light%20kitchen%20setting%2C%20healthy%20meal%2C%20warm%20cozy%20atmosphere%2C%20professional%20lifestyle%20pet%20photography%2C%20no%20text&width=400&height=240&seq=concierge-food-02&orientation=landscape',
      category: '栄養ガイド',
      title: '最適な食事バランスとは？',
      desc: `${petBreed}に合った理想的な栄養素を専門家が解説。`,
      pr: false,
    },
    {
      img: 'https://readdy.ai/api/search-image?query=A%20veterinarian%20gently%20examining%20a%20golden%20retriever%20dog%20in%20a%20bright%20clean%20clinic%2C%20caring%20and%20professional%20atmosphere%2C%20soft%20natural%20light%2C%20warm%20tones%2C%20no%20text&width=400&height=240&seq=concierge-vet-03&orientation=landscape',
      category: '定期検診',
      title: '年1回の健康診断チェックリスト',
      desc: '健康な時間を長く過ごすための、見落としがちな検査項目。',
      pr: true,
    },
  ];

  if (!mounted) return null;

  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-teal-600/30">
          <i className="ri-sparkling-2-line text-teal-900 text-base"></i>
        </div>
        <h3 className="font-bold text-teal-950 text-base">AIコンシェルジュからのご提案</h3>
      </div>
      <p className="text-xs text-teal-800 mb-4 pl-9">{petData?.name || '愛犬'}の情報をもとにパーソナライズされています</p>

      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-56 bg-white/90 rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img src={item.img} alt={item.title} className="w-full h-32 object-cover object-top" />
              <span className="absolute top-2 left-2 text-xs font-semibold bg-white/80 text-teal-600 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {item.category}
              </span>
              {item.pr && (
                <span className="absolute top-2 right-2 text-xs font-medium bg-black/30 text-white/80 px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                  PR
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-teal-950 leading-snug">{item.title}</p>
              <p className="text-xs text-teal-800 mt-1 leading-relaxed">{item.desc}</p>
              <div className="flex items-center gap-1 mt-2 text-teal-600">
                <span className="text-xs font-semibold">詳しく見る</span>
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-right-s-line text-sm"></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
