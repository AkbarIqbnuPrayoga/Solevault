'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallbackSrc,
  sizes,
  fill,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  // If fill is true and no sizes prop is passed, provide optimal responsive sizes to prevent Next.js console warning
  const computedSizes =
    fill && !sizes
      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw'
      : sizes;

  // If error occurred, render high-style SVG placeholder
  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 p-6 ${className || ''}`}
      >
        <svg
          className="w-16 h-16 text-zinc-600 mb-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.5 13h6" />
          <path d="m2 17 3-7 4 1 5-4 4 1 4 4" />
          <path d="M2 17h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2Z" />
        </svg>
        <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-500">
          SOLEVAULT ARCHIVE
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      sizes={computedSizes}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
