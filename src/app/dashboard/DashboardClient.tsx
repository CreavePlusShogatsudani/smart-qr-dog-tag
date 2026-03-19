'use client';

import { useState } from 'react';
import EmergencyToggle from './components/EmergencyToggle';
import PetHero from './components/PetHero';
import VaccineWallet from './components/VaccineWallet';
import MedicalRecords from './components/MedicalRecords';
import OwnerSOS from './components/OwnerSOS';
import QRPreview from './components/QRPreview';
import RecommendCard from './components/RecommendCard';
import QuickActions from './components/QuickActions';
import { toggleLostMode } from '@/app/actions/profile';

interface DashboardClientProps {
  initialProfile: any;
}

export default function DashboardClient({ initialProfile }: DashboardClientProps) {
  const pet = initialProfile?.pets?.[0]; // ひとまず最初のペットを表示
  const [isEmergencyMode, setIsEmergencyMode] = useState(pet?.is_lost || false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

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

      <PetHero isEmergencyMode={isEmergencyMode} petData={pet} />

      <div className="max-w-lg mx-auto px-4 pb-28 space-y-6 relative z-10">
        <EmergencyToggle isEmergencyMode={isEmergencyMode} onToggle={handleToggle} />
        <QRPreview tagHash={pet?.tags?.[0]?.tag_hash} />
        <VaccineWallet petId={pet?.id} vaccineRecords={pet?.vaccineRecords || []} />
        <MedicalRecords medicalRecords={pet?.medicalRecords || []} />
        <OwnerSOS ownerData={initialProfile} tagHash={pet?.tags?.[0]?.tag_hash} />
        <QuickActions tagHash={pet?.tags?.[0]?.tag_hash} />
        <RecommendCard petData={pet} />
      </div>
    </div>
  );
}
