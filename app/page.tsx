import Container from "@/components/ui/Container";
import HomeHero from "@/components/home/HomeHero";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";

import { sanityClient } from "@/lib/sanity/client";
import { allProductsQuery } from "@/lib/sanity/queries";
import type { Product } from "@/lib/types/product";

export const revalidate = 60;

export default async function HomePage() {
  const products = await sanityClient.fetch<Product[]>(allProductsQuery);

  const newestProducts = products.slice(0, 8);

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <HomeHero />

      <section id="new-arrivals" className="py-14 md:py-20">
        <Container>
          <SectionHeader
            eyebrow="New arrivals"
            title="Нові товари"
            description="Свіжі позиції з каталогу: мінімальні силуети, базові речі та streetwear-акценти для щоденних образів."
          />

          <ProductGrid products={newestProducts} />
        </Container>
      </section>
    </main>
  );
}