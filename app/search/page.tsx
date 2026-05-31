import CatalogSort from "@/components/catalog/CatalogSort";
import ProductGrid from "@/components/product/ProductGrid";
import SearchForm from "@/components/search/SearchForm";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";

import { sanityClient } from "@/lib/sanity/client";
import {
  getPaginatedSearchProductsQuery,
  searchProductsCountQuery,
} from "@/lib/sanity/queries";
import type { Product } from "@/lib/types/product";
import { getValidSort } from "@/lib/utils/catalogSort";
import {
  getPaginationRange,
  getValidPage,
  PRODUCTS_PER_PAGE,
} from "@/lib/utils/pagination";

interface SearchPageProps {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
    sort?: string | string[];
  }>;
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const rawQuery = resolvedSearchParams.query;
  const query = Array.isArray(rawQuery)
    ? rawQuery[0]?.trim() || ""
    : rawQuery?.trim() || "";

  const currentPage = getValidPage(resolvedSearchParams.page);
  const currentSort = getValidSort(resolvedSearchParams.sort);
  const { start, end } = getPaginationRange(currentPage);

  const searchPattern = `*${query}*`;

  const [products, totalProducts] = query
    ? await Promise.all([
        sanityClient.fetch<Product[]>(
          getPaginatedSearchProductsQuery(currentSort),
          {
            searchPattern,
            start,
            end,
          }
        ),
        sanityClient.fetch<number>(searchProductsCountQuery, {
          searchPattern,
        }),
      ])
    : [[], 0];

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white py-14">
        <Container>
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
            Search
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">
            Пошук товарів
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
            Шукай товари за назвою, брендом, категорією, матеріалом або описом.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchForm defaultValue={query} />
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {query ? (
            <>
              <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                    Results
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                    Результати для: “{query}”
                  </h2>

                  <p className="mt-2 text-sm text-neutral-500">
                    Знайдено товарів: {totalProducts}
                  </p>
                </div>

                <CatalogSort
                  currentSort={currentSort}
                  basePath="/search"
                  queryParams={{ query }}
                />
              </div>

              <ProductGrid products={products || []} />

              <Pagination
                currentPage={currentPage}
                totalItems={totalProducts}
                itemsPerPage={PRODUCTS_PER_PAGE}
                basePath="/search"
                queryParams={{
                  query,
                  sort: currentSort === "newest" ? undefined : currentSort,
                }}
              />
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white p-10 text-center">
              <h2 className="text-2xl font-bold text-neutral-950">
                Введи запит для пошуку
              </h2>

              <p className="mt-3 text-neutral-500">
                Наприклад: dress, hoodie, women, cotton, black.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}