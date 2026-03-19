'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { saveProfile, deletePet } from '@/app/actions/profile';

type ProfileClientProps = {
  initialData: any;
};

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  
  const isNew = searchParams.get('new') === 'true';
  const targetPetId = searchParams.get('pet');
  
  const pets = initialData?.pets || [];
  
  const activePet = useMemo(() => {
    if (isNew) return null;
    if (targetPetId) return pets.find((p: any) => p.id === targetPetId) || pets[0];
    return pets[0];
  }, [isNew, targetPetId, pets]);

  const pet = activePet || {};
  const medical = pet?.medicalRecords?.[0] || {};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      await saveProfile(formData);
      setMessage('保存しました');
    } catch (err) {
      console.error(err);
      setMessage('エラーが発生しました');
      } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!pet.id) return;
    if (window.confirm(`${pet.name || 'このペット'} の情報を完全に削除しますか？この操作は取り消せません。`)) {
      try {
        await deletePet(pet.id);
        alert('削除しました');
        router.push('/dashboard');
        router.refresh(); // 強制更新
      } catch (err) {
        console.error(err);
        alert('削除に失敗しました');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* ペット切り替えタブ */}
      <div className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex items-center gap-3 overflow-x-auto hide-scrollbar snap-x">
        {pets.map((p: any) => (
          <button
            key={p.id}
            type="button"
            onClick={() => router.push(`/profile?pet=${p.id}`)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-sm snap-start shrink-0 ${
              !isNew && pet.id === p.id 
                ? 'bg-teal-600 text-white font-bold ring-2 ring-teal-600 ring-offset-2 ring-offset-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {p.image_url ? (
              <img src={p.image_url} alt={p.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                <i className={`ri-${p.species === 'CAT' ? 'cat' : 'gitlab'}-fill text-xs text-gray-400`}></i>
              </div>
            )}
            <span className="text-sm">{p.name || '名前なし'}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => router.push('/profile?new=true')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-sm snap-start shrink-0 ${
            isNew 
              ? 'bg-orange-500 text-white font-bold ring-2 ring-orange-500 ring-offset-2 ring-offset-white' 
              : 'bg-white text-gray-400 border border-dashed border-gray-300 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-50'
          }`}
        >
          <i className="ri-add-line text-lg"></i>
          <span className="text-sm">新しく追加</span>
        </button>
      </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 1. ペット情報 (通常表示) */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg border-t-4 border-teal-400" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-baidu-line text-teal-500 text-lg"></i>
                  ペットの基本情報
              </h2>
              <span className="bg-teal-50 text-teal-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">通常表示</span>
          </div>
          <p className="text-[11px] text-gray-400 mb-6 leading-relaxed">
              タグをスキャンした際に、誰にでも表示されるペットのプロフィールです。
          </p>
          
          <div className="space-y-4">
              <input type="hidden" name="petId" value={pet?.id || ''} />
              <input type="hidden" name="currentImageUrl" value={pet?.image_url || ''} />
              
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-teal-50 overflow-hidden shadow-inner bg-gray-100 relative mb-3 group">
                  <img 
                    src={previewUrl || pet?.image_url || "https://readdy.ai/api/search-image?query=pet%20placeholder&width=200&height=200"} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold">
                    写真を変更
                    <input type="file" name="petImage" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest cursor-pointer hover:text-teal-500" onClick={() => (document.querySelector('input[name="petImage"]') as any)?.click()}>画像をタップして変更</p>
              </div>

              <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-700 mb-2">性別</label>
                  <div className="flex gap-3">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="gender" value="male" defaultChecked={pet?.gender === 'male'} className="peer sr-only" />
                      <div className="text-center py-2.5 rounded-xl border border-gray-200 peer-checked:border-blue-400 peer-checked:bg-blue-50 text-gray-400 peer-checked:text-blue-600 font-bold text-sm transition-all flex items-center justify-center gap-1">
                        <i className="ri-men-line text-base"></i>男の子
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="gender" value="female" defaultChecked={pet?.gender === 'female'} className="peer sr-only" />
                      <div className="text-center py-2.5 rounded-xl border border-gray-200 peer-checked:border-pink-400 peer-checked:bg-pink-50 text-gray-400 peer-checked:text-pink-600 font-bold text-sm transition-all flex items-center justify-center gap-1">
                        <i className="ri-women-line text-base"></i>女の子
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" name="gender" value="" defaultChecked={!pet?.gender} className="peer sr-only" />
                      <div className="text-center py-2.5 rounded-xl border border-gray-200 peer-checked:border-gray-400 peer-checked:bg-gray-100 text-gray-400 peer-checked:text-gray-700 font-bold text-sm transition-all">
                        未設定
                      </div>
                    </label>
                  </div>
              </div>

              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">名前</label>
                  <input name="petName" type="text" defaultValue={pet?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                  <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">犬種/種類</label>
                      <input name="petBreed" type="text" defaultValue={pet?.breed || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">年齢</label>
                      <input name="petAgeText" type="text" defaultValue={pet?.age_text || ''} placeholder="例: 3歳" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
                  </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">体重</label>
                      <input name="petWeight" type="text" defaultValue={pet?.weight || ''} placeholder="例: 5.5kg" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
                  </div>
                  <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">毛色</label>
                      <input name="petColor" type="text" defaultValue={pet?.color || ''} placeholder="例: 茶" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
                  </div>
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">紹介文・性格</label>
                  <textarea name="petDescription" defaultValue={pet?.description || ''} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300 resize-none"></textarea>
              </div>
          </div>
      </div>

      {/* 2. 飼い主情報 (緊急時のみ表示) */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg border-t-4 border-red-400" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-phone-fill text-red-500 text-lg"></i>
                  飼い主・緊急連絡先
              </h2>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">緊急時のみ表示</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-6 leading-relaxed">
              <span className="text-red-600 font-bold">⚠️ 注意：</span> 
              電話番号とお名前・SOSメッセージは、<span className="font-bold underline">迷子モード発動中</span>にのみ公開ページに表示されます。通常時は非公開です。
          </p>
          <div className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">発見者へのメッセージ（SOSメッセージ）</label>
                  <textarea name="sosMessage" defaultValue={initialData?.sos_message || ''} rows={3} placeholder="例: 見つけていただき本当にありがとうございます。とても臆病な子なので、可能であれば優しく保護し、すぐにお電話ください。" className="w-full bg-red-50/30 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-red-300 resize-none"></textarea>
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">飼い主の名前（緊急連絡先名）</label>
                  <input name="name" type="text" defaultValue={initialData?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-red-200" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">緊急連絡先電話番号</label>
                  <input name="phone" type="tel" defaultValue={initialData?.phone || ''} placeholder="090-0000-0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-red-200" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">自宅住所 <span className="text-gray-400 font-normal">（※公開されません）</span></label>
                  <input name="address" type="text" defaultValue={initialData?.address || ''} className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none" title="住所はシステム管理用で公開されません" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">メールアドレス（変更不可）</label>
                  <input type="email" disabled defaultValue={initialData?.email || ''} className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none" />
              </div>
          </div>
      </div>

      {/* 3. 医療・安全性情報 (常時表示) */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg border-t-4 border-orange-400" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <i className="ri-heart-pulse-fill text-orange-500 text-lg"></i>
                  命に関わる重要情報
              </h2>
              <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">常時表示可能</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-6 leading-relaxed">
              迷子として発見された際、<span className="text-orange-600 font-bold">安全に保護してもらうために必要な情報</span>です。
          </p>
          <div className="space-y-4">
              <input type="hidden" name="medicalId" value={medical?.id || ''} />
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 text-orange-700">⚠️ 緊急時の注意事項（接し方・アレルギーなど）</label>
                  <textarea name="specialNotes" defaultValue={medical?.special_notes || ''} rows={3} placeholder="例: かみ癖があります、大きな音が苦手です、重篤な卵アレルギーがあります" className="w-full bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-900 focus:outline-none focus:border-orange-400 resize-none font-bold"></textarea>
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">持病・既往症</label>
                  <input name="chronicDiseases" type="text" defaultValue={medical?.chronic_diseases || ''} placeholder="例: 心疾患、てんかん" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">服用中の薬</label>
                  <input name="medications" type="text" defaultValue={medical?.medications || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 mb-1">かかりつけ病院名</label>
                  <input name="vetClinicName" type="text" defaultValue={medical?.vet_clinic_name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">病院の電話番号</label>
                  <input name="vetClinicPhone" type="tel" defaultValue={medical?.vet_clinic_phone || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
          </div>
      </div>

      <div className="pb-4">
          <button type="submit" disabled={isSaving} className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-teal-500 hover:bg-teal-600 transition shadow-md disabled:bg-gray-400">
              {isSaving ? '保存中...' : (isNew ? '新しく登録する' : '情報を保存する')}
          </button>
          {message && <p className="text-center text-sm font-bold mt-3 text-teal-600">{message}</p>}
      </div>

      {/* ペットの削除ボタン */}
      {!isNew && pet.id && (
        <div className="pt-8 pb-12 border-t border-gray-200 mt-8">
          <button 
            type="button" 
            onClick={handleDelete}
            className="w-full py-3 rounded-xl border-2 border-red-100 text-red-500 text-sm font-bold hover:bg-red-50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="ri-delete-bin-line"></i>
            このペット（{pet.name || '名前なし'}）の情報を完全に削除する
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 px-4">
            ※紐づく医療記録や持病記録、専用のQRコードタグ情報もすべて削除されます。<br/>一度削除すると元に戻せません。
          </p>
        </div>
      )}
    </form>
    </div>
  );
}
