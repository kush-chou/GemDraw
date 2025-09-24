import type {Metadata} from 'next';
import './globals.css';
import {Sidebar, SidebarProvider, SidebarInset} from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';

export const metadata: Metadata = {
  title: 'CogniCanvas',
  description: 'Collaborative drawing and chat application.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar variant="inset" collapsible="icon">
            <AppSidebar />
          </Sidebar>
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
