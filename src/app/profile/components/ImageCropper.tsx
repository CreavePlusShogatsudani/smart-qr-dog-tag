'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedBlob: Blob, croppedUrl: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

export default function ImageCropper({ imageSrc, onCropComplete, onCancel, aspectRatio = 1 }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels) return;
    try {
      setIsProcessing(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        const croppedUrl = URL.createObjectURL(croppedBlob);
        onCropComplete(croppedBlob, croppedUrl);
      }
    } catch (e) {
      console.error(e);
      alert('画像の切り抜きに失敗しました');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* 操作ヘッダー */}
      <div className="flex items-center justify-between px-4 py-4 bg-black/80 text-white absolute top-0 left-0 right-0 z-10">
        <button onClick={onCancel} className="text-sm font-bold opacity-80 hover:opacity-100">
          キャンセル
        </button>
        <span className="font-bold text-sm">写真の調整</span>
        <button 
          onClick={handleApply} 
          disabled={isProcessing}
          className="text-sm font-bold text-teal-400 disabled:opacity-50"
        >
          {isProcessing ? '処理中...' : '完了'}
        </button>
      </div>

      {/* クロッパー領域 */}
      <div className="relative flex-1 w-full bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={onCropChange}
          onCropComplete={onCropCompleteHandler}
          onZoomChange={onZoomChange}
          cropShape="rect"
          showGrid={true}
        />
      </div>

      {/* 下部のズームコントロール */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-6 z-10">
        <div className="flex items-center gap-4 max-w-sm mx-auto">
          <i className="ri-image-line text-white/70 text-lg"></i>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => {
              setZoom(Number(e.target.value));
            }}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <i className="ri-image-fill text-white/70 text-2xl"></i>
        </div>
        <p className="text-center text-white/50 text-xs mt-4">
          画像をスワイプして位置を調整し、スライダーで拡大・縮小できます
        </p>
      </div>
    </div>
  );
}
