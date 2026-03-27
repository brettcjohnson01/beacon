import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BEACON — Community Network',
  description: 'Connect with communities facing similar data center projects.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
