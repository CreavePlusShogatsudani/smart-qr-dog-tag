import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import LocationButton from "./LocationButton";

export default async function TagPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ tag_hash: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { tag_hash } = await params;
  const sParams = await searchParams;
  const previewMode = sParams.preview === 'lost';

  const tag = await prisma.tag.findUnique({
    where: { tag_hash },
    include: {
      pet: {
        include: {
          owner: true,
          medicalRecords: true,
          vaccineRecords: {
            orderBy: { createdAt: 'desc' }
          },
        }
      }
    }
  });

  if (!tag || !tag.pet) {
    notFound();
  }

  const pet = tag.pet;
  const previewParam = sParams.preview;
  
  // URLパラメータで状態がプレビュー指定されていればそれを優先、なければDBの is_lost を参照
  const isLost = previewParam === 'lost' 
    ? true 
    : previewParam === 'normal' 
      ? false 
      : pet.is_lost;

  const owner = pet.owner;
  const medical = pet.medicalRecords[0];
  const rabies = pet.vaccineRecords.find(r => r.rabies_date);
  const mixed = pet.vaccineRecords.find(r => r.mixed_date);

  return (
    <div className={`min-h-screen pb-12 transition-all duration-700 ${isLost ? 'bg-[#fff5f5]' : 'bg-[#fdf8f8]'}`}>
      {/* 緊急/通常 トップナビゲーションバナー */}
      {isLost ? (
        <div className="bg-gradient-to-br from-rose-500 via-[#e05050] to-[#c03030] text-white px-6 py-10 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <i className="ri-alarm-warning-fill text-3xl animate-pulse text-rose-100"></i>
              <h1 className="text-2xl font-black tracking-widest uppercase text-white shadow-sm">Emergency</h1>
            </div>
            <p className="text-sm font-bold opacity-95 leading-relaxed">
              この子は現在、迷子として保護を求めています。<br/>発見された方は、直ちに飼い主へご連絡ください。
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-teal-500 to-teal-400 text-white px-6 py-10 text-center shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10 flex flex-col items-center">
            <i className="ri-shield-user-fill text-4xl text-teal-100 mb-2 shadow-sm"></i>
            <h1 className="text-xl font-black tracking-widest uppercase shadow-sm">LIEN Digital Tag</h1>
            <p className="text-[10px] mt-1 opacity-90 font-bold tracking-widest">大切な家族を見守るスマートドッグタグ</p>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 -mt-8 relative z-20">
        
        {/* === SOSメッセージ（緊急時のみ） === */}
        {isLost && owner.sos_message && (
          <div className="bg-white rounded-[24px] shadow-[0_10px_40px_-10px_rgba(225,29,72,0.3)] p-6 mb-6 border-l-[6px] border-rose-500 relative overflow-hidden">
            <i className="ri-message-3-fill absolute -bottom-4 -right-2 text-6xl text-rose-50 opacity-60"></i>
            <h3 className="text-rose-600 font-extrabold text-sm flex items-center gap-2 mb-3">
              <i className="ri-chat-heart-fill text-xl"></i>
              飼い主からのメッセージ
            </h3>
            <p className="text-gray-800 text-sm font-bold leading-relaxed whitespace-pre-wrap relative z-10 text-justify">
              {owner.sos_message}
            </p>
          </div>
        )}

        {/* === 位置情報送信ボタン（緊急時のみ） === */}
        {isLost && (
          <LocationButton />
        )}

        {/* === メインプロフィールカード === */}
        <div className="bg-white rounded-[36px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-[#f5e0e0] mb-6">
          <div className="p-6 pb-0 flex flex-col items-center">
            {/* 角丸長方形（スクワークル）画像 */}
            <div className="w-48 h-48 rounded-[40px] overflow-hidden shadow-xl border-[5px] border-white relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
              <img
                src={(pet as any).image_url || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800&h=800"}
                alt={pet.name}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
          
          <div className="p-8 text-center pt-6">
            <h2 className="text-4xl font-black text-[#4d2a20] mb-3 tracking-tight">{pet.name}</h2>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-[10px] font-bold text-[#a16565] tracking-[0.2em] uppercase bg-[#fdf8f8] px-4 py-1.5 rounded-full border border-[#f5e0e0]">
                {pet.breed || "犬種未登録"}
              </span>
              <span className="text-xs font-bold text-[#874e4e]/70 tracking-widest">
                / {pet.age_text || "年齢未登録"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-[#fdf8f8] p-4 rounded-[20px] border border-[#f5e0e0]/50 transition-colors hover:bg-white">
                <p className="text-[10px] text-[#a16565] font-extrabold uppercase mb-1">毛色</p>
                <p className="text-sm font-bold text-[#4d2a20]">{pet.color || "-"}</p>
              </div>
              <div className="bg-[#fdf8f8] p-4 rounded-[20px] border border-[#f5e0e0]/50 transition-colors hover:bg-white">
                <p className="text-[10px] text-[#a16565] font-extrabold uppercase mb-1">体重</p>
                <p className="text-sm font-bold text-[#4d2a20]">{pet.weight || "-"} kg</p>
              </div>
            </div>

            <div className="text-left bg-gradient-to-b from-[#fdf8f8] to-white p-6 rounded-[24px] mb-8 border border-[#f5e0e0]">
              <p className="text-[10px] text-[#a16565] font-extrabold uppercase mb-2 flex items-center gap-1.5">
                <i className="ri-book-read-fill text-sm"></i> 紹介文・性格
              </p>
              <p className="text-sm text-[#4d2a20] leading-relaxed font-bold">
                {pet.description || "この子の紹介文はまだありません。"}
              </p>
            </div>

            {/* ワクチン・医療情報（常に表示・迷子時はより強調） */}
            <div className="space-y-4 text-left">
              <div className={`${isLost ? 'bg-blue-50/50 border-blue-100' : 'bg-[#fdf8f8] border-[#f5e0e0]'} border rounded-[24px] p-6`}>
                <h3 className="text-teal-700 font-black text-[11px] mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <i className="ri-shield-check-fill text-lg"></i>
                  ワクチン接種状況
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-extrabold uppercase mb-1">狂犬病</p>
                    <p className={`text-sm font-bold ${rabies ? 'text-[#4d2a20]' : 'text-gray-400'}`}>{rabies ? '済' : '未登録'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-extrabold uppercase mb-1">混合</p>
                    <p className={`text-sm font-bold ${mixed ? 'text-[#4d2a20]' : 'text-gray-400'}`}>{mixed ? '済' : '未登録'}</p>
                  </div>
                </div>
              </div>

              {medical && (
                <div className={`${isLost ? 'bg-orange-50/80 border-orange-200' : 'bg-orange-50/40 border-orange-100'} border rounded-[24px] p-6`}>
                  <h3 className="text-orange-700 font-black text-[11px] mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <i className="ri-heart-pulse-fill text-lg"></i>
                    医療・特記事項
                  </h3>
                  <div className="space-y-4">
                    {medical.chronic_diseases && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-extrabold uppercase mb-1">持病・既往症</p>
                        <p className="text-sm font-bold text-red-600 leading-relaxed">{medical.chronic_diseases}</p>
                      </div>
                    )}
                    {medical.special_notes && (
                      <div>
                        <p className="text-[10px] text-gray-500 font-extrabold uppercase mb-1">接し方の注意</p>
                        <p className="text-sm font-bold text-[#4d2a20] leading-relaxed">{medical.special_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 飼い主への連絡先（迷子時のみ） */}
            {isLost && (
              <div className="mt-8 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 p-7 rounded-[32px] text-left shadow-sm">
                <h3 className="text-red-700 font-black text-sm mb-5 flex items-center gap-2">
                  <i className="ri-phone-fill text-xl bg-red-100 p-1.5 rounded-full"></i>
                  飼い主への連絡先
                </h3>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] text-red-500 font-extrabold uppercase mb-1">お名前</p>
                    <p className="text-lg font-black text-gray-900">{owner.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-red-500 font-extrabold uppercase mb-1">電話番号</p>
                    <a href={`tel:${owner.phone}`} className="text-3xl font-black text-red-600 hover:opacity-70 transition-opacity tracking-tight">
                      {owner.phone}
                    </a>
                  </div>
                </div>
                <a href={`tel:${owner.phone}`} className="mt-8 w-full py-5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-[20px] font-black text-base text-center block shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:shadow-[0_10px_40px_rgba(225,29,72,0.6)] transform hover:-translate-y-1 transition-all">
                  今すぐ電話機能を開く
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center px-8">
        <p className="text-[#a16565] text-[10px] font-extrabold tracking-[0.2em] mb-4">POWERED BY LIEN</p>
        <Link href="/" className="inline-block py-3 px-8 rounded-full border border-[#f5e0e0] text-xs font-bold text-[#874e4e] hover:bg-white transition-colors shadow-sm">
          LIEN を詳しく知る
        </Link>
      </div>
    </div>
  );
}
