'use client';

import { useState } from 'react';
import { saveSettings } from '@/app/actions/settings';
import { signOut } from 'next-auth/react';

type SettingsClientProps = {
  initialSettings: {
    notify_qr_scans: boolean;
    notify_emergency_alerts: boolean;
    notify_location_updates: boolean;
    notify_messages: boolean;
    emergency_auto_notify: boolean;
    emergency_share_location: boolean;
  }
};

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSetting = async (key: keyof typeof settings) => {
    const newValue = !settings[key];
    setSettings(prev => ({ ...prev, [key]: newValue }));
    
    setIsSaving(true);
    try {
      await saveSettings({ [key]: newValue });
    } catch (e) {
      console.error(e);
      // rollback on error
      setSettings(prev => ({ ...prev, [key]: !newValue }));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-5 shadow-lg space-y-4" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
      {isSaving && <div className="text-xs text-center text-teal-600 font-bold mb-2">保存中...</div>}

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
        <div>
          <p className="font-bold text-sm text-gray-900">QRコードスキャン通知</p>
          <p className="text-xs text-gray-500 mt-1">誰かがQRコードをスキャンした際に通知</p>
        </div>
        <button 
          onClick={() => toggleSetting('notify_qr_scans')}
          className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.notify_qr_scans ? 'bg-teal-500' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notify_qr_scans ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
        <div>
          <p className="font-bold text-sm text-gray-900">緊急アラート通知</p>
          <p className="text-xs text-gray-500 mt-1">緊急モードでのスキャンに関する重要な通知</p>
        </div>
        <button 
          onClick={() => toggleSetting('notify_emergency_alerts')}
          className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${settings.notify_emergency_alerts ? 'bg-teal-500' : 'bg-gray-300'}`}
        >
          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.notify_emergency_alerts ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
        <div>
          <p className="font-bold text-sm text-gray-900">アカウント連携</p>
          <p className="text-xs text-gray-500 mt-1">GoogleやLINEとの連携設定</p>
        </div>
        <i className="ri-arrow-right-s-line text-gray-400 text-xl"></i>
      </div>

      <div className="pt-4 mt-4 border-t border-gray-100">
        <button
          onClick={async (e) => {
            e.preventDefault();
                  // 1. 最新のCSRFトークンを取得 (キャッシュ起因の不整合を完全回避)
                  const csrfRes = await fetch('/api/auth/csrf');
                  const { csrfToken } = await csrfRes.json();
                  
                  // 2. ブラウザ標準のfetchで確実にログアウトPOSTを送信
                  await fetch('/api/auth/signout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ csrfToken, callbackUrl: '/' }),
                  });

                  // 3. PWAキャッシュや古いSWを破棄する
                  if ('serviceWorker' in navigator) {
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    for (const reg of registrations) await reg.unregister();
                  }
                  if ('caches' in window) {
                    const keys = await caches.keys();
                    for (const key of keys) await caches.delete(key);
                  }

                  window.localStorage.clear();
                  window.sessionStorage.clear();

                  // 4. 強制リロードで完全に状態をリセットしてトップへ
                  window.location.href = '/';
                } catch (error) {
                  console.error("Logout error:", error);
                  // 万が一失敗した場合はNextAuth標準のログアウト画面へフォールバック
                  window.location.href = '/api/auth/signout?callbackUrl=/';
                }
            }
          }}
          className="w-full flex justify-center items-center gap-2 py-3 rounded-2xl text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 transition cursor-pointer"
        >
          <i className="ri-logout-box-r-line text-lg"></i>
          ログアウト
        </button>
      </div>
    </div>
  );
}
