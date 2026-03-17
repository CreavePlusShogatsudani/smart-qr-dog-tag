export default function ProductDescription() {
  return (
    <div className="py-6 border-b border-gray-100">
      <h2 className="text-lg font-bold text-gray-900 mb-3">商品について</h2>
      <p className="text-base text-gray-700 leading-relaxed">
        雨の日のお散歩も安心。スマホをかざすだけであなたの連絡先が分かる、次世代のお守りです。
      </p>
      
      <div className="mt-6 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-qr-scan-line text-xl text-gray-600"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">スマホでかざすだけ</h3>
            <p className="text-sm text-gray-600">QRコードをスキャンして、すぐに飼い主情報にアクセス</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-heart-pulse-line text-xl text-gray-600"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">医療情報も保存</h3>
            <p className="text-sm text-gray-600">ワクチン記録やアレルギー情報をデジタル管理</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-shield-star-line text-xl text-gray-600"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">高品質素材</h3>
            <p className="text-sm text-gray-600">耐久性に優れた真鍮またはアクリル製、長く使える品質</p>
          </div>
        </div>
      </div>
    </div>
  );
}