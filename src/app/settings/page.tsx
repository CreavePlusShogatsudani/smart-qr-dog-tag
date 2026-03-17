import { getSettings } from "@/app/actions/settings";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
    const userSettings = await getSettings();

    // 未ログイン時等のフォールバック
    const initialSettings = userSettings || {
        notify_qr_scans: true,
        notify_emergency_alerts: true,
        notify_location_updates: true,
        notify_messages: true,
        emergency_auto_notify: true,
        emergency_share_location: false,
    };

    return (
        <div className="min-h-screen px-4 pt-6" style={{ background: '#fdf8f8' }}>
            <div className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="ri-settings-line text-pink-500"></i>
                    設定
                </h1>

                <SettingsClient initialSettings={{
                    notify_qr_scans: initialSettings.notify_qr_scans,
                    notify_emergency_alerts: initialSettings.notify_emergency_alerts,
                    notify_location_updates: initialSettings.notify_location_updates,
                    notify_messages: initialSettings.notify_messages,
                    emergency_auto_notify: initialSettings.emergency_auto_notify,
                    emergency_share_location: initialSettings.emergency_share_location,
                }} />
            </div>
        </div>
    );
}
