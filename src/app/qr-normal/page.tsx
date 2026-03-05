'use client';

export default function QRNormalPage() {
  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-8 text-white mb-6 text-center">
        <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full mx-auto mb-4">
          <i className="ri-user-heart-line text-4xl text-white"></i>
        </div>
        <h1 className="text-3xl font-bold mb-2">こんにちは！</h1>
        <p className="text-teal-50">私の飼い主の友達になりましょう</p>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <img 
            src="https://readdy.ai/api/search-image?query=A%20friendly%20golden%20retriever%20dog%20portrait%20with%20a%20happy%20expression%2C%20sitting%20outdoors%20in%20natural%20daylight%2C%20simple%20clean%20background%20with%20soft%20bokeh%2C%20professional%20pet%20photography%20style%2C%20warm%20and%20inviting%20atmosphere%2C%20high%20quality%20detailed%20fur%20texture%2C%20shallow%20depth%20of%20field&width=400&height=400&seq=dog-profile-003&orientation=squarish" 
            alt="Dog Profile" 
            className="w-24 h-24 rounded-full object-cover object-top"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">マックス</h2>
            <p className="text-gray-600">ゴールデンレトリバー</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
              <i className="ri-cake-line text-xl text-purple-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">年齢</p>
              <p className="font-semibold text-gray-900">3歳</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <i className="ri-weight-line text-xl text-blue-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">体重</p>
              <p className="font-semibold text-gray-900">30kg</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-10 h-10 flex items-center justify-center bg-yellow-100 rounded-lg">
              <i className="ri-palette-line text-xl text-yellow-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">毛色</p>
              <p className="font-semibold text-gray-900">ゴールド</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
            <i className="ri-information-line text-xl text-green-600"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">私について</h3>
        </div>
        <p className="text-gray-700 leading-relaxed">
          フレンドリーで遊び好きなゴールデンレトリバーです。他の犬や人が大好きです！
        </p>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-pink-500 rounded-lg">
            <i className="ri-instagram-line text-xl text-white"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Instagramでフォロー</h3>
        </div>
        <p className="text-gray-700 mb-4">
          私の冒険をもっと見たいですか？Instagramでフォローしてください！
        </p>
        <a 
          href="https://instagram.com/max_the_golden" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-colors whitespace-nowrap cursor-pointer"
        >
          <i className="ri-instagram-line text-xl"></i>
          <span>@max_the_golden</span>
        </a>
      </div>

      <div className="mt-6 bg-teal-50 border border-teal-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <i className="ri-information-line text-xl text-teal-600 mt-0.5"></i>
          <p className="text-sm text-gray-700">
            このQRコードは通常モードです。緊急時には、飼い主が緊急モードに切り替えて医療情報を表示します。
          </p>
        </div>
      </div>
    </div>
  );
}
