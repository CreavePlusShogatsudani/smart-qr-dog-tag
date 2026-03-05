'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = () => {
    setIsEmergencyMode(!isEmergencyMode);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      {showToast && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 ${isEmergencyMode ? 'bg-red-500' : 'bg-teal-500'
          } text-white font-semibold`}>
          {isEmergencyMode ? '緊急モードが有効になりました' : '通常モードに戻りました'}
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
        <p className="text-gray-600">愛犬の安全を管理</p>
      </div>

      <div className={`rounded-2xl p-6 mb-6 transition-all ${isEmergencyMode
          ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white'
          : 'bg-gradient-to-br from-teal-400 to-teal-600 text-white'
        }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${isEmergencyMode ? 'bg-white/20' : 'bg-white/20'
              }`}>
              <i className={`${isEmergencyMode ? 'ri-alarm-warning-line' : 'ri-shield-check-line'} text-2xl text-white`}></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {isEmergencyMode ? '緊急モード' : '通常モード'}
              </h2>
              <p className="text-sm opacity-90">
                {isEmergencyMode ? '迷子モード有効' : '平常時モード'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className={`relative w-16 h-8 rounded-full transition-colors cursor-pointer ${isEmergencyMode ? 'bg-white/30' : 'bg-white/30'
              }`}
          >
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${isEmergencyMode ? 'translate-x-8' : 'translate-x-0'
              }`}></div>
          </button>
        </div>
        <p className={`text-sm ${isEmergencyMode ? 'text-red-50' : 'text-teal-50'}`}>
          {isEmergencyMode
            ? 'QRコードをスキャンすると、発見者に医療情報と連絡オプションが表示されます。'
            : 'QRコードをスキャンすると、愛犬の基本情報が表示されます。'}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-user-heart-line text-xl text-purple-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">愛犬のプロフィール</h2>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img
            src="https://readdy.ai/api/search-image?query=A%20friendly%20golden%20retriever%20dog%20portrait%20with%20a%20happy%20expression%2C%20sitting%20outdoors%20in%20natural%20daylight%2C%20simple%20clean%20background%20with%20soft%20bokeh%2C%20professional%20pet%20photography%20style%2C%20warm%20and%20inviting%20atmosphere%2C%20high%20quality%20detailed%20fur%20texture%2C%20shallow%20depth%20of%20field&width=400&height=400&seq=dog-profile-001&orientation=squarish"
            alt="Dog Profile"
            className="w-20 h-20 rounded-full object-cover object-top"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">マックス</h3>
            <p className="text-gray-600">ゴールデンレトリバー • 3歳</p>
            <p className="text-sm text-gray-500">体重: 30kg • 色: ゴールド</p>
          </div>
        </div>

        <Link href="/admin">
          <button className="w-full py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer">
            管理画面を開く（ログイン・無料登録）
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-qr-code-line text-xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">QRコードプレビュー</h2>
        </div>

        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <i className="ri-information-line text-lg text-blue-600 mt-0.5"></i>
            <p className="text-sm text-gray-700">
              このプレビューは、QRコードをスキャンした人が見るページです
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/qr-normal">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 border-2 border-teal-200 hover:border-teal-400 transition-colors cursor-pointer">
              <div className="w-full aspect-square bg-white rounded-lg mb-3 flex items-center justify-center">
                <i className="ri-qr-code-line text-4xl text-teal-600"></i>
              </div>
              <p className="text-center font-semibold text-gray-900">通常モード</p>
              <p className="text-xs text-center text-gray-600 mt-1">基本情報</p>
            </div>
          </Link>

          <Link href="/qr-emergency">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer">
              <div className="w-full aspect-square bg-white rounded-lg mb-3 flex items-center justify-center">
                <i className="ri-qr-code-line text-4xl text-red-600"></i>
              </div>
              <p className="text-center font-semibold text-gray-900">緊急モード</p>
              <p className="text-xs text-center text-gray-600 mt-1">医療情報</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
            <i className="ri-links-line text-xl text-green-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">クイックアクション</h2>
        </div>

        <div className="space-y-3">
          <Link href="/settings">
            <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <i className="ri-notification-line text-xl text-gray-600"></i>
                <span className="font-medium text-gray-900">通知設定</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </button>
          </Link>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-download-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">QRコードをダウンロード</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <Link href="/help">
            <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <i className="ri-question-line text-xl text-gray-600"></i>
                <span className="font-medium text-gray-900">ヘルプ＆サポート</span>
              </div>
              <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
            </button>
          </Link>
        </div>
      </div>

      {isEmergencyMode && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 rounded-lg">
              <i className="ri-alert-line text-xl text-white"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900">緊急モード有効</h2>
          </div>
          <p className="text-gray-700 mb-4">
            愛犬が見つかったら、必ず緊急モードをオフにしてください。
          </p>
          <button
            onClick={handleToggle}
            className="w-full py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition-colors whitespace-nowrap cursor-pointer"
          >
            緊急モードを解除
          </button>
        </div>
      )}
    </div>
  );
}
