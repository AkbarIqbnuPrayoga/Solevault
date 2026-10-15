import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import type { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | SOLEVAULT',
    };
  }

  return {
    title: `${product.name} by ${product.brand}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | SOLEVAULT`,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.brand === product.brand || p.category === product.category)
  );

  return (
    <ProductDetailView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
