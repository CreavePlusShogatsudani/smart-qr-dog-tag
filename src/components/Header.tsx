'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isAppPath = pathname.startsWith('/admin') || pathname.startsWith('/profile') || pathname === '/login' || pathname === '/register';
  const logoHref = isAppPath ? '/admin' : '/';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href={logoHref} className="flex items-center gap-2 group transition-transform active:scale-95">
          <img src="https://public.readdy.ai/ai/img_res/2434676f-b092-4355-bc79-b61057271c75.png" alt="PawTag" className="h-9 w-9 object-contain" />
          <span className="text-xl font-['Pacifico'] text-teal-600">PawTag</span>
        </Link>
      </div>
    </header>
  );
}

