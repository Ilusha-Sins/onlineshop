import Image from "next/image";
import Link from "next/link";

import FavoriteButton from "@/components/favorites/FavoriteButton";
import Badge from "@/components/ui/Badge";
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
  const hasDiscount =
    typeof product.oldPrice === "number" && product.oldPrice > product.price;
  const isUnavailable = product.isAvailable === false;

  return (
    <article className="group relative h-full overflow-hidden rounded-[1.5rem] border border-neutral-200/80 bg-white shadow-sm shadow-black/[0.02] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/[0.06] md:rounded-[1.75rem]">
      <div className="absolute right-3 top-3 z-20 md:right-4 md:top-4">
        <FavoriteButton product={product} />
      </div>

      <Link href={productHref} className="flex h-full flex-col">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F1F1EE]">
          {mainImage ? (
            <Image
              src={urlFor(mainImage).width(900).height(1200).url()}
              alt={product.name}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs font-medium text-neutral-400 md:text-sm">
              Немає фото
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

          <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2 md:left-4 md:top-4">
            {hasDiscount ? <Badge variant="sale">Sale</Badge> : null}

            {isUnavailable ? (
              <Badge variant="outline" className="normal-case tracking-normal">
                Немає
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 md:p-5">
          <div className="min-h-[4.8rem]">
            <p className="truncate text-[10px] font-medium uppercase tracking-[0.22em] text-neutral-400 md:text-[11px]">
              {product.category?.title || product.brand || "Товар"}
            </p>

            <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-5 tracking-tight text-neutral-950 md:text-base md:leading-6">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto pt-3">
            <Price price={product.price} oldPrice={product.oldPrice} />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;