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

  // 狂犬病ワクチン（直近1つ）
  const rabiesRecord = vaccineRecords.find(r => r.rabies_date);
  // 混合ワクチン（直近1つ）
  const mixedRecord = vaccineRecords.find(r => r.mixed_date);

  const displayVaccines = [
    { 
      id: rabiesRecord?.id,
      name: '狂犬病ワクチン', 
      date: rabiesRecord?.rabies_date ? new Date(rabiesRecord.rabies_date).toLocaleDateString() : '未登録', 
      url: rabiesRecord?.certificateUrl,
      type: 'rabies' as const,
      color: 'bg-white text-teal-600' 
    },
    { 
      id: mixedRecord?.id,
      name: '混合ワクチン', 
      date: mixedRecord?.mixed_date ? new Date(mixedRecord.mixed_date).toLocaleDateString() : '未登録', 
      url: mixedRecord?.certificateUrl,
      type: 'mixed' as const,
      color: 'bg-white text-teal-600' 
    },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeType) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('petId', petId);
      formData.append('type', activeType);
      formData.append('date', new Date().toISOString().split('T')[0]); // 本日をデフォルトに
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
          <div key={i} className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl">
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
        ))}
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {displayVaccines.map((v) => (
            <div 
              key={v.type} 
              onClick={() => triggerUpload(v.type)}
              className="border-2 border-dashed border-teal-600/30 rounded-2xl h-24 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-teal-600 transition-colors bg-white/10"
            >
              {isUploading && activeType === v.type ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-teal-800 border-t-transparent"></div>
              ) : (
                <>
                  <i className="ri-upload-cloud-line text-2xl text-teal-700"></i>
                  <p className="text-[10px] text-teal-800 font-bold">{v.name}</p>
                  <p className="text-[8px] text-teal-700 opacity-70">証明書を追加</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold text-teal-900 bg-white/80 hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
      >
        {expanded ? '閉じる' : '証明書を管理する'}
      </button>
    </div>
  );
}
