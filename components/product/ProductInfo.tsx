import Link from "next/link";

import type { Product } from "@/lib/types/product";
import FavoriteButton from "@/components/favorites/FavoriteButton";
import Badge from "@/components/ui/Badge";
import Price from "@/components/ui/Price";

interface ProductInfoProps {
  product: Product;
}

const formatList = (items?: string[]) => {
  if (!items?.length) {
    return null;
  }

  return items.join(", ");
};

const genderLabels: Record<string, string> = {
  women: "Жінки",
  men: "Чоловіки",
  unisex: "Унісекс",
  kids: "Діти",
};

const seasonLabels: Record<string, string> = {
  spring: "Весна",
  summer: "Літо",
  autumn: "Осінь",
  winter: "Зима",
  "all-season": "Всесезон",
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const colorNames = product.colors
    ?.map((color) => color.name)
    .filter(Boolean);

  const genderLabel = product.gender ? genderLabels[product.gender] : undefined;
  const seasonLabel = product.season ? seasonLabels[product.season] : undefined;

  const hasDiscount =
    typeof product.oldPrice === "number" && product.oldPrice > product.price;

  const details = [
    {
      label: "Бренд",
      value: product.brand,
    },
    {
      label: "Категорія",
      value: product.category?.title,
    },
    {
      label: "Лінія",
      value: genderLabel,
    },
    {
      label: "Розміри",
      value: formatList(product.sizes),
    },
    {
      label: "Кольори",
      value: formatList(colorNames),
    },
    {
      label: "Матеріал",
      value: product.material,
    },
    {
      label: "Сезон",
      value: seasonLabel,
    },
    {
      label: "Наявність",
      value: product.isAvailable === false ? "Немає в наявності" : "В наявності",
    },
  ].filter((item) => item.value);

  return (
    <section className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {product.category?.slug?.current ? (
            <Link href={`/category/${product.category.slug.current}`}>
              <Badge variant="outline" className="normal-case tracking-normal">
                {product.category.title}
              </Badge>
            </Link>
          ) : null}

          {product.brand ? (
            <Badge variant="neutral" className="normal-case tracking-normal">
              {product.brand}
            </Badge>
          ) : null}

          {hasDiscount ? <Badge variant="sale">Sale</Badge> : null}

          {product.isAvailable === false ? (
            <Badge variant="outline" className="normal-case tracking-normal">
              Немає в наявності
            </Badge>
          ) : null}
        </div>

        <div className="shrink-0">
          <FavoriteButton product={product} />
        </div>
      </div>

      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-neutral-950 md:text-5xl">
        {product.name}
      </h1>

      <div className="mt-5">
        <Price
          price={product.price}
          oldPrice={product.oldPrice}
          className="[&>span:first-child]:text-2xl [&>span:first-child]:md:text-3xl"
        />
      </div>

      {product.description ? (
        <div className="mt-8 border-t border-neutral-100 pt-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
            Опис
          </h2>

          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-neutral-600 md:text-base md:leading-8">
            {product.description}
          </p>
        </div>
      ) : null}

      {product.sizes?.length ? (
        <div className="mt-8 border-t border-neutral-100 pt-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
            Розміри
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {product.colors?.length ? (
        <div className="mt-8 border-t border-neutral-100 pt-7">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
            Кольори
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <div
                key={`${color.name}-${color.hex}`}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700"
              >
                {color.hex ? (
                  <span
                    className="h-4 w-4 rounded-full border border-neutral-300"
                    style={{ backgroundColor: color.hex }}
                  />
                ) : null}

                {color.name}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {details.length ? (
        <div className="mt-8 rounded-[1.5rem] border border-neutral-200/80 bg-[#F7F7F5] p-5 md:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400">
            Характеристики
          </h2>

          <dl className="mt-4 divide-y divide-neutral-200/80">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="grid grid-cols-[0.9fr_1.1fr] gap-4 py-3 text-sm"
              >
                <dt className="text-neutral-500">{detail.label}</dt>

                <dd className="text-right font-semibold text-neutral-950">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  );
};

export default ProductInfo;