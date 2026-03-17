'use client';

interface EmergencyToggleProps {
  isEmergencyMode: boolean;
  onToggle: () => void;
}

export default function EmergencyToggle({ isEmergencyMode, onToggle }: EmergencyToggleProps) {
  return (
    <div
      className={`rounded-[24px] p-5 shadow-xl transition-all duration-500 ${isEmergencyMode
          ? 'bg-gradient-to-r from-red-500 to-red-600'
          : 'bg-gradient-to-r from-green-500 to-green-600'
        }`}
      style={{ boxShadow: isEmergencyMode ? '0 8px 40px rgba(239, 68, 68, 0.4)' : '0 8px 40px rgba(34, 197, 94, 0.4)' }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl text-2xl bg-white/20">
            {isEmergencyMode ? '🚨' : '🐾'}
          </div>
          <div>
            <p className="font-bold text-base text-white">
              {isEmergencyMode ? '迷子モード 作動中' : '迷子モードを起動する'}
            </p>
            <p className="text-xs mt-0.5 text-white/90">
              {isEmergencyMode ? 'QRスキャン時に発見者へ通知が飛びます' : '緊急時にタップして迷子捜索を開始'}
            </p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="relative w-16 h-8 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 bg-white/30"
        >
          <div
            className={`absolute top-1 w-6 h-6 rounded-full shadow transition-all duration-300 bg-white ${isEmergencyMode ? 'left-9' : 'left-1'
              }`}
          />
        </button>
      </div>
    </div>
  );
}
