"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedIndex = Math.max(images.indexOf(selectedImage), 0);
  const hasMultipleImages = images.length > 1;

  function showPreviousImage() {
    const nextIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[nextIndex]);
  }

  function showNextImage() {
    const nextIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedImage(images[nextIndex]);
  }

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#eadbd5] bg-[#fffdf9] shadow-sm shadow-[#eadbd5]">
        <Image
          src={selectedImage}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-4"
          priority
        />
        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="View previous product image"
              className="absolute left-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf5]/95 text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label="View next product image"
              className="absolute right-4 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf5]/95 text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </>
        )}
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label="Expand image"
          className="absolute bottom-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf5]/95 text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
        >
          <Maximize2 aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      {hasMultipleImages && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`View product image ${index + 1}`}
              className={`relative aspect-square overflow-hidden rounded-2xl border bg-[#fffdf9] transition ${
                selectedImage === image
                  ? "border-[#b8837a] ring-2 ring-[#eadbd5]"
                  : "border-[#eadbd5] hover:border-[#cfa99f]"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 640px) 20vw, 25vw"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}

      {isExpanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A4A4A]/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} expanded image`}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-5xl rounded-3xl bg-[#fffdf9] p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Close expanded image"
              className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fffaf5] text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
            <div className="relative h-full min-h-[60vh]">
              <Image
                src={selectedImage}
                alt={title}
                fill
                sizes="100vw"
                className="object-contain p-4"
              />
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="View previous product image"
                    className="absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf5]/95 text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
                  >
                    <ChevronLeft aria-hidden="true" className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="View next product image"
                    className="absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#fffaf5]/95 text-[#8a7467] shadow-sm shadow-[#eadbd5] transition hover:bg-[#f3e8e2]"
                  >
                    <ChevronRight aria-hidden="true" className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
