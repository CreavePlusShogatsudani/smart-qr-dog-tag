'use client';

import { useState } from 'react';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '通常モードと緊急モードを切り替えるには？',
      answer: 'ホームページのスイッチボタンでモードを切り替えることができます。緊急モードは愛犬が迷子になった場合にのみ有効にしてください。',
    },
    {
      question: '通常モードではどのような情報が表示されますか？',
      answer: '通常モードでは、愛犬の名前、犬種、年齢、体重、毛色、紹介文、Instagramアカウントなどの基本情報が表示されます。医療情報は非表示です。',
    },
    {
      question: '緊急モードでQRコードがスキャンされるとどうなりますか？',
      answer: '発見者には愛犬の医療情報、獣医師の詳細が表示され、匿名で位置情報やメッセージを送信するオプションが提供されます。',
    },
    {
      question: '個人情報は発見者と共有されますか？',
      answer: 'いいえ、すべての通信は匿名です。発見者は個人の連絡先を見ることなく、メッセージや位置情報を送信できます。',
    },
    {
      question: '愛犬の医療情報を更新するには？',
      answer: '犬のプロフィールページに移動し、医療情報セクションまでスクロールします。詳細を更新して「変更を保存」をクリックしてください。',
    },
    {
      question: '1つのアカウントで複数の犬を登録できますか？',
      answer: '現在、各アカウントは1匹の犬のプロフィールをサポートしています。複数の犬の場合は、別々のアカウントが必要です。',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ヘルプ＆サポート</h1>
        <p className="text-gray-600">回答を見つけてサポートを受ける</p>
      </div>

      <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-xl">
            <i className="ri-customer-service-line text-2xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold">お困りですか？</h2>
        </div>
        <p className="text-teal-50 mb-4">
          大切な愛犬の安全を守るお手伝いをします。いつでもお問い合わせください！
        </p>
        <button className="w-full py-3 bg-white text-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap cursor-pointer">
          サポートに連絡
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-question-line text-xl text-purple-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">よくある質問</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900 text-left">{faq.question}</span>
                <i className={`ri-arrow-${openFaq === index ? 'up' : 'down'}-s-line text-xl text-gray-400 flex-shrink-0 ml-2`}></i>
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-book-line text-xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">クイックガイド</h2>
        </div>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-guide-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">はじめに</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-qr-code-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">QRコードの使い方</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-alarm-warning-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">緊急モードの設定</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-shield-check-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">プライバシーとセキュリティ</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
            <i className="ri-mail-line text-xl text-green-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">お問い合わせ</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i className="ri-mail-line text-xl text-gray-600"></i>
            <div>
              <p className="text-sm text-gray-600">メール</p>
              <a href="mailto:support@smartqrdogtag.com" className="font-medium text-teal-600 hover:underline cursor-pointer">
                support@smartqrdogtag.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i className="ri-phone-line text-xl text-gray-600"></i>
            <div>
              <p className="text-sm text-gray-600">電話</p>
              <a href="tel:+81-3-1234-5678" className="font-medium text-teal-600 hover:underline cursor-pointer">
                +81-3-1234-5678
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <i className="ri-time-line text-xl text-gray-600"></i>
            <div>
              <p className="text-sm text-gray-600">サポート時間</p>
              <p className="font-medium text-gray-900">24時間365日対応</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-lg">
            <i className="ri-feedback-line text-xl text-white"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">フィードバックを送信</h2>
        </div>
        <p className="text-gray-700 mb-4">
          改善にご協力ください！ご意見やご提案をお聞かせください。
        </p>
        <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer">
          フィードバックを送信
        </button>
      </div>
    </div>
  );
}
