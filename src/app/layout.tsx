import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/ThemeContext';

export const metadata: Metadata = {
  title: 'Jayesh Choudhary — SEC-OPS Terminal',
  description: 'Lead Security Engineer | Detection Engineering | Cloud IR | Threat Intelligence',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}