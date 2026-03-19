import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ThemeRegistry from './components/ThemeRegistry';
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
    <html lang="en">
      <body>
        <ThemeRegistry>
          <TopBar />
          {/* Toolbar spacer pushes content below the fixed AppBar */}
          <Toolbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
