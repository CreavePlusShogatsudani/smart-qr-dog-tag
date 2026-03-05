'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { QRCodeDisplay } from './QRCodeDisplay';
import { DeletePetButton } from './DeletePetButton';
import { toggleEmergencyMode } from '@/app/admin/actions';

interface Pet {
    id: string;
    name: string;
    breed: string | null;
    age: string | null;
    features: string | null;
    ownerName: string;
    phoneNumber: string;
    email: string | null;
    isEmergency: boolean;
    imageUrl: string | null;
}

interface PetDashboardProps {
    pet: Pet;
    publicProfileUrl: string;
    otherPetsCount: number;
}

export function PetDashboard({ pet, publicProfileUrl, otherPetsCount }: PetDashboardProps) {
    const [isEmergencyMode, setIsEmergencyMode] = useState(pet.isEmergency);
    const [showToast, setShowToast] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleToggle = async () => {
        const nextMode = !isEmergencyMode;

        // UIを即座に更新（楽観的UI）
        setIsEmergencyMode(nextMode);

        startTransition(async () => {
            try {
                await toggleEmergencyMode(pet.id, nextMode);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            } catch (error) {
                // エラー時は元の状態に戻す
                setIsEmergencyMode(!nextMode);
                alert('エラーが発生しました。もう一度お試しください。');
            }
        });
    };

    return (
        <div className="min-h-screen max-w-2xl mx-auto pb-20">
            {showToast && (
                <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-4 duration-300 ${isEmergencyMode ? 'bg-red-500' : 'bg-teal-500'
                    } text-white font-semibold`}>
                    {isEmergencyMode ? '緊急モードが有効になりました' : '通常モードに戻りました'}
                </div>
            )}

            <div className="mb-6 flex items-center justify-between px-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{pet.name}</h1>
                    <p className="text-gray-500 font-medium">管理ダッシュボード</p>
                </div>
                {otherPetsCount > 0 && (
                    <Link href="/admin">
                        <button className="text-sm font-bold text-teal-600 bg-teal-50 px-4 py-2 rounded-xl hover:bg-teal-100 transition-colors">
                            ペットを切り替え
                        </button>
                    </Link>
                )}
            </div>

            {/* Emergency Mode Toggle Card */}
            <div className={`rounded-2xl p-6 mb-6 shadow-sm border transition-all duration-500 mx-2 ${isEmergencyMode
                ? 'bg-gradient-to-br from-red-500 to-orange-600 text-white border-red-400'
                : 'bg-gradient-to-br from-teal-500 to-teal-600 text-white border-teal-400'
                } ${isPending ? 'opacity-80 pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm`}>
                            <i className={`${isEmergencyMode ? 'ri-alarm-warning-line' : 'ri-shield-check-line'} text-2xl`}></i>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">
                                {isEmergencyMode ? '緊急モード' : '通常モード'}
                            </h2>
                            <p className="text-sm opacity-90">
                                {isEmergencyMode ? '迷子捜索中' : '平常時モード'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleToggle}
                        className={`relative w-16 h-8 rounded-full transition-colors cursor-pointer bg-white/30`}
                    >
                        <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isEmergencyMode ? 'translate-x-8' : 'translate-x-0'
                            }`}></div>
                    </button>
                </div>
                <p className={`text-sm ${isEmergencyMode ? 'text-red-50' : 'text-teal-50'} leading-relaxed`}>
                    {isEmergencyMode
                        ? 'QRコードをスキャンすると、発見者に緊急連絡先と医療情報が強調表示されます。'
                        : 'QRコードをスキャンすると、愛犬の基本プロフィールと連絡方法が表示されます。'}
                </p>
            </div>

            {/* Pet Profile Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm overflow-hidden relative mx-2">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg">
                        <i className="ri-user-heart-line text-xl text-purple-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">愛犬のプロフィール</h2>
                </div>

                <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-purple-100 p-1">
                        {pet.imageUrl ? (
                            <img src={pet.imageUrl} alt={pet.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                <i className="ri-image-line text-2xl text-gray-400"></i>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{pet.name}</h3>
                            {pet.breed && <span className="text-[10px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-bold">{pet.breed}</span>}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">{pet.features || '特徴未設定'}</p>
                        <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                            <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">{pet.ownerName}様</span>
                            <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">{pet.phoneNumber}</span>
                            {pet.age && <span className="bg-gray-50 text-gray-500 px-2 py-1 rounded-md border border-gray-100">{pet.age}</span>}
                        </div>
                    </div>
                </div>

                <Link href={`/admin/${pet.id}/edit`}>
                    <button className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-sm active:scale-[0.98]">
                        プロフィールを編集する
                    </button>
                </Link>
            </div>

            {/* QR Code Preview Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm mx-2">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
                        <i className="ri-qr-code-line text-xl text-blue-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">QRコードプレビュー</h2>
                </div>

                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="flex items-start gap-3">
                        <i className="ri-information-line text-lg text-blue-600 mt-0.5"></i>
                        <p className="text-xs text-blue-800 leading-relaxed font-medium">
                            このQRコードをタグに印刷して愛犬に装着してください。
                            発見者がスキャンすると、現在のモードに応じたページが表示されます。
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center mb-6 py-4">
                    <QRCodeDisplay url={publicProfileUrl} />
                    <p className="mt-4 text-xs text-gray-400 font-mono tracking-tighter opacity-70">ID: {pet.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href={publicProfileUrl} target="_blank">
                        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition-all cursor-pointer group text-center">
                            <i className="ri-eye-line text-2xl text-gray-400 group-hover:text-teal-600 mb-2 block"></i>
                            <p className="font-bold text-gray-900 text-sm">公開ページを見る</p>
                            <p className="text-[10px] text-gray-500 mt-1">発見者が見る画面</p>
                        </div>
                    </Link>

                    <button className="bg-gray-50 rounded-2xl p-4 border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer group text-center">
                        <i className="ri-download-cloud-2-line text-2xl text-gray-400 group-hover:text-blue-600 mb-2 block"></i>
                        <p className="font-bold text-gray-900 text-sm">QRを保存する</p>
                        <p className="text-[10px] text-gray-500 mt-1">印刷・共有用</p>
                    </button>
                </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-200 shadow-sm mx-2">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg">
                        <i className="ri-flashlight-line text-xl text-orange-600"></i>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">クイック設定</h2>
                </div>

                <div className="space-y-3">
                    <Link href="/settings" className="flex items-center justify-between w-full py-4 px-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all active:scale-[0.99] border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
                                <i className="ri-notification-line text-lg text-gray-600"></i>
                            </div>
                            <span className="font-bold text-gray-800">スキャン通知設定</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-xl text-gray-300"></i>
                    </Link>

                    <Link href="/help" className="flex items-center justify-between w-full py-4 px-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all active:scale-[0.99] border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm">
                                <i className="ri-customer-service-2-line text-lg text-gray-600"></i>
                            </div>
                            <span className="font-bold text-gray-800">ヘルプ＆サポート</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-xl text-gray-300"></i>
                    </Link>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-12 pt-8 border-t border-gray-100 px-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">危険エリア</h4>
                <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-xl">
                            <i className="ri-delete-bin-line text-xl text-red-600"></i>
                        </div>
                        <div>
                            <p className="font-bold text-red-900">ペット情報の削除</p>
                            <p className="text-xs text-red-600 opacity-80">このペットの全データが完全に削除されます。</p>
                        </div>
                    </div>
                    <DeletePetButton petId={pet.id} petName={pet.name} />
                </div>
            </div>
        </div>
    );
}
