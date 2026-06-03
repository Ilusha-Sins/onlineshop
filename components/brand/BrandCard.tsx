import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";
import type { Brand } from "@/lib/types/product";

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const coverImage = brand.image || brand.logo;

  return (
    <Link
      href={`/brands/${brand.slug.current}`}
      className="group overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white shadow-sm shadow-black/[0.02] transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/[0.06]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1F1EE]">
        {coverImage?.asset?._ref ? (
          <Image
            src={urlFor(coverImage).width(900).height(700).url()}
            alt={brand.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.035]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-semibold tracking-[-0.06em] text-neutral-300">
            {brand.title.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
            Brand
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            {brand.title}
          </h2>
        </div>
      </div>

      {brand.description ? (
        <div className="p-5">
          <p className="line-clamp-2 text-sm leading-6 text-neutral-500">
            {brand.description}
          </p>
        </div>
      ) : null}
    </Link>
  );
};

export default BrandCard;