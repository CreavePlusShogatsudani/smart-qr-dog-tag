'use client'

import { useState, useRef } from 'react'
import { supabase, STORAGE_BUCKET, isSupabaseConfigured } from '@/lib/supabase'

interface ImageUploadProps {
    currentImageUrl?: string | null
    petId: string
}

export function ImageUpload({ currentImageUrl, petId }: ImageUploadProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(currentImageUrl ?? null)
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            alert('画像サイズは5MB以下にしてください')
            return
        }

        if (!isSupabaseConfigured()) {
            alert('画像アップロードは現在設定中です。しばらくお待ちください。')
            return
        }

        setUploading(true)
        try {
            const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
            const path = `${petId}/profile.${ext}`
            // 日本語ファイル名はヘッダーエラーになるため ASCII 名に変換
            const renamedFile = new File([file], `profile.${ext}`, { type: file.type })

            const { error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(path, renamedFile, { upsert: true })

            if (error) throw error

            const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
            // キャッシュバスター付きURLをセット
            setImageUrl(`${data.publicUrl}?t=${Date.now()}`)
        } catch (err: unknown) {
            console.error(err)
            const msg = err instanceof Error ? err.message : JSON.stringify(err)
            alert(`アップロードに失敗しました: ${msg}`)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex justify-center mb-10">
            {/* hidden input でフォームにURLを含める */}
            <input type="hidden" name="imageUrl" value={imageUrl ?? ''} />

            <div className="relative group">
                <div
                    className="w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center border-4 border-purple-50 p-1 overflow-hidden cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="ペット画像"
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                            <i className="ri-image-line text-4xl text-gray-300"></i>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    disabled={uploading}
                    onClick={() => inputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg cursor-pointer transform hover:scale-110 active:scale-95 disabled:opacity-50"
                >
                    {uploading
                        ? <i className="ri-loader-4-line text-xl animate-spin"></i>
                        : <i className="ri-camera-line text-xl"></i>
                    }
                </button>

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}
