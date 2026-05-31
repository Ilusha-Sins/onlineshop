import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductContactBox from "@/components/product/ProductContactBox";
import ProductGrid from "@/components/product/ProductGrid";

import { sanityClient } from "@/lib/sanity/client";
import {
  productBySlugQuery,
  relatedProductsQuery,
} from "@/lib/sanity/queries";
import type { Product } from "@/lib/types/product";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await sanityClient.fetch<Product | null>(
    productBySlugQuery,
    { slug }
  );

  if (!product) {
    return {
      title: "Товар не знайдено — MyShop",
    };
  }

  return {
    title: `${product.name} — MyShop`,
    description:
      product.description ||
      `Переглянути товар ${product.name} у каталозі MyShop.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await sanityClient.fetch<Product | null>(
    productBySlugQuery,
    { slug }
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = product.category?._id
    ? await sanityClient.fetch<Product[]>(relatedProductsQuery, {
        categoryId: product.category._id,
        slug,
      })
    : [];

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="py-10 md:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr_360px]">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />

            <ProductInfo product={product} />

            <ProductContactBox product={product} />
          </div>
        </Container>
      </section>

      {relatedProducts?.length ? (
        <section className="border-t border-neutral-200 bg-white py-14">
          <Container>
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                Related products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                Схожі товари
              </h2>
            </div>

            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      ) : null}
    </main>
  );
}