'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-gray-900';
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Portal Lowongan Kerja
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/')} transition-colors`}
            >
              🏠 Beranda
            </Link>
            <Link 
              href="/jobs" 
              className={`${isActive('/jobs')} transition-colors`}
            >
              💼 Lowongan
            </Link>
            <Link 
              href="/admin" 
              className={`${isActive('/admin')} transition-colors`}
            >
              🔐 Admin
            </Link>
          </nav>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">
              <span className="sr-only">Open menu</span>
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
