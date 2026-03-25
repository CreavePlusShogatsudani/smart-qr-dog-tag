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
    <div className="min-h-screen pb-12 bg-[#fdf8f8]">
      {/* 緊急/通常 トップナビゲーションバナー */}
      {isLost ? (
        <div className="bg-red-600 text-white px-6 py-10 text-center shadow-md relative overflow-hidden rounded-b-[40px] mb-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="mb-4 cursor-default inline-block">
              <div className="bg-white text-red-600 font-extrabold text-xs px-7 py-3 rounded-full shadow-lg flex items-center gap-2 tracking-[0.15em] uppercase mx-auto w-max">
                <i className="ri-alarm-warning-fill text-xl text-red-500"></i>
                SOS: 緊急モード作動中
              </div>
            </div>
            <p className="text-sm font-bold opacity-95 leading-relaxed text-white/90">
              この子は現在、迷子として保護を求めています。<br/>発見された方は、直ちに飼い主へご連絡ください。
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#fbf0f0] via-[#edc2c2]/30 to-[#fdf8f8] text-[#4d2a20] px-6 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 flex flex-col items-center">
            <i className="ri-shield-user-fill text-4xl text-[#a16565] mb-2 drop-shadow-sm"></i>
            <h1 className="text-xl font-black tracking-widest uppercase">LIEN Digital Tag</h1>
            <p className="text-[10px] mt-1 opacity-80 font-bold tracking-widest text-[#874e4e]">大切な家族を見守るスマートドッグタグ</p>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 -mt-8 relative z-20">
        
        {/* === SOSメッセージ（緊急時のみ） === */}
        {isLost && owner.sos_message && (
          <div className="bg-white rounded-[24px] shadow-sm p-6 mb-6 border-l-[4px] border-red-500 relative overflow-hidden">
            <i className="ri-message-3-fill absolute -bottom-4 -right-2 text-6xl text-red-50 opacity-60"></i>
            <h3 className="text-red-600 font-extrabold text-sm flex items-center gap-2 mb-3">
              <i className="ri-chat-heart-fill text-xl"></i>
              飼い主からのメッセージ
            </h3>
            <p className="text-gray-800 text-sm font-bold leading-relaxed whitespace-pre-wrap relative z-10 text-justify">
              {owner.sos_message}
            </p>
          </div>
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
            
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {pet?.gender === 'male' && (
                <span className="text-[10px] font-bold text-blue-600 tracking-[0.1em] uppercase bg-[#f0f4ff] px-3 py-1.5 rounded-full border border-blue-100 flex items-center gap-1">
                  <i className="ri-men-line text-sm"></i> 男の子
                </span>
              )}
              {pet?.gender === 'female' && (
                <span className="text-[10px] font-bold text-pink-600 tracking-[0.1em] uppercase bg-[#fff0f4] px-3 py-1.5 rounded-full border border-pink-100 flex items-center gap-1">
                  <i className="ri-women-line text-sm"></i> 女の子
                </span>
              )}
              <span className="text-[10px] font-bold text-[#a16565] tracking-[0.2em] uppercase bg-[#fdf8f8] px-4 py-1.5 rounded-full border border-[#f5e0e0]">
                {pet.breed || "犬種未登録"}
              </span>
              <span className="text-xs font-bold text-[#874e4e]/70 tracking-widest">
                / 🎂 {pet.birthday || "-"} / {pet.age_text || "年齢未登録"}
              </span>
            </div>

            {/* Instagram リンク */}
            {pet.instagram_id && (
              <div className="mb-8">
                <a 
                  href={`https://instagram.com/${pet.instagram_id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
                >
                  <i className="ri-instagram-line text-lg"></i>
                  @{pet.instagram_id}
                </a>
              </div>
            )}
            
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
              <div className="bg-[#fdf8f8] border border-[#f5e0e0] rounded-[24px] p-6">
                <h3 className="text-[#a16565] font-black text-[11px] mb-4 flex items-center gap-2 uppercase tracking-widest">
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
                <div className="bg-[#fdf8f8] border border-[#f5e0e0] rounded-[24px] p-6">
                  <h3 className="text-[#a16565] font-black text-[11px] mb-4 flex items-center gap-2 uppercase tracking-widest">
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
                    {(medical.vet_clinic_name || medical.vet_clinic_phone || medical.vet_clinic_address) && (
                      <div className="pt-2 mt-2 border-t border-[#f5e0e0]">
                        <p className="text-[10px] text-teal-600 font-black uppercase mb-2 flex items-center gap-1">
                          <i className="ri-hospital-fill"></i> かかりつけ病院
                        </p>
                        {medical.vet_clinic_name && (
                          <p className="text-sm font-bold text-[#4d2a20] mb-1">{medical.vet_clinic_name}</p>
                        )}
                        {medical.vet_clinic_phone && (
                          <a href={`tel:${medical.vet_clinic_phone}`} className="text-sm font-bold text-teal-600 hover:opacity-70 flex items-center gap-1.5 mb-1.5">
                            <i className="ri-phone-fill"></i> {medical.vet_clinic_phone}
                          </a>
                        )}
                        {medical.vet_clinic_address && (
                          <p className="text-xs font-bold text-[#874e4e] flex items-start gap-1.5">
                            <i className="ri-map-pin-fill mt-0.5 shrink-0"></i> 
                            <span className="leading-tight">{medical.vet_clinic_address}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 飼い主への連絡先・アクションエリア（迷子時のみ） */}
            {isLost && (
              <div className="mt-8 bg-white border-2 border-red-500 p-7 rounded-[32px] text-left shadow-sm">
                <h3 className="text-red-700 font-black text-sm mb-5 flex items-center gap-2">
                  <i className="ri-phone-fill text-xl bg-red-100 p-1.5 rounded-full"></i>
                  発見時の連絡先・アクション
                </h3>
                <div className="space-y-5 mb-8">
                  <div>
                    <p className="text-[10px] text-red-500 font-extrabold uppercase mb-1">お名前</p>
                    <p className="text-lg font-black text-gray-900">{owner.sos_contact_name || owner.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-red-500 font-extrabold uppercase mb-1">電話番号</p>
                    <a href={`tel:${owner.sos_contact_phone || owner.phone}`} className="text-3xl font-black text-red-600 hover:opacity-70 transition-opacity tracking-tight">
                      {owner.sos_contact_phone || owner.phone}
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <a href={`tel:${owner.sos_contact_phone || owner.phone}`} className="w-full py-4 bg-red-600 text-white rounded-[20px] font-black text-base text-center flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] transform hover:-translate-y-1 transition-all">
                    <i className="ri-phone-line text-xl"></i>
                    今すぐ電話機能を開く
                  </a>
                  
                  <LocationButton />
                </div>
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
