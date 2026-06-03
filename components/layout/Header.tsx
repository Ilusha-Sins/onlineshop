import { Suspense } from "react";
import Link from "next/link";

import type { Category } from "@/lib/types/product";
import HeaderSearch from "@/components/layout/HeaderSearch";
import CatalogDropdown from "@/components/navigation/CatalogDropdown";
import MobileCatalogDrawer from "@/components/navigation/MobileCatalogDrawer";

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-[#F7F7F5]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group shrink-0 text-base font-black tracking-tight text-neutral-950 sm:text-xl"
          aria-label="На головну"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-neutral-950 transition group-hover:scale-125" />
            Studio
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1">
          <CatalogDropdown categories={categories} />
          <MobileCatalogDrawer categories={categories} />

          <Link
            href="/brands"
            className="hidden h-10 items-center rounded-full border border-transparent px-4 text-sm font-semibold text-neutral-700 transition hover:border-neutral-200 hover:bg-white/80 hover:text-neutral-950 md:inline-flex"
          >
            Бренди
          </Link>
        </nav>

        <div className="hidden min-w-0 flex-1 md:block">
          <Suspense
            fallback={
              <div className="h-11 w-full rounded-full border border-neutral-200 bg-white/70" />
            }
          >
            <HeaderSearch />
          </Suspense>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white/80 px-4 text-sm font-semibold text-neutral-800 transition hover:border-neutral-950 hover:bg-white hover:text-neutral-950 md:hidden"
          >
            Пошук
          </Link>

          <Link
            href="/favorites"
            className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-4 text-sm font-semibold !text-white transition hover:bg-neutral-800 sm:px-5"
          >
            Обране
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;