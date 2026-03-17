'use client';

import { useState } from 'react';
import { saveProfile } from '@/app/actions/profile';

type ProfileClientProps = {
  initialData: any;
};

export default function ProfileClient({ initialData }: ProfileClientProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const pet = initialData?.pets?.[0] || {};
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 飼い主情報 */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-parent-line text-teal-500"></i>
              飼い主情報
          </h2>
          <div className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">飼い主の名前</label>
                  <input name="name" type="text" defaultValue={initialData?.name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">メールアドレス（変更不可）</label>
                  <input type="email" disabled defaultValue={initialData?.email || ''} className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">電話番号</label>
                  <input name="phone" type="tel" defaultValue={initialData?.phone || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">自宅住所</label>
                  <input name="address" type="text" defaultValue={initialData?.address || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
          </div>
      </div>

      {/* ペット情報 */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-baidu-line text-teal-500"></i>
              ペットの基本情報
          </h2>
          <div className="space-y-4">
              <input type="hidden" name="petId" value={pet?.id || ''} />
              <input type="hidden" name="currentImageUrl" value={pet?.image_url || ''} />
              
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-teal-50 overflow-hidden shadow-inner bg-gray-100 relative mb-3">
                  <img 
                    src={previewUrl || pet?.image_url || "https://readdy.ai/api/search-image?query=pet%20placeholder&width=200&height=200"} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold">
                    写真を変更
                    <input type="file" name="petImage" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">画像をクリックして変更</p>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">紹介文</label>
                  <textarea name="petDescription" defaultValue={pet?.description || ''} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300 resize-none"></textarea>
              </div>
          </div>
      </div>

      {/* 医療情報 */}
      <div className="bg-white rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
          <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-heart-pulse-line text-teal-500"></i>
              医療・持病情報
          </h2>
          <div className="space-y-4">
              <input type="hidden" name="medicalId" value={medical?.id || ''} />
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">持病・既往症</label>
                  <input name="chronicDiseases" type="text" defaultValue={medical?.chronic_diseases || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">服用中の薬</label>
                  <input name="medications" type="text" defaultValue={medical?.medications || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">かかりつけ病院</label>
                  <input name="vetClinicName" type="text" defaultValue={medical?.vet_clinic_name || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">病院の電話番号</label>
                  <input name="vetClinicPhone" type="tel" defaultValue={medical?.vet_clinic_phone || ''} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-teal-300" />
              </div>
              <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 text-teal-600">⚠️ 緊急時の注意事項</label>
                  <textarea name="specialNotes" defaultValue={medical?.special_notes || ''} rows={3} className="w-full bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 text-sm text-teal-800 focus:outline-none focus:border-teal-400 resize-none"></textarea>
              </div>
          </div>
      </div>

      <div className="pb-4">
          <button type="submit" disabled={isSaving} className="w-full py-4 rounded-2xl text-sm font-bold text-white bg-teal-500 hover:bg-teal-600 transition shadow-md disabled:bg-gray-400">
              {isSaving ? '保存中...' : '情報を保存する'}
          </button>
          {message && <p className="text-center text-sm font-bold mt-3 text-teal-600">{message}</p>}
      </div>
    </form>
  );
}
