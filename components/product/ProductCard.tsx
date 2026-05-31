import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";
import type { Product, SanityImage } from "@/lib/types/product";
import Price from "@/components/ui/Price";
import FavoriteButton from "@/components/favorites/FavoriteButton";

interface ProductCardProps {
  product: Product;
}

const getProductImage = (product: Product): SanityImage | undefined => {
  const image = product.images?.[0];

  if (!image?.asset?._ref) {
    return undefined;
  }

  return image;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productImage = getProductImage(product);
  const productHref = `/products/${product.slug.current}`;

  return (
    <article className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute right-4 top-4 z-10">
        <FavoriteButton product={product} />
      </div>

      <Link href={productHref} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
          {productImage ? (
            <Image
              src={urlFor(productImage).width(700).height(900).url()}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-400">
              Немає фото
            </div>
          )}

          {product.oldPrice && product.oldPrice > product.price ? (
            <span className="absolute left-4 top-4 rounded-full bg-neutral-950 px-3 py-1 text-xs font-semibold text-white">
              Sale
            </span>
          ) : null}
        </div>

        <div className="p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {product.category?.title || "Товар"}
          </p>

          <h3 className="mt-2 line-clamp-2 text-base font-semibold text-neutral-950">
            {product.name}
          </h3>

          <div className="mt-3">
            <Price price={product.price} oldPrice={product.oldPrice} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;