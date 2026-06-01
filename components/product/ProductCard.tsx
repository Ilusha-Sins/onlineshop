import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import Price from "@/components/ui/Price";
import { urlFor } from "@/lib/sanity/client";
import type { Product, SanityImage } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

const getMainProductImage = (product: Product): SanityImage | undefined => {
  const mainImage = product.images?.[0];

  if (!mainImage?.asset?._ref) {
    return undefined;
  }

  return mainImage;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const mainImage = getMainProductImage(product);
  const productHref = `/products/${product.slug.current}`;
  const hasDiscount = product.oldPrice && product.oldPrice > product.price;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:rounded-3xl">
      <div className="absolute right-2 top-2 z-10 md:right-4 md:top-4">
        <FavoriteButton product={product} />
      </div>

      <Link href={productHref} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(700).height(900).url()}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-neutral-400 md:text-sm">
              Немає фото
            </div>
          )}

          {hasDiscount ? (
            <span className="absolute left-2 top-2 rounded-full bg-neutral-950 px-2.5 py-1 text-[10px] font-semibold text-white md:left-4 md:top-4 md:px-3 md:text-xs">
              Sale
            </span>
          ) : null}

          {product.isAvailable === false ? (
            <span className="absolute bottom-2 left-2 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-950 md:bottom-4 md:left-4 md:px-3 md:text-xs">
              Немає
            </span>
          ) : null}
        </div>

        <div className="p-3 md:p-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400 md:text-xs md:tracking-[0.2em]">
            {product.category?.title || "Товар"}
          </p>

          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-neutral-950 md:mt-2 md:text-base">
            {product.name}
          </h3>

          <div className="mt-2 md:mt-3">
            <Price price={product.price} oldPrice={product.oldPrice} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;