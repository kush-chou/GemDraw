
'use client';

import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, MessageSquare, Settings, Image, Bot, GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <span className="font-semibold text-lg">CogniCanvas</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip="Dashboard"
            >
              <Link href="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/workspace'}
              tooltip="Workspace"
            >
              <Link href="/workspace">
                <MessageSquare />
                <span>Workspace</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith('/courses')}
              tooltip="Courses"
            >
              <Link href="/courses">
                <GraduationCap />
                <span>Courses</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/chats'}
              tooltip="All Chats"
            >
              <Link href="/chats">
                <MessageSquare />
                <span>All Chats</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/gallery'}
              tooltip="Gallery"
            >
              <Link href="/gallery">
                <Image />
                <span>Gallery</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton
                asChild
                isActive={pathname === '/settings'}
                tooltip="Settings"
              >
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
          </SidebarMenuItem>
           <SidebarMenuItem>
             <div className="flex items-center gap-2 p-2 rounded-md">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm">
                    <span className="font-semibold">User</span>
                    <span className="text-muted-foreground">user@example.com</span>
                </div>
            </div>
           </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export default AppSidebar;
