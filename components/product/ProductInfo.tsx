import Link from "next/link";

import type { Product } from "@/lib/types/product";
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

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const colorNames = product.colors
    ?.map((color) => color.name)
    .filter(Boolean);

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
      value: product.season,
    },
    {
      label: "Наявність",
      value: product.isAvailable === false ? "Немає в наявності" : "В наявності",
    },
  ].filter((item) => item.value);

  return (
    <div>
      {product.category?.slug?.current ? (
        <Link
          href={`/category/${product.category.slug.current}`}
          className="inline-flex rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200"
        >
          {product.category.title}
        </Link>
      ) : null}

      <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
        {product.name}
      </h1>

      <div className="mt-5">
        <Price price={product.price} oldPrice={product.oldPrice} />
      </div>

      {product.description ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-950">Опис</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
            {product.description}
          </p>
        </div>
      ) : null}

      {product.sizes?.length ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-950">Розміри</h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {product.colors?.length ? (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-950">Кольори</h2>

          <div className="mt-3 flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <div
                key={`${color.name}-${color.hex}`}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700"
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
        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-950">
            Характеристики
          </h2>

          <dl className="mt-5 divide-y divide-neutral-100">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex justify-between gap-6 py-3 text-sm"
              >
                <dt className="text-neutral-500">{detail.label}</dt>
                <dd className="text-right font-medium text-neutral-950">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </div>
  );
};

export default ProductInfo;