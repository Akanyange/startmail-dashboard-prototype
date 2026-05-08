'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Concept Document', href: '/concept' },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-12 items-center gap-3 border-b border-gray-200 bg-white px-4 shadow-sm">
      {/* Logo */}
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E20074] text-xs font-bold text-white">
        T
      </div>

      <span className="shrink-0 text-[0.78rem] font-semibold text-gray-500">MBfD Assistant</span>

      {/* Nav tabs */}
      <nav className="flex h-full items-end gap-0">
        {navItems.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'relative flex h-12 items-center px-3 text-[0.8rem] transition-colors no-underline',
                isActive
                  ? 'text-[#E20074] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#E20074]'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Settings className="h-[18px] w-[18px] text-gray-500" />
      </Button>

      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  );
}
