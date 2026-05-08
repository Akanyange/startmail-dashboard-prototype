import type { Metadata } from 'next';
import TopBar from './components/TopBar';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBfD Assistant',
  description: 'MBfD Assistant application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50">
        <TopBar />
        {/* Spacer pushes content below the fixed header */}
        <div className="h-12" />
        <main className="mx-auto max-w-300 px-6 py-5">
          {children}
        </main>
      </body>
    </html>
  );
}
