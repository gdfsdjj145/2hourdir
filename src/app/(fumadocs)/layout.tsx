import { RootProvider } from 'fumadocs-ui/provider';
import type { ReactNode } from 'react';
import 'fumadocs-ui/style.css';

export default function FumadocsLayout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </RootProvider>
  );
}
