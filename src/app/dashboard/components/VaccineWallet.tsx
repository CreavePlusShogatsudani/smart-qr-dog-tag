'use client';

import { useState, useRef } from 'react';
import { saveVaccineRecord } from '@/app/actions/profile';

interface VaccineWalletProps {
  petId: string;
  vaccineRecords?: any[];
}

export default function VaccineWallet({ petId, vaccineRecords = [] }: VaccineWalletProps) {
  const [expanded, setExpanded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeType, setActiveType] = useState<'rabies' | 'mixed' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getVaccineStatus = (dateString?: string) => {
    if (!dateString) return null;
    const lastDate = new Date(dateString);
    const nextDate = new Date(lastDate);
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    nextDate.setHours(0, 0, 0, 0);

    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { type: 'overdue', message: '接種期限を過ぎています' };
    } else if (diffDays <= 30) {
      return { type: 'approaching', message: `まもなく接種時期です（あと${diffDays}日）` };
    }
    return null;
  };

  // 狂犬病ワクチン（直近1つ）
  const rabiesRecord = vaccineRecords.find(r => r.rabies_date);
  // 混合ワクチン（直近1つ）
  const mixedRecord = vaccineRecords.find(r => r.mixed_date);

  const [mixedDate, setMixedDate] = useState(mixedRecord?.mixed_date ? new Date(mixedRecord.mixed_date).toISOString().split('T')[0] : '');
  const [rabiesDate, setRabiesDate] = useState(rabiesRecord?.rabies_date ? new Date(rabiesRecord.rabies_date).toISOString().split('T')[0] : '');

  const displayVaccines = [
    { 
      id: rabiesRecord?.id,
      name: '狂犬病ワクチン', 
      date: rabiesRecord?.rabies_date ? new Date(rabiesRecord.rabies_date).toLocaleDateString() : '未登録', 
      url: rabiesRecord?.certificateUrl,
      type: 'rabies' as const,
      color: 'bg-white text-teal-600',
      selectedDate: rabiesDate,
      setSelectedDate: setRabiesDate,
      status: getVaccineStatus(rabiesRecord?.rabies_date)
    },
    { 
      id: mixedRecord?.id,
      name: '混合ワクチン', 
      date: mixedRecord?.mixed_date ? new Date(mixedRecord.mixed_date).toLocaleDateString() : '未登録', 
      url: mixedRecord?.certificateUrl,
      type: 'mixed' as const,
      color: 'bg-white text-teal-600',
      selectedDate: mixedDate,
      setSelectedDate: setMixedDate,
      status: getVaccineStatus(mixedRecord?.mixed_date)
    },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeType) return;

    const selectedDate = activeType === 'rabies' ? rabiesDate : mixedDate;
    if (!selectedDate) {
      alert('接種日を選択してください');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('petId', petId);
      formData.append('type', activeType);
      formData.append('date', selectedDate);
      formData.append('certificate', file);
      
      const currentRecord = activeType === 'rabies' ? rabiesRecord : mixedRecord;
      if (currentRecord?.id) {
        formData.append('recordId', currentRecord.id);
        formData.append('currentCertificateUrl', currentRecord.certificateUrl || '');
      }

      await saveVaccineRecord(formData);
      alert('証明書を保存しました');
    } catch (err) {
      console.error(err);
      alert('アップロードに失敗しました');
    } finally {
      setIsUploading(false);
      setActiveType(null);
    }
  };

  const triggerUpload = (type: 'rabies' | 'mixed') => {
    setActiveType(type);
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-teal-500 rounded-[24px] p-5 shadow-lg" style={{ boxShadow: '0 8px 40px rgba(237, 194, 194, 0.3)' }}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center bg-teal-600/30 rounded-xl">
            <i className="ri-shield-cross-line text-teal-900 text-lg"></i>
          </div>
          <h3 className="font-bold text-teal-950 text-base">ワクチン証明書</h3>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="w-8 h-8 flex items-center justify-center bg-teal-600/20 rounded-full cursor-pointer">
          <i className={`ri-arrow-${expanded ? 'up' : 'down'}-s-line text-teal-900 text-lg`}></i>
        </button>
      </div>

      <div className="space-y-3">
        {displayVaccines.map((v, i) => (
          <div key={i} className="flex flex-col gap-2 p-3 bg-white/70 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 ${v.color}`}>
                <i className="ri-syringe-line text-lg"></i>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-teal-950 text-sm truncate">{v.name}</p>
                <p className="text-xs text-teal-800 mt-0.5">接種日: {v.date}</p>
              </div>
              {v.url && (
                <a 
                  href={v.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-teal-500 rounded-lg text-white"
                >
                  <i className="ri-image-line"></i>
                </a>
              )}
            </div>
            {v.status && (
              <div className={`mt-1 text-xs px-3 py-2 rounded-xl flex items-center gap-2 ${
                v.status.type === 'overdue' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
              }`}>
                <i className={`ri-${v.status.type === 'overdue' ? 'error-warning' : 'alert'}-fill text-sm`}></i>
                <span className="font-bold">{v.status.message}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          {displayVaccines.map((v) => (
            <div key={v.type} className="bg-white/10 p-4 rounded-2xl border border-teal-600/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-teal-950">{v.name}</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-teal-900/60 ml-1">接種日を選択</label>
                  <input 
                    type="date" 
                    value={v.selectedDate}
                    onChange={(e) => v.setSelectedDate(e.target.value)}
                    className="w-full bg-white/80 rounded-xl px-3 py-2 text-sm text-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>

                <div 
                  onClick={() => triggerUpload(v.type)}
                  className="border-2 border-dashed border-teal-600/30 rounded-xl py-4 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-teal-600 transition-colors bg-white/5"
                >
                  {isUploading && activeType === v.type ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-800 border-t-transparent"></div>
                  ) : (
                    <>
                      <i className="ri-upload-cloud-line text-xl text-teal-700"></i>
                      <p className="text-[10px] text-teal-800 font-bold">証明書をアップロード</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold text-teal-900 bg-white/80 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
      >
        {expanded ? '管理を閉じる' : '接種日・証明書を編集'}
      </button>
    </div>
  );
}
