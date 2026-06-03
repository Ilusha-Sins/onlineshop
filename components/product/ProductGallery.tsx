"use client";

import { useState } from "react";
import Image from "next/image";

import { urlFor } from "@/lib/sanity/client";
import type { SanityImage } from "@/lib/types/product";

interface ProductGalleryProps {
  images?: SanityImage[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images = [],
  productName,
}) => {
  const validImages = images.filter((image) => image?.asset?._ref);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedImage = validImages[selectedImageIndex] || validImages[0];

  if (!selectedImage) {
    return (
      <div className="flex aspect-[4/5] min-h-[420px] items-center justify-center rounded-[2rem] border border-dashed border-neutral-300 bg-white text-sm font-medium text-neutral-400 shadow-sm shadow-black/[0.02]">
        Немає фото
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-[#F1F1EE] shadow-sm shadow-black/[0.03]">
        <Image
          src={urlFor(selectedImage).width(1400).height(1800).url()}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 48vw"
        />
      </div>

      {validImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 lg:grid-cols-4">
          {validImages.map((image, index) => {
            const isActive = selectedImageIndex === index;

            return (
              <button
                key={image._key || image.asset._ref}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-2xl border bg-white transition ${
                  isActive
                    ? "border-neutral-950 ring-2 ring-neutral-950/10"
                    : "border-neutral-200 hover:border-neutral-500"
                }`}
                aria-label={`Відкрити фото ${index + 1}`}
                aria-pressed={isActive}
              >
                <Image
                  src={urlFor(image).width(320).height(320).url()}
                  alt={`${productName} фото ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProductGallery;