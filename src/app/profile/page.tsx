'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 bg-teal-500 text-white font-semibold">
          変更が保存されました
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">愛犬のプロフィール</h1>
        <p className="text-gray-600">愛犬の情報を管理</p>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-user-heart-line text-xl text-purple-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">基本情報</h2>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src="https://readdy.ai/api/search-image?query=A%20friendly%20golden%20retriever%20dog%20portrait%20with%20a%20happy%20expression%2C%20sitting%20outdoors%20in%20natural%20daylight%2C%20simple%20clean%20background%20with%20soft%20bokeh%2C%20professional%20pet%20photography%20style%2C%20warm%20and%20inviting%20atmosphere%2C%20high%20quality%20detailed%20fur%20texture%2C%20shallow%20depth%20of%20field&width=400&height=400&seq=dog-profile-002&orientation=squarish" 
              alt="Dog Profile" 
              className="w-32 h-32 rounded-full object-cover object-top"
            />
            <button className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors cursor-pointer">
              <i className="ri-camera-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">名前</label>
            <input 
              type="text" 
              defaultValue="マックス"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">犬種</label>
            <input 
              type="text" 
              defaultValue="ゴールデンレトリバー"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">年齢</label>
              <input 
                type="text" 
                defaultValue="3歳"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">体重</label>
              <input 
                type="text" 
                defaultValue="30kg"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">毛色</label>
            <input 
              type="text" 
              defaultValue="ゴールド"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">紹介文</label>
            <textarea 
              rows={3}
              defaultValue="フレンドリーで遊び好きなゴールデンレトリバーです。他の犬や人が大好きです！"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">@</span>
              <input 
                type="text" 
                defaultValue="max_the_golden"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
            <i className="ri-heart-pulse-line text-xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">医療情報</h2>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-xl text-yellow-600 mt-0.5"></i>
            <p className="text-sm text-gray-700">
              この情報は緊急モードでのみ表示されます。愛犬が迷子になった場合、発見者が適切なケアを提供できるようにします。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">既往症・持病</label>
            <textarea 
              rows={3}
              placeholder="アレルギー、慢性疾患など"
              defaultValue="なし"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">服用中の薬</label>
            <textarea 
              rows={3}
              placeholder="薬の名前と用量"
              defaultValue="なし"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">かかりつけ動物病院</label>
            <input 
              type="text" 
              defaultValue="ハッピーペット動物病院"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">獣医師の電話番号</label>
            <input 
              type="tel" 
              defaultValue="+81-3-1234-5678"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">特記事項</label>
            <textarea 
              rows={3}
              placeholder="その他の重要な医療情報"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-user-line text-xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">飼い主情報</h2>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-xl text-blue-600 mt-0.5"></i>
            <p className="text-sm text-gray-700">
              緊急モード時にQRコードをスキャンした発見者に表示される情報です。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">飼い主名</label>
            <input 
              type="text" 
              defaultValue="田中 太郎"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">住所（エリア）</label>
            <input 
              type="text" 
              defaultValue="東京都渋谷区"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">電話番号</label>
            <input 
              type="tel" 
              defaultValue="090-1234-5678"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">メールアドレス</label>
            <input 
              type="email" 
              defaultValue="taro.tanaka@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSave}
        className="w-full py-4 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors mb-4 whitespace-nowrap cursor-pointer"
      >
        変更を保存
      </button>
    </div>
  );
}
