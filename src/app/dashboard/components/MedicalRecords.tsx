'use client';

import { useState } from 'react';

interface MedicalRecordsProps {
  medicalRecords?: any[];
}

export default function MedicalRecords({ medicalRecords = [] }: MedicalRecordsProps) {
  const [expanded, setExpanded] = useState(false);
  const record = medicalRecords[0]; // 直近の1件を使用

  const displayItems = [
    { icon: 'ri-stethoscope-line', color: 'bg-white text-teal-600', label: '持病・既往症', value: record?.chronic_diseases || 'なし' },
    { icon: 'ri-capsule-line', color: 'bg-white text-teal-600', label: '常用している薬', value: record?.medications || 'なし' },
    { icon: 'ri-hospital-line', color: 'bg-white text-teal-600', label: 'かかりつけ病院', value: record?.vet_clinic_name ? `${record.vet_clinic_name} ／ ${record.vet_clinic_phone || '-'}` : '未登録' },
    { icon: 'ri-map-pin-2-line', color: 'bg-white text-teal-600', label: '病院の住所', value: record?.vet_clinic_address || '未登録' },
  ];

  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-teal-600/30 rounded-xl">
            <i className="ri-heart-pulse-line text-teal-900 text-lg"></i>
          </div>
          <h3 className="font-bold text-teal-950 text-base">医療・健康情報</h3>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="w-8 h-8 flex items-center justify-center bg-teal-600/20 rounded-full cursor-pointer">
          <i className={`ri-arrow-${expanded ? 'up' : 'down'}-s-line text-teal-900 text-lg`}></i>
        </button>
      </div>

      <div className="space-y-3">
        {displayItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-white/70 rounded-2xl">
            <div className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 ${item.color}`}>
              <i className={`${item.icon} text-base`}></i>
            </div>
            <div>
              <p className="text-xs text-teal-800 font-medium">{item.label}</p>
              <p className="text-sm text-teal-950 font-semibold mt-0.5 whitespace-pre-wrap">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {expanded && record?.special_notes && (
        <div className="mt-4 p-3 bg-white/60 rounded-2xl border border-teal-600/20">
          <p className="text-xs text-teal-900 font-bold mb-1">⚠️ 緊急時の注意事項</p>
          <p className="text-sm text-teal-950">{record.special_notes}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold text-teal-900 bg-white/80 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
      >
        {expanded ? '詳細を隠す' : '特記事項を確認する'}
      </button>
    </div>
  );
}
