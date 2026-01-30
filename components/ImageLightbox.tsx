'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  contain?: boolean;
  style?: React.CSSProperties;
}

export default function ImageLightbox({ src, alt, className = '', contain = false, style }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div
        className={`cursor-zoom-in ${className}`}
        style={style}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={`${contain ? 'object-contain' : 'object-cover'} hover:scale-[1.03] transition-transform duration-700 ease-out`}
        />
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Full-size image */}
          <div
            className="relative w-full h-full max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded">
            {alt}
          </p>
        </div>
      )}
    </>
  );
}
