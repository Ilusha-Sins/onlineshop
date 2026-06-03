import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductContactBox from "@/components/product/ProductContactBox";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";

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
      title: "Товар не знайдено — Studio",
    };
  }

  return {
    title: `${product.name} — Studio`,
    description:
      product.description ||
      `Переглянути товар ${product.name} у каталозі одягу.`,
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
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-6 md:py-10">
        <Container>
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="transition hover:text-neutral-950">
              Головна
            </Link>

            <span className="text-neutral-300">/</span>

            {product.category?.slug?.current ? (
              <>
                <Link
                  href={`/category/${product.category.slug.current}`}
                  className="transition hover:text-neutral-950"
                >
                  {product.category.title}
                </Link>

                <span className="text-neutral-300">/</span>
              </>
            ) : null}

            <span className="text-neutral-950">{product.name}</span>
          </nav>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.72fr)_360px]">
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
        <section className="py-12 md:py-16">
          <Container>
            <SectionHeader
              eyebrow="Related products"
              title="Схожі товари"
              description="Ще кілька позицій із цієї категорії, які можуть підійти до твого образу."
            />

            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      ) : null}
    </main>
  );
}