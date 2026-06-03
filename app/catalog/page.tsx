import CatalogAudienceSwitch from "@/components/catalog/CatalogAudienceSwitch";
import CatalogSort from "@/components/catalog/CatalogSort";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";

import { sanityClient } from "@/lib/sanity/client";
import {
  getPaginatedProductsByAudienceQuery,
  productsByAudienceCountQuery,
} from "@/lib/sanity/queries";
import type { Product } from "@/lib/types/product";
import { getValidSort } from "@/lib/utils/catalogSort";
import { getValidCatalogGender } from "@/lib/utils/genderFilter";
import {
  getPaginationRange,
  getValidPage,
  PRODUCTS_PER_PAGE,
} from "@/lib/utils/pagination";

interface CatalogPageProps {
  searchParams: Promise<{
    page?: string | string[];
    sort?: string | string[];
    gender?: string | string[];
  }>;
}

export const revalidate = 60;

export const metadata = {
  title: "Каталог — Studio",
  description: "Переглядай чоловічий і жіночий каталог товарів.",
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;

  const currentPage = getValidPage(resolvedSearchParams.page);
  const currentSort = getValidSort(resolvedSearchParams.sort);
  const currentGender = getValidCatalogGender(resolvedSearchParams.gender);
  const { start, end } = getPaginationRange(currentPage);

  const [products, totalProducts] = await Promise.all([
    sanityClient.fetch<Product[]>(
      getPaginatedProductsByAudienceQuery(currentSort),
      {
        gender: currentGender,
        start,
        end,
      }
    ),
    sanityClient.fetch<number>(productsByAudienceCountQuery, {
      gender: currentGender,
    }),
  ]);

  const isMenCatalog = currentGender === "men";

  const pageTitle = isMenCatalog ? "Men catalog" : "Women catalog";
  const pageDescription = isMenCatalog
    ? "Чоловічий каталог товарів: одяг, взуття, аксесуари та брендові речі."
    : "Жіночий каталог товарів: одяг, взуття, аксесуари та брендові речі.";

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-8 md:py-12">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr] lg:items-stretch">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
                  Catalog
                </p>

                <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-7xl">
                  {pageTitle}
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
                  {pageDescription}
                </p>
              </div>

              <div className="mt-10 border-t border-neutral-100 pt-6">
                <CatalogAudienceSwitch
                  currentGender={currentGender}
                  basePath="/catalog"
                  queryParams={{
                    sort: currentSort === "newest" ? undefined : currentSort,
                  }}
                />
              </div>
            </div>

            <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[2rem] bg-neutral-950 p-6 shadow-sm shadow-black/[0.04] md:min-h-[300px] md:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_28rem),linear-gradient(135deg,#2a2a2a,#050505)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-white/50">
                  Selected line
                </p>

                <h2 className="mt-4 text-5xl font-semibold tracking-[-0.06em] text-white md:text-6xl">
                  {isMenCatalog ? "Men" : "Women"}
                </h2>
              </div>

              <div className="relative grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {totalProducts}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">
                    Товарів
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold tracking-tight text-white">
                    {currentPage}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/40">
                    Сторінка
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 md:py-14">
        <Container>
          <div className="mb-8 rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8">
            <SectionHeader
              className="mb-0"
              eyebrow="Products"
              title="Товари"
              description={`Знайдено товарів: ${totalProducts}`}
            />

            <div className="mt-7 flex flex-col gap-5 border-t border-neutral-100 pt-6 xl:flex-row xl:items-center xl:justify-between">
              <CatalogAudienceSwitch
                currentGender={currentGender}
                basePath="/catalog"
                queryParams={{
                  sort: currentSort === "newest" ? undefined : currentSort,
                }}
              />

              <CatalogSort
                currentSort={currentSort}
                basePath="/catalog"
                queryParams={{
                  gender: currentGender,
                }}
              />
            </div>
          </div>

          <ProductGrid products={products || []} />

          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={PRODUCTS_PER_PAGE}
            basePath="/catalog"
            queryParams={{
              sort: currentSort === "newest" ? undefined : currentSort,
              gender: currentGender,
            }}
          />
        </Container>
      </section>
    </main>
  );
}