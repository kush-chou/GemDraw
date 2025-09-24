'use client';

import {
  LayoutDashboard,
  Settings,
  Image,
  Bot,
  GraduationCap,
  PenSquare,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const AppSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard, isActive: pathname === '/' },
    { href: '/workspace', label: 'Workspace', icon: PenSquare, isActive: pathname === '/workspace' },
    { href: '/courses', label: 'Courses', icon: GraduationCap, isActive: pathname.startsWith('/courses') },
    { href: '/gallery', label: 'Canvas Gallery', icon: Image, isActive: pathname === '/gallery' },
  ];

  return (
    <aside className="w-64 flex flex-col border-r bg-background">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <span className="font-semibold text-lg">CogniCanvas</span>
        </div>
      </div>
      <nav className="flex-grow p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Button
                asChild
                variant={item.isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t">
        <div className="space-y-1">
            <Button
                asChild
                variant={pathname === '/settings' ? 'secondary' : 'ghost'}
                className="w-full justify-start"
            >
                <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                </Link>
            </Button>
        </div>
        <div className="p-2 flex justify-center mt-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
