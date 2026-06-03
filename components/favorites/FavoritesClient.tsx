"use client";

import Link from "next/link";

import { useFavorites } from "@/hooks/useFavorites";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeader from "@/components/ui/SectionHeader";

const FavoritesClient = () => {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-[#F7F7F5] py-16">
        <Container>
          <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-8 shadow-sm shadow-black/[0.02]">
            <p className="text-sm text-neutral-500">Завантаження обраного...</p>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7F5]">
      <section className="border-b border-neutral-200/80 py-10 md:py-14">
        <Container>
          <div className="rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
              Обране
            </p>

            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-neutral-950 md:text-7xl">
              Збережені речі
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-neutral-500 md:text-base md:leading-8">
              Тут зберігаються товари, які ти додав в обране. Список
              зберігається у браузері.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          {favorites.length ? (
            <>
              <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <SectionHeader
                  className="mb-0"
                  eyebrow="Saved products"
                  title="Обрані товари"
                  description={`Товарів у списку: ${favorites.length}`}
                />

                <Link
                  href="/search"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                >
                  Знайти ще
                </Link>
              </div>

              <ProductGrid products={favorites} />
            </>
          ) : (
            <EmptyState
              title="Обраних товарів поки немає"
              description="Натисни сердечко на картці товару, щоб зберегти його тут."
              action={
                <Link
                  href="/"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold !text-white transition hover:bg-neutral-800"
                >
                  На головну
                </Link>
              }
            />
          )}
        </Container>
      </section>
    </main>
  );
};

export default FavoritesClient;