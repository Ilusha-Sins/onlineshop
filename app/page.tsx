import Container from "@/components/ui/Container";
import HomeHero from "@/components/home/HomeHero";
import ProductGrid from "@/components/product/ProductGrid";

import { sanityClient } from "@/lib/sanity/client";
import { allProductsQuery, rootCategoriesQuery } from "@/lib/sanity/queries";
import type { Category, Product } from "@/lib/types/product";

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    sanityClient.fetch<Product[]>(allProductsQuery),
    sanityClient.fetch<Category[]>(rootCategoriesQuery),
  ]);

  const newestProducts = products.slice(0, 8);

  return (
    <main className="min-h-screen bg-neutral-50">
      <HomeHero categories={categories} />

      <section className="py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                New arrivals
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
                Нові товари
              </h2>
            </div>

            
          </div>

          <ProductGrid products={newestProducts} />
        </Container>
      </section>
    </main>
  );
}