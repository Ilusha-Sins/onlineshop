import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";

const HomeHero = () => {
  return (
    <section className="overflow-hidden border-b border-neutral-200/80 bg-[#F7F7F5]">
      <Container className="py-8 sm:py-12 lg:py-16">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="flex min-h-[420px] flex-col justify-between rounded-[2rem] border border-neutral-200/80 bg-white p-6 shadow-sm shadow-black/[0.02] sm:p-8 lg:min-h-[520px] lg:p-10">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-neutral-400">
                Studio wardrobe
              </p>

              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.06em] text-neutral-950 sm:text-6xl lg:text-7xl">
                Образи без зайвого шуму
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
                Добірка актуального одягу для щоденного ритму: чисті форми,
                спокійні кольори, брендові речі та streetwear-настрій.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#collections"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-neutral-950 px-7 text-sm font-semibold !text-white transition hover:bg-neutral-800"
                >
                  Дивитися каталог
                </a>

                <a
                  href="#new-arrivals"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-200 bg-white px-7 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                >
                  Нові товари
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-3 border-t border-neutral-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                  3
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Розділи
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                  24/7
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Вітрина
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                  UA
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  Мова сайту
                </p>
              </div>
            </div>
          </div>

          <div id="collections" className="grid grid-cols-2 gap-4">
            <Link
              href="/brands"
              className="group relative col-span-2 min-h-[280px] overflow-hidden rounded-[2rem] bg-neutral-950 shadow-sm shadow-black/[0.04] sm:min-h-[360px] lg:min-h-[520px]"
            >
              <Image
                src="/images/brand-pattern.png"
                alt=""
                fill
                priority
                className="object-cover opacity-80 transition duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-95"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/15 to-transparent" />

              <div className="absolute right-6 top-6 hidden rounded-full border border-white/20 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-sm sm:inline-flex">
                Nike / Adidas / Stone Island
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                  Brand selection
                </p>

                <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Бренди
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                  Переглядай товари за брендами та швидко знаходь потрібну
                  лінію Men або Women.
                </p>

                <span className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition group-hover:bg-neutral-100">
                  Переглянути бренди
                </span>
              </div>
            </Link>

            <Link
              href="/catalog?gender=men"
              className="group relative min-h-[220px] overflow-hidden rounded-[2rem] bg-neutral-950 shadow-sm shadow-black/[0.04] sm:min-h-[280px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_26rem),linear-gradient(135deg,#2a2a2a,#050505)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                  Catalog
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Men
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                  Чоловічий каталог одягу та аксесуарів.
                </p>

                <span className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition group-hover:bg-neutral-100">
                  Переглянути
                </span>
              </div>
            </Link>

            <Link
              href="/catalog?gender=women"
              className="group relative min-h-[220px] overflow-hidden rounded-[2rem] bg-neutral-950 shadow-sm shadow-black/[0.04] sm:min-h-[280px]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(255,255,255,0.18),transparent_26rem),linear-gradient(135deg,#2a2a2a,#050505)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
                  Catalog
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Women
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/60">
                  Жіночий каталог одягу та аксесуарів.
                </p>

                <span className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition group-hover:bg-neutral-100">
                  Переглянути
                </span>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;