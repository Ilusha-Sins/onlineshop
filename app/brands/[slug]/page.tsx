import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CatalogSort from "@/components/catalog/CatalogSort";
import GenderFilter from "@/components/catalog/GenderFilter";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import SectionHeader from "@/components/ui/SectionHeader";

import { sanityClient, urlFor } from "@/lib/sanity/client";
import {
  brandBySlugQuery,
  getPaginatedProductsByBrandIdQuery,
  productsByBrandIdCountQuery,
} from "@/lib/sanity/queries";
import type { Brand, Product } from "@/lib/types/product";
import { getValidSort } from "@/lib/utils/catalogSort";
import { getValidGender } from "@/lib/utils/genderFilter";
import {
  getPaginationRange,
  getValidPage,
  PRODUCTS_PER_PAGE,
} from "@/lib/utils/pagination";

interface BrandPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string | string[];
    sort?: string | string[];
    gender?: string | string[];
  }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  const { slug } = await params;

  const brand = await sanityClient.fetch<Brand | null>(brandBySlugQuery, {
    slug,
  });

  if (!brand) {
    return {
      title: "Бренд не знайдено — Studio",
    };
  }

  return {
    title: `${brand.title} — Studio`,
    description:
      brand.description || `Переглянути товари бренду ${brand.title}.`,
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: BrandPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = getValidPage(resolvedSearchParams.page);
  const currentSort = getValidSort(resolvedSearchParams.sort);
  const currentGender = getValidGender(resolvedSearchParams.gender);
  const { start, end } = getPaginationRange(currentPage);

  const brand = await sanityClient.fetch<Brand | null>(brandBySlugQuery, {
    slug,
  });

  if (!brand) {
    notFound();
  }

  const [products, totalProducts] = await Promise.all([
    sanityClient.fetch<Product[]>(
      getPaginatedProductsByBrandIdQuery(currentSort),
      {
        brandId: brand._id,
        gender: currentGender,
        start,
        end,
      }
    ),
    sanityClient.fetch<number>(productsByBrandIdCountQuery, {
      brandId: brand._id,
      gender: currentGender,
    }),
  ]);

  const heroImage = brand.image || brand.logo;

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-8 md:py-12">
        <Container>
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="transition hover:text-neutral-950">
              Головна
            </Link>

            <span className="text-neutral-300">/</span>

            <Link href="/brands" className="transition hover:text-neutral-950">
              Бренди
            </Link>

            <span className="text-neutral-300">/</span>

            <span className="text-neutral-950">{brand.title}</span>
          </nav>

          <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr] lg:items-stretch">
            <div className="flex min-h-[300px] flex-col justify-between rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-8 lg:p-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
                  Brand
                </p>

                <h1 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-7xl">
                  {brand.title}
                </h1>

                {brand.description ? (
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
                    {brand.description}
                  </p>
                ) : (
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
                    Переглядай товари цього бренду та фільтруй добірку за
                    лінією Men або Women.
                  </p>
                )}
              </div>

              <div className="mt-10 grid gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-neutral-950">
                    {totalProducts}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-neutral-400">
                    Товарів
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold tracking-tight text-neutral-950">
                    {currentGender === "all" ? "All" : currentGender}
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-neutral-400">
                    Лінія
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-[2rem] bg-neutral-950 shadow-sm shadow-black/[0.04] md:min-h-[300px]">
              {heroImage?.asset?._ref ? (
                <Image
                  src={urlFor(heroImage).width(1200).height(900).url()}
                  alt={brand.title}
                  fill
                  className="object-cover opacity-90"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-black text-7xl font-semibold tracking-[-0.08em] text-white/20">
                  {brand.title.slice(0, 2).toUpperCase()}
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
                  Brand collection
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  {brand.title}
                </h2>
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
              title="Товари бренду"
              description={`Знайдено товарів: ${totalProducts}`}
            />

            <div className="mt-7 flex flex-col gap-5 border-t border-neutral-100 pt-6 xl:flex-row xl:items-center xl:justify-between">
              <GenderFilter
                currentGender={currentGender}
                basePath={`/brands/${slug}`}
                queryParams={{
                  sort: currentSort === "newest" ? undefined : currentSort,
                }}
              />

              <CatalogSort
                currentSort={currentSort}
                basePath={`/brands/${slug}`}
                queryParams={{
                  gender: currentGender === "all" ? undefined : currentGender,
                }}
              />
            </div>
          </div>

          <ProductGrid products={products || []} />

          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts}
            itemsPerPage={PRODUCTS_PER_PAGE}
            basePath={`/brands/${slug}`}
            queryParams={{
              sort: currentSort === "newest" ? undefined : currentSort,
              gender: currentGender === "all" ? undefined : currentGender,
            }}
          />
        </Container>
      </section>
    </main>
  );
}