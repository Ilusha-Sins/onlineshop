import Image from "next/image";
import Link from "next/link";

import { urlFor } from "@/lib/sanity/client";
import type { Category } from "@/lib/types/product";

interface HomeHeroProps {
  categories: Category[];
}

const prioritySlugs = ["women", "men", "kids", "accessories"];

const sortCategories = (categories: Category[]) => {
  return [...categories].sort((a, b) => {
    const aIndex = prioritySlugs.indexOf(a.slug?.current || "");
    const bIndex = prioritySlugs.indexOf(b.slug?.current || "");

    if (aIndex === -1 && bIndex === -1) {
      return (a.order || 0) - (b.order || 0);
    }

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex;
  });
};

const HomeHero: React.FC<HomeHeroProps> = ({ categories }) => {
  const visibleCategories = sortCategories(categories).slice(0, 4);

  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:gap-12 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 md:text-xs">
            MyShop
          </p>

          <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
            Образи для кожного дня
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-300 sm:text-base md:mt-6 md:text-lg md:leading-8">
            Добірка актуального одягу для жінок і чоловіків. Переглядай
            колекції, обирай товари та звертайся щодо замовлення.
          </p>
        </div>

        <div id="collections" className="grid grid-cols-2 gap-3 md:gap-4">
          {visibleCategories.map((category) => {
            const categoryImage = category.image;

            return (
              <Link
                href={`/category/${category.slug.current}`}
                key={category._id}
                className="group relative min-h-[170px] overflow-hidden rounded-[1.5rem] bg-neutral-800 shadow-xl shadow-black/20 sm:min-h-[240px] md:min-h-[320px] md:rounded-[2rem] md:shadow-2xl md:shadow-black/30"
              >
                {categoryImage?.asset?._ref ? (
                  <Image
                    src={urlFor(categoryImage).width(900).height(900).url()}
                    alt={category.title}
                    fill
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 50vw, 40vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-black" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/60 md:text-xs md:tracking-[0.3em]">
                    Collection
                  </p>

                  <h2 className="mt-1 text-xl font-bold md:mt-2 md:text-3xl">
                    {category.title}
                  </h2>

                  <span className="mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-950 transition group-hover:bg-neutral-200 md:mt-5 md:px-5 md:py-2 md:text-sm">
                    Дивитися
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeHero;