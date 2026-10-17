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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF7F2] text-[#1A1814] min-h-screen flex flex-col antialiased selection:bg-[#B87333] selection:text-white">
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
