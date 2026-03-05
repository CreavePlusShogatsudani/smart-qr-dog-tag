'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { deletePet } from '@/app/admin/actions';

interface DeletePetButtonProps {
    petId: string;
    petName: string;
    variant?: 'outline' | 'ghost' | 'danger';
}

export function DeletePetButton({ petId, petName, variant = 'outline' }: DeletePetButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm(`「${petName}」の情報を削除してもよろしいですか？\nこの操作は取り消せません。`)) {
            return;
        }

        setIsDeleting(true);
        try {
            await deletePet(petId);
        } catch (error) {
            console.error('Failed to delete pet:', error);
            alert('削除に失敗しました。');
            setIsDeleting(false);
        }
    };

    const baseStyles = "inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg transition-all justify-center";
    const variants = {
        outline: "bg-white border border-red-100 text-red-600 hover:bg-red-50",
        ghost: "text-red-500 hover:bg-red-50",
        danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm"
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`${baseStyles} ${variants[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            {isDeleting ? (
                <Loader2 size={16} className="animate-spin" />
            ) : (
                <Trash2 size={16} />
            )}
            削除
        </button>
    );
}
