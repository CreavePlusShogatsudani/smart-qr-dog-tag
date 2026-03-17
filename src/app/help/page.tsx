'use client';

export default function HelpPage() {
    return (
        <div className="min-h-screen px-4 pt-6" style={{ background: '#fdf8f8' }}>
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="ri-question-line text-teal-500"></i>
                    ヘルプセンター
                </h1>

                <div className="space-y-4">
                    <div className="bg-white rounded-[24px] p-5 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
                        <h3 className="font-bold text-sm text-gray-900 mb-2">Q. QRタグが読み込まれたらどうなりますか？</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            迷子モードが有効の場合、即座にあなたのメールアドレスに通知が届き、発見者には緊急用の情報と連絡先が表示されます。
                        </p>
                    </div>

                    <div className="bg-white rounded-[24px] p-5 shadow-lg cursor-pointer hover:shadow-xl transition-shadow" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
                        <h3 className="font-bold text-sm text-gray-900 mb-2">Q. 登録情報の変更方法は？</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            「プロフィール・情報編集」画面からいつでもペットの情報や飼い主情報を更新できます。変更内容はQRコードに即時反映されます。
                        </p>
                    </div>

                    <div className="mt-8 bg-teal-50 rounded-[24px] p-5 text-center">
                        <i className="ri-customer-service-2-line text-3xl text-teal-500 mb-3 inline-block"></i>
                        <h4 className="font-bold text-sm text-gray-900 mb-2">解決しない場合は</h4>
                        <p className="text-xs text-gray-600 mb-4">サポートチームにお問い合わせください</p>
                        <button className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-teal-500 hover:bg-teal-600 transition-colors">
                            お問い合わせ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
