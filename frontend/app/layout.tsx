import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BEACON — Empowering Communities Facing Data Center Development',
  description: 'BEACON provides tools, data, and community connections to help residents understand, evaluate, and respond to data center projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
