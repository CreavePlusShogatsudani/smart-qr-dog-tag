import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 flex items-center justify-center bg-teal-100 rounded-full mx-auto mb-6">
          <i className="ri-error-warning-line text-5xl text-teal-600"></i>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">ページが見つかりません</h2>
        <p className="text-gray-600 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer">
            ホームに戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
