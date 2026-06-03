import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandCard from "@/components/brand/BrandCard";

import { sanityClient } from "@/lib/sanity/client";
import { allBrandsQuery } from "@/lib/sanity/queries";
import type { Brand } from "@/lib/types/product";

export const revalidate = 60;

export const metadata = {
  title: "Бренди — Studio",
  description: "Переглядай бренди одягу, доступні у каталозі.",
};

export default async function BrandsPage() {
  const brands = await sanityClient.fetch<Brand[]>(allBrandsQuery);

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-10 md:py-14">
        <Container>
          <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
              Brands
            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-7xl">
              Бренди
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
              Добірки товарів за брендами: переглядай окремі сторінки брендів і
              швидко знаходь потрібну лінію.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <SectionHeader
            eyebrow="Brand list"
            title="Усі бренди"
            description={`Знайдено брендів: ${brands.length}`}
          />

          {brands.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Бренди поки не додані"
              description="Після створення brand-документів у Sanity вони з’являться на цій сторінці."
            />
          )}
        </Container>
      </section>
    </main>
  );
}