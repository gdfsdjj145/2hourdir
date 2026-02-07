import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2 Hour Builder',
  description: '2 Hour Builder - 把零碎时间变成真实产出',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
