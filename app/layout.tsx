import type { Metadata, Viewport } from 'next';
import './globals.css';
import { KaminaShortcut } from './kamina-shortcut';

export const metadata: Metadata = {
  title: 'Kompassi | Pitkäjärven Vaeltajat',
  description:
    'Pitkäjärven Vaeltajat ry:n sisäiset palvelut: Klapi, Tukki, Tapahtumamanageri, nettisivut ja Google Workspace.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = { themeColor: '#221E5D' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fi">
      <body>
        <KaminaShortcut />
        {children}
      </body>
    </html>
  );
}
