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
      <div className="flex aspect-[4/5] items-center justify-center rounded-[2rem] bg-neutral-100 text-neutral-400">
        Немає фото
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100">
        <Image
          src={urlFor(selectedImage).width(1100).height(1400).url()}
          alt={productName}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {validImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {validImages.map((image, index) => {
            const isActive = selectedImageIndex === index;

            return (
              <button
                key={image._key || image.asset._ref}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
                  isActive
                    ? "border-neutral-950"
                    : "border-neutral-200 hover:border-neutral-500"
                }`}
              >
                <Image
                  src={urlFor(image).width(300).height(300).url()}
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