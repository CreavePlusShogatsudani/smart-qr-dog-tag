export default function ProductDetails() {
  return (
    <div className="pt-6 pb-4 border-b border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
        LIEN プレミアム迷子札
      </h1>
      
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-4xl font-bold text-gray-900">¥2,480</span>
        <span className="text-sm text-gray-500">（税込・送料無料）</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-drop-line text-xl text-teal-600"></i>
          </div>
          <span className="text-sm text-gray-700 font-medium">防水</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-shield-check-line text-xl text-teal-600"></i>
          </div>
          <span className="text-sm text-gray-700 font-medium">頑丈</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <i className="ri-map-pin-line text-xl text-teal-600"></i>
          </div>
          <span className="text-sm text-gray-700 font-medium">国内製造</span>
        </div>
      </div>
    </div>
  );
}