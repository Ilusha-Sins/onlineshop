import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CatalogSort from "@/components/catalog/CatalogSort";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import ProductGrid from "@/components/product/ProductGrid";

import { sanityClient, urlFor } from "@/lib/sanity/client";
import {
  allCategoriesQuery,
  categoryBySlugQuery,
  getPaginatedProductsByCategoryIdsQuery,
  productsByCategoryIdsCountQuery,
} from "@/lib/sanity/queries";
import type { Category, Product } from "@/lib/types/product";
import {
  getChildCategories,
  getDescendantCategoryIds,
} from "@/lib/utils/categories";
import { getValidSort } from "@/lib/utils/catalogSort";
import {
  getPaginationRange,
  getValidPage,
  PRODUCTS_PER_PAGE,
} from "@/lib/utils/pagination";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string | string[];
    sort?: string | string[];
  }>;
}

export const revalidate = 60;

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = getValidPage(resolvedSearchParams.page);
  const currentSort = getValidSort(resolvedSearchParams.sort);
  const { start, end } = getPaginationRange(currentPage);

  const [category, allCategories] = await Promise.all([
    sanityClient.fetch<Category | null>(categoryBySlugQuery, { slug }),
    sanityClient.fetch<Category[]>(allCategoriesQuery),
  ]);

  if (!category) {
    notFound();
  }

  const descendantCategoryIds = getDescendantCategoryIds(
    allCategories,
    category._id
  );

  const categoryIds = [category._id, ...descendantCategoryIds];
  const childCategories = getChildCategories(allCategories, category._id);

  const [products, totalProducts] = await Promise.all([
    sanityClient.fetch<Product[]>(
      getPaginatedProductsByCategoryIdsQuery(currentSort),
      {
        categoryIds,
        start,
        end,
      }
    ),
    sanityClient.fetch<number>(productsByCategoryIdsCountQuery, {
      categoryIds,
    }),
  ]);

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 opacity-35">
          {category.image?.asset?._ref ? (
            <Image
              src={urlFor(category.image).width(1800).height(700).url()}
              alt={category.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-950" />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

        <Container className="relative py-20 md:py-28">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">
            Category
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
            {category.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Переглядай товари з цієї категорії та її підкатегорій.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {childCategories.length ? (
            <div className="mb-10">
              <h2 className="mb-4 text-lg font-semibold text-neutral-950">
                Підкатегорії
              </h2>

              <div className="flex flex-wrap gap-3">
                {childCategories.map((childCategory) => (
                  <Link
                    href={`/category/${childCategory.slug.current}`}
                    key={childCategory._id}
                    className="rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                  >
                    {childCategory.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                Товари
              </h2>

              <p className="mt-2 text-sm text-neutral-500">
                Знайдено товарів: {totalProducts}
              </p>
            </div>

            <CatalogSort
              currentSort={currentSort}
              basePath={`/category/${slug}`}
            />
          </div>

          <ProductGrid products={products || []} />

          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={PRODUCTS_PER_PAGE}
            basePath={`/category/${slug}`}
            queryParams={{
              sort: currentSort === "newest" ? undefined : currentSort,
            }}
          />
        </Container>
      </section>
    </main>
  );
}