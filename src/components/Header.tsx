'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'ホーム', icon: 'ri-home-line' },
    { href: '/profile', label: 'プロフィール', icon: 'ri-user-line' },
    { href: '/settings', label: '設定', icon: 'ri-settings-line' },
    { href: '/help', label: 'ヘルプ', icon: 'ri-question-line' },
  ];

  if (pathname === '/') return null;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="https://public.readdy.ai/ai/img_res/2434676f-b092-4355-bc79-b61057271c75.png" alt="LIEN" className="h-10 w-10 object-contain" />
          <span className="text-lg font-semibold text-gray-900">LIEN</span>
        </Link>
      </div>
    </header>
  );
}
