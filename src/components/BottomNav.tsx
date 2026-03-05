'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/shop', label: 'ショップ', icon: 'ri-shopping-bag-line', activeIcon: 'ri-shopping-bag-fill' },
    { href: '/admin', label: '管理', icon: 'ri-dashboard-line', activeIcon: 'ri-dashboard-fill' },
    { href: '/admin/new', label: '登録', icon: 'ri-add-circle-line', activeIcon: 'ri-add-circle-fill' },
    { href: '/settings', label: '設定', icon: 'ri-settings-3-line', activeIcon: 'ri-settings-3-fill' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          let isActive = pathname === item.href;
          if (item.href === '/admin') {
            isActive = pathname.startsWith('/admin') && !pathname.startsWith('/admin/shop') && !pathname.startsWith('/admin/new');
          }
          if (item.href === '/settings') {
            isActive = pathname.startsWith('/settings');
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive ? 'text-teal-600' : 'text-gray-600'
                }`}
            >
              <i className={`${isActive ? item.activeIcon : item.icon} text-2xl`}></i>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
