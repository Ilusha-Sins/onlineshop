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
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
            MyShop
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Образи для кожного дня
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-300 md:text-lg md:leading-8">
            Добірка актуального одягу для жінок і чоловіків. Переглядай
            колекції, обирай товари та звертайся щодо замовлення.
          </p>
        </div>

        <div id="collections" className="grid gap-4 sm:grid-cols-2">
          {visibleCategories.map((category) => {
            const categoryImage = category.image;

            return (
              <Link
                href={`/category/${category.slug.current}`}
                key={category._id}
                className="group relative min-h-[260px] overflow-hidden rounded-[2rem] bg-neutral-800 shadow-2xl shadow-black/30 md:min-h-[320px]"
              >
                {categoryImage?.asset?._ref ? (
                  <Image
                    src={urlFor(categoryImage).width(900).height(900).url()}
                    alt={category.title}
                    fill
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-black" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                    Collection
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {category.title}
                  </h2>

                  <span className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-neutral-950 transition group-hover:bg-neutral-200">
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