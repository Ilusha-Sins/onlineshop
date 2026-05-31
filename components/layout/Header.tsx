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
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-xl font-black tracking-tight text-neutral-950"
        >
          MyShop
        </Link>

        <div className="shrink-0">
          <CatalogDropdown categories={categories} />
          <MobileCatalogDrawer categories={categories} />
        </div>

        <div className="hidden flex-1 md:block">
          <Suspense
            fallback={
              <div className="h-[50px] w-full rounded-full bg-neutral-100" />
            }
          >
            <HeaderSearch />
          </Suspense>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link
            href="/search"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950 md:hidden"
          >
            Пошук
          </Link>

          <Link
            href="/favorites"
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Обране
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;