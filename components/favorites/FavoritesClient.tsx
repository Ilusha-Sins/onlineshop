"use client";

import Link from "next/link";

import { useFavorites } from "@/hooks/useFavorites";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";

const FavoritesClient = () => {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-neutral-50 py-16">
        <Container>
          <p className="text-neutral-500">Завантаження...</p>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="border-b border-neutral-200 bg-white py-14">
        <Container>
          <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
            Favorites
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 md:text-6xl">
            Обране
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
            Тут зберігаються товари, які ви додали в обране. Дані зберігаються
            у браузері.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {favorites.length ? (
            <>
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                    Saved products
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                    Збережені товари
                  </h2>
                </div>

                <p className="text-sm text-neutral-500">
                  Товарів: {favorites.length}
                </p>
              </div>

              <ProductGrid products={favorites} />
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-neutral-300 bg-white p-10 text-center">
              <h2 className="text-2xl font-bold text-neutral-950">
                Обраних товарів поки немає
              </h2>

              <p className="mt-3 text-neutral-500">
                Натисни сердечко на картці товару, щоб зберегти його тут.
              </p>

              <Link
                href="/"
                className="mt-6 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                На головну
              </Link>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
};

export default FavoritesClient;