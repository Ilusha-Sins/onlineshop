import CatalogSort from "@/components/catalog/CatalogSort";
import GenderFilter from "@/components/catalog/GenderFilter";
import ProductGrid from "@/components/product/ProductGrid";
import SearchForm from "@/components/search/SearchForm";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";

import { sanityClient } from "@/lib/sanity/client";
import {
  getPaginatedSearchProductsQuery,
  searchProductsCountQuery,
} from "@/lib/sanity/queries";
import type { Product } from "@/lib/types/product";
import { getValidSort } from "@/lib/utils/catalogSort";
import { getValidGender } from "@/lib/utils/genderFilter";
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
    gender?: string | string[];
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
  const currentGender = getValidGender(resolvedSearchParams.gender);
  const { start, end } = getPaginationRange(currentPage);

  const searchPattern = `*${query}*`;

  const [products, totalProducts] = query
    ? await Promise.all([
        sanityClient.fetch<Product[]>(
          getPaginatedSearchProductsQuery(currentSort),
          {
            searchPattern,
            gender: currentGender,
            start,
            end,
          }
        ),
        sanityClient.fetch<number>(searchProductsCountQuery, {
          searchPattern,
          gender: currentGender,
        }),
      ])
    : [[], 0];

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-8 md:py-12">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr] lg:items-stretch">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
                  Search
                </p>

                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-7xl">
                  Пошук товарів
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
                  Шукай товари за назвою, брендом, категорією, матеріалом або
                  описом.
                </p>
              </div>

              <div className="mt-10 border-t border-neutral-100 pt-6">
                <SearchForm defaultValue={query} />
              </div>
            </div>

            <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] bg-neutral-950 p-6 shadow-sm shadow-black/[0.04] md:min-h-[300px] md:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_28rem),linear-gradient(135deg,#2a2a2a,#050505)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-white/50">
                  Current query
                </p>

                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">
                  {query ? `“${query}”` : "Введи запит"}
                </h2>
              </div>

              <div className="relative grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {totalProducts}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">
                    Знайдено
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {currentGender === "all" ? "All" : currentGender}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">
                    Лінія
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-14">
        <Container>
          {query ? (
            <>
              <div className="mb-8 rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8">
                <SectionHeader
                  className="mb-0"
                  eyebrow="Results"
                  title="Результати пошуку"
                  description={`Знайдено товарів: ${totalProducts}`}
                />

                <div className="mt-7 flex flex-col gap-5 border-t border-neutral-100 pt-6 xl:flex-row xl:items-center xl:justify-between">
                  <GenderFilter
                    currentGender={currentGender}
                    basePath="/search"
                    queryParams={{
                      query,
                      sort: currentSort === "newest" ? undefined : currentSort,
                    }}
                  />

                  <CatalogSort
                    currentSort={currentSort}
                    basePath="/search"
                    queryParams={{
                      query,
                      gender:
                        currentGender === "all" ? undefined : currentGender,
                    }}
                  />
                </div>
              </div>

              {totalProducts > 0 ? (
                <>
                  <ProductGrid products={products || []} />

                  <Pagination
                    currentPage={currentPage}
                    totalItems={totalProducts}
                    itemsPerPage={PRODUCTS_PER_PAGE}
                    basePath="/search"
                    queryParams={{
                      query,
                      sort: currentSort === "newest" ? undefined : currentSort,
                      gender:
                        currentGender === "all" ? undefined : currentGender,
                    }}
                  />
                </>
              ) : (
                <EmptyState
                  title="Нічого не знайдено"
                  description="Спробуй змінити запит, перевірити написання або пошукати за брендом чи категорією."
                />
              )}
            </>
          ) : (
            <EmptyState
              title="Введи запит для пошуку"
              description="Наприклад: hoodie, Nike, shirts, cotton або black."
            />
          )}
        </Container>
      </section>
    </main>
  );
}