import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandStrip } from '@/components/home/BrandStrip';
import { TrendingSection } from '@/components/home/TrendingSection';
import { EditorialBanner } from '@/components/home/EditorialBanner';
import { NewDropsSection } from '@/components/home/NewDropsSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const metadata = {
  title: 'SOLEVAULT — An Interactive Premium Sneaker Store',
  description:
    'Discover iconic silhouettes, new-season essentials, and limited drops from Nike, Jordan, Adidas, New Balance, ASICS, Puma, and Converse.',
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <BrandStrip />
      <TrendingSection />
      <EditorialBanner />
      <NewDropsSection />
      <BrandStorySection />
      <NewsletterSection />
    </main>
  );
}
