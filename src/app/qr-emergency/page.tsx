'use client';

import { useState } from 'react';

export default function QREmergencyPage() {
  const [showLocationToast, setShowLocationToast] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendLocation = () => {
    setShowLocationToast(true);
    setTimeout(() => setShowLocationToast(false), 3000);
  };

  const handleSendMessage = () => {
    setMessage('');
    setShowMessageModal(false);
    setShowLocationToast(true);
    setTimeout(() => setShowLocationToast(false), 3000);
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      {showLocationToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 bg-green-500 text-white font-semibold">
          飼い主に送信されました
        </div>
      )}

      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">メッセージを送信</h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="飼い主へのメッセージを入力してください..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none mb-4"
            />
            <button
              onClick={handleSendMessage}
              className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              送信
            </button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl p-8 text-white mb-6 text-center">
        <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4 animate-pulse">
          <i className="ri-alarm-warning-line text-4xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold mb-2">緊急モード</h1>
        <p className="text-red-50">この犬は迷子です</p>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <i className="ri-information-line text-2xl text-yellow-600 mt-0.5"></i>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">この犬を見つけてくださりありがとうございます</h2>
            <p className="text-gray-700">
              飼い主は現在この犬を探しています。以下の情報は、適切なケアを提供するのに役立ちます。
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-user-heart-line text-xl text-purple-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">犬の情報</h3>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <img 
            src="https://readdy.ai/api/search-image?query=A%20friendly%20golden%20retriever%20dog%20portrait%20with%20a%20happy%20expression%2C%20sitting%20outdoors%20in%20natural%20daylight%2C%20simple%20clean%20background%20with%20soft%20bokeh%2C%20professional%20pet%20photography%20style%2C%20warm%20and%20inviting%20atmosphere%2C%20high%20quality%20detailed%20fur%20texture%2C%20shallow%20depth%20of%20field&width=400&height=400&seq=dog-profile-004&orientation=squarish" 
            alt="Dog Profile" 
            className="w-20 h-20 rounded-full object-cover object-top"
          />
          <div>
            <h4 className="text-xl font-bold text-gray-900">マックス</h4>
            <p className="text-gray-600">ゴールデンレトリバー • 3歳</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-user-line text-xl text-blue-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">飼い主の情報</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-200 rounded-full shrink-0">
              <i className="ri-user-smile-line text-2xl text-blue-700"></i>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500">飼い主名</p>
              <p className="text-lg font-bold text-gray-900">田中 太郎</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-500 mb-1">住所（エリア）</p>
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-2-line text-lg text-blue-600"></i>
              <p className="text-gray-900">東京都渋谷区</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-500 mb-1">電話番号</p>
            <a href="tel:+81-90-1234-5678" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline cursor-pointer">
              <i className="ri-phone-line text-lg"></i>
              <span>090-1234-5678</span>
            </a>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-500 mb-1">メールアドレス</p>
            <a href="mailto:taro.tanaka@example.com" className="flex items-center gap-2 text-blue-600 font-semibold hover:underline cursor-pointer">
              <i className="ri-mail-line text-lg"></i>
              <span>taro.tanaka@example.com</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-red-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
            <i className="ri-heart-pulse-line text-xl text-red-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">医療情報</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-1">既往症・持病</p>
            <p className="text-gray-900">なし</p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-1">服用中の薬</p>
            <p className="text-gray-900">なし</p>
          </div>

          <div className="p-4 bg-red-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-1">かかりつけ動物病院</p>
            <p className="text-gray-900 mb-2">ハッピーペット動物病院</p>
            <a href="tel:+81-3-1234-5678" className="flex items-center gap-2 text-red-600 font-semibold hover:underline cursor-pointer">
              <i className="ri-phone-line"></i>
              <span>+81-3-1234-5678</span>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
            <i className="ri-send-plane-line text-xl text-orange-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">飼い主に連絡</h3>
        </div>

        <p className="text-gray-700 mb-4">
          あなたの個人情報は共有されません。すべての通信は匿名です。
        </p>

        <div className="space-y-3">
          <button 
            onClick={handleSendLocation}
            className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-map-pin-line text-xl"></i>
            <span>現在地を送信</span>
          </button>

          <button 
            onClick={() => setShowMessageModal(true)}
            className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-message-line text-xl"></i>
            <span>メッセージを送信</span>
          </button>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="ri-heart-line text-xl text-green-600 mt-0.5"></i>
          <p className="text-sm text-gray-700">
            この犬を見つけてくださり、ありがとうございます。あなたの優しさが飼い主との再会を助けます。
          </p>
        </div>
      </div>
    </div>
  );
}
