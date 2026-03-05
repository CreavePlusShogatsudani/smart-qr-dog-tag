'use client';

import { useFormStatus } from 'react-dom';
import { Save, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
    label: string;
    loadingLabel?: string;
    icon?: React.ReactNode;
}

export function SubmitButton({
    label,
    loadingLabel = '処理中...',
    icon = <Save size={20} />
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-lg shadow-sm transition-all flex justify-center items-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
            {pending ? (
                <>
                    <Loader2 size={20} className="animate-spin" />
                    {loadingLabel}
                </>
            ) : (
                <>
                    {icon}
                    {label}
                </>
            )}
        </button>
    );
}
