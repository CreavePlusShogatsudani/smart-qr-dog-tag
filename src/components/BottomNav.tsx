'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'ホーム', icon: 'ri-home-line', activeIcon: 'ri-home-fill' },
    { href: '/profile', label: 'プロフィール', icon: 'ri-user-line', activeIcon: 'ri-user-fill' },
    { href: '/store', label: 'ストア', icon: 'ri-store-2-line', activeIcon: 'ri-store-2-fill' },
    { href: '/settings', label: '設定', icon: 'ri-settings-line', activeIcon: 'ri-settings-fill' },
  ];

  if (pathname === '/') return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive ? 'text-pink-500' : 'text-gray-400'
                }`}
            >
              <i className={`${isActive ? item.activeIcon : item.icon} text-2xl`}></i>
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
