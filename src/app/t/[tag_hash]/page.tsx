import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

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
  const isLost = pet.is_lost || previewMode;
  const owner = pet.owner;
  const medical = pet.medicalRecords[0];
  const rabies = pet.vaccineRecords.find(r => r.rabies_date);
  const mixed = pet.vaccineRecords.find(r => r.mixed_date);

  return (
    <div className="min-h-screen bg-[#fdf8f8] pb-12">
      {/* 緊急モードパブリックビュー */}
      {isLost ? (
        <div className="bg-red-600 text-white px-4 py-6 text-center shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="ri-alarm-warning-fill text-2xl animate-pulse"></i>
            <h1 className="text-xl font-black tracking-tight">迷子モード発動中</h1>
          </div>
          <p className="text-sm font-medium opacity-90">この子は現在迷子として登録されています。発見された方は、直ちに以下の連絡先までご連絡をお願いいたします。</p>
        </div>
      ) : (
        <div className="bg-teal-500 text-white px-4 py-8 text-center shadow-md">
          <h1 className="text-xl font-bold tracking-widest uppercase">LIEN Digital Tag</h1>
          <p className="text-xs mt-1 opacity-80">大切な家族を見守るスマートドッグタグ</p>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 mt-4">
        {/* メインカード */}
        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-100 mb-6">
          <div className="aspect-square w-full relative bg-gray-100 flex items-center justify-center">
             <img
              src={(pet as any).image_url || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800&h=800"}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8 text-center">
            <h2 className="text-3xl font-black text-gray-900 mb-1">{pet.name}</h2>
            <p className="text-teal-600 font-bold mb-6 tracking-widest uppercase text-xs">
              {pet.breed} ／ {pet.age_text}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">毛色</p>
                <p className="text-sm font-bold text-gray-700">{pet.color || "-"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">体重</p>
                <p className="text-sm font-bold text-gray-700">{pet.weight || "-"} kg</p>
              </div>
            </div>

            <div className="text-left bg-gray-50 p-6 rounded-3xl mb-8">
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">紹介文・性格</p>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                {pet.description || "この子の紹介文はまだありません。"}
              </p>
            </div>

            {/* ワクチン・医療情報（常に表示・迷子時はより強調） */}
            <div className="space-y-4 text-left">
              <div className={`${isLost ? 'bg-blue-50 border-blue-100' : 'bg-gray-50'} border rounded-3xl p-6`}>
                <h3 className="text-teal-700 font-black text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <i className="ri-shield-check-fill"></i>
                  ワクチン接種状況
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">狂犬病</p>
                    <p className="text-sm font-bold text-gray-900">{rabies ? '済' : '未登録'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">混合</p>
                    <p className="text-sm font-bold text-gray-900">{mixed ? '済' : '未登録'}</p>
                  </div>
                </div>
              </div>

              {medical && (
                <div className={`${isLost ? 'bg-orange-50 border-orange-100' : 'bg-gray-50'} border rounded-3xl p-6`}>
                  <h3 className="text-teal-700 font-black text-xs mb-4 flex items-center gap-2 uppercase tracking-widest">
                    <i className="ri-heart-pulse-fill"></i>
                    医療・特記事項
                  </h3>
                  <div className="space-y-4">
                    {medical.chronic_diseases && (
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">持病・既往症</p>
                        <p className="text-sm font-bold text-red-600">{medical.chronic_diseases}</p>
                      </div>
                    )}
                    {medical.special_notes && (
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">接し方の注意</p>
                        <p className="text-sm font-bold text-gray-800">{medical.special_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 飼い主への連絡先（迷子時のみ） */}
            {isLost && (
              <div className="mt-8 bg-red-50 border-2 border-red-100 p-6 rounded-[32px] text-left">
                <h3 className="text-red-600 font-black text-sm mb-4 flex items-center gap-2">
                  <i className="ri-phone-fill"></i>
                  飼い主への連絡先
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">お名前</p>
                    <p className="text-base font-bold text-gray-900">{owner.name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">電話番号</p>
                    <a href={`tel:${owner.phone}`} className="text-2xl font-black text-red-600 hover:opacity-70 transition-opacity">
                      {owner.phone}
                    </a>
                  </div>
                </div>
                <a href={`tel:${owner.phone}`} className="mt-6 w-full py-4 bg-red-600 text-white rounded-2xl font-black text-center block shadow-lg shadow-red-200">
                  今すぐ電話する
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-center px-8">
        <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] mb-4">POWERED BY LIEN</p>
        <Link href="/" className="inline-block py-2.5 px-6 rounded-full border border-gray-200 text-xs font-bold text-gray-500 hover:bg-white transition-colors">
          LIEN を詳しく知る
        </Link>
      </div>
    </div>
  );
}
