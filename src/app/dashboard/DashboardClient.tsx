'use client';

import { useState, useMemo } from 'react';
import EmergencyToggle from './components/EmergencyToggle';
import PetHero from './components/PetHero';
import VaccineWallet from './components/VaccineWallet';
import MedicalRecords from './components/MedicalRecords';
import OwnerSOS from './components/OwnerSOS';
import QRPreview from './components/QRPreview';
import RecommendCard from './components/RecommendCard';
import QuickActions from './components/QuickActions';
import QRDisplay from './components/QRDisplay';
import { toggleLostMode } from '@/app/actions/profile';

interface DashboardClientProps {
  initialProfile: any;
}

export default function DashboardClient({ initialProfile }: DashboardClientProps) {
  const pets = initialProfile?.pets || [];
  const [activePetId, setActivePetId] = useState<string | undefined>(pets[0]?.id);
  
  const pet = useMemo(() => pets.find((p: any) => p.id === activePetId) || pets[0], [pets, activePetId]);
  
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // activePetIdが変わった時にemergencyModeのStateを同期
  useMemo(() => {
    setIsEmergencyMode(pet?.is_lost || false);
  }, [pet?.is_lost]);

  const handleToggle = async () => {
    if (!pet) return;
    const next = !isEmergencyMode;
    
    try {
      await toggleLostMode(pet.id, next);
      setIsEmergencyMode(next);
      setToastMsg(next ? '🚨 迷子モードが有効になりました' : '✅ 通常モードに戻りました');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      alert('エラーが発生しました');
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#fdf8f8' }}>
      {showToast && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl text-white font-bold text-sm transition-all ${isEmergencyMode ? 'bg-red-500' : 'bg-teal-500'}`}>
          {toastMsg}
        </div>
      )}

      {/* ペット未登録（新規アカウント）向けの案内表示 */}
      {!pet ? (
        <div className="max-w-lg mx-auto px-4 pt-32 pb-28 space-y-6 text-center">
          <div className="bg-white rounded-[24px] p-8 shadow-lg">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-guide-line text-2xl text-teal-600"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">ようこそ！</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              まずはプロフィール画面から、<br />
              愛犬・愛猫の情報を登録してください。<br />
              登録完了後、このダッシュボードに<br />
              専用のQRコードや各機能が表示されます。
            </p>
            <a href="/profile" className="inline-flex w-full justify-center items-center py-3.5 rounded-2xl font-bold text-white shadow-md transition-all cursor-pointer hover:shadow-lg hover:opacity-90 bg-teal-500">
              プロフィールを設定する
            </a>
          </div>
        </div>
      ) : (
        <>
          {/* ペット切り替えスイッチャー */}
          {pets.length > 0 && (
            <div className="sticky top-0 z-40 bg-[#fdf8f8]/90 backdrop-blur-md border-b border-gray-200/50 py-3">
              <div className="flex items-center gap-3 overflow-x-auto px-4 snap-x hide-scrollbar">
                {pets.map((p: any) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePetId(p.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all shadow-sm snap-start shrink-0 ${
                      activePetId === p.id 
                        ? 'bg-teal-600 text-white font-bold ring-2 ring-teal-600 ring-offset-2 ring-offset-[#fdf8f8]' 
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <i className={`ri-${p.species === 'CAT' ? 'cat' : 'gitlab'}-fill text-xs text-gray-400`}></i>
                      </div>
                    )}
                    <span className="text-sm">{p.name || '名前なし'}</span>
                  </button>
                ))}
                <a 
                  href="/profile?new=true"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-dashed border-gray-300 text-gray-400 hover:text-teal-500 hover:border-teal-500 hover:bg-teal-50 transition-colors shrink-0 snap-start"
                >
                  <i className="ri-add-line text-lg"></i>
                </a>
              </div>
            </div>
          )}

          <PetHero isEmergencyMode={isEmergencyMode} petData={pet} />

      <div className="max-w-lg mx-auto px-4 pb-28 space-y-6 relative z-10">
        <EmergencyToggle isEmergencyMode={isEmergencyMode} onToggle={handleToggle} />
        <QRPreview tagHash={pet?.tags?.[0]?.tag_hash} />
        <VaccineWallet petId={pet?.id} vaccineRecords={pet?.vaccineRecords || []} />
        <MedicalRecords medicalRecords={pet?.medicalRecords || []} />
        <OwnerSOS ownerData={initialProfile} tagHash={pet?.tags?.[0]?.tag_hash} />
        <QuickActions tagHash={pet?.tags?.[0]?.tag_hash} />
        <QRDisplay tagHash={pet?.tags?.[0]?.tag_hash} />
        <RecommendCard petData={pet} />
      </div>
        </>
      )}
    </div>
  );
}
