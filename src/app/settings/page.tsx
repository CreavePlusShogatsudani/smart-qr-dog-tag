'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    qrScans: true,
    emergencyAlerts: true,
    locationUpdates: true,
    messages: true,
  });

  const [emergencySettings, setEmergencySettings] = useState({
    autoNotify: true,
    shareLocation: false,
  });

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">設定</h1>
        <p className="text-gray-600">アプリの設定を管理</p>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            <i className="ri-notification-line text-xl text-blue-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">通知設定</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">QRコードスキャン</p>
              <p className="text-sm text-gray-600">誰かがQRコードをスキャンしたときに通知</p>
            </div>
            <button
              onClick={() => setNotifications({...notifications, qrScans: !notifications.qrScans})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                notifications.qrScans ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications.qrScans ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">緊急アラート</p>
              <p className="text-sm text-gray-600">緊急モードでのスキャンに関する重要な通知</p>
            </div>
            <button
              onClick={() => setNotifications({...notifications, emergencyAlerts: !notifications.emergencyAlerts})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                notifications.emergencyAlerts ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications.emergencyAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">位置情報の更新</p>
              <p className="text-sm text-gray-600">発見者が位置情報を送信したときに通知</p>
            </div>
            <button
              onClick={() => setNotifications({...notifications, locationUpdates: !notifications.locationUpdates})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                notifications.locationUpdates ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications.locationUpdates ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-gray-900">メッセージ</p>
              <p className="text-sm text-gray-600">発見者からのメッセージを受信</p>
            </div>
            <button
              onClick={() => setNotifications({...notifications, messages: !notifications.messages})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                notifications.messages ? 'bg-teal-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications.messages ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
            <i className="ri-alarm-warning-line text-xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">緊急モード設定</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">自動通知</p>
              <p className="text-sm text-gray-600">緊急モードでスキャンされたら即座に通知</p>
            </div>
            <button
              onClick={() => setEmergencySettings({...emergencySettings, autoNotify: !emergencySettings.autoNotify})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                emergencySettings.autoNotify ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                emergencySettings.autoNotify ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-semibold text-gray-900">位置情報を共有</p>
              <p className="text-sm text-gray-600">緊急モードで自分の位置情報を表示</p>
            </div>
            <button
              onClick={() => setEmergencySettings({...emergencySettings, shareLocation: !emergencySettings.shareLocation})}
              className={`relative w-12 h-7 rounded-full transition-colors cursor-pointer ${
                emergencySettings.shareLocation ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                emergencySettings.shareLocation ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
            <i className="ri-qr-code-line text-xl text-purple-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">QRコード</h2>
        </div>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-download-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">QRコードをダウンロード</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-share-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">QRコードを共有</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-printer-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">QRコードを印刷</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
            <i className="ri-user-line text-xl text-green-600"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900">アカウント</h2>
        </div>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-lock-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">パスワードを変更</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-mail-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">メールアドレスを変更</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>

          <button className="flex items-center justify-between w-full py-3 px-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <i className="ri-shield-check-line text-xl text-gray-600"></i>
              <span className="font-medium text-gray-900">プライバシー設定</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>
        </div>
      </div>

      <button className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors mb-4 whitespace-nowrap cursor-pointer">
        ログアウト
      </button>
    </div>
  );
}
