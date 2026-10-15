import type { Metadata } from 'next';
import './globals.css';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { SizeGuideModal } from '@/components/ui/SizeGuideModal';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: {
    default: 'SOLEVAULT — Premium Sneaker Store',
    template: '%s | SOLEVAULT',
  },
  description:
    'Curated sneaker boutique showcasing iconic silhouettes from Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.',
  keywords: [
    'sneakers',
    'sneaker store',
    'Nike',
    'Jordan 1',
    'Adidas Samba',
    'New Balance 9060',
    'ASICS Kayano',
    'streetwear',
    'footwear',
  ],
  authors: [{ name: 'SOLEVAULT' }],
  openGraph: {
    title: 'SOLEVAULT — An Interactive Premium Sneaker Store',
    description:
      'Curated sneaker boutique showcasing iconic silhouettes from Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.',
    url: 'https://solevault.demo',
    siteName: 'SOLEVAULT',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#08080a] text-zinc-100 min-h-screen flex flex-col antialiased selection:bg-[#d4ff00] selection:text-black">
        <AnnouncementBar />
        <Navbar />
        
        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <SearchOverlay />
        <QuickViewModal />
        <SizeGuideModal />
        <ToastContainer />
      </body>
    </html>
  );
}
