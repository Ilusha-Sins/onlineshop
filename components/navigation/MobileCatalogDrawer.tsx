"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type { Category } from "@/lib/types/product";
import type { CatalogGender } from "@/lib/utils/genderFilter";
import { CATALOG_SWITCH_OPTIONS } from "@/lib/utils/genderFilter";
import { categoryMatchesAudience } from "@/lib/utils/categories";

interface MobileCatalogDrawerProps {
  categories: Category[];
}

interface CategoryGroupProps {
  category: Category;
  categories: Category[];
  gender: Exclude<CatalogGender, "all">;
  onClose: () => void;
  level?: number;
}

const getCategoryHref = (
  category: Category,
  gender: Exclude<CatalogGender, "all">
) => {
  const params = new URLSearchParams();

  params.set("query", category.title);
  params.set("gender", gender);

  return `/search?${params.toString()}`;
};

const getChildren = (
  categories: Category[],
  parentId: string,
  gender: Exclude<CatalogGender, "all">
) => {
  return categories.filter((category) => {
    return (
      category.parent?._id === parentId &&
      categoryMatchesAudience(category, gender)
    );
  });
};

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  categories,
  gender,
  onClose,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const children = getChildren(categories, category._id, gender);
  const hasChildren = children.length > 0;

  return (
    <div className={level === 0 ? "border-b border-neutral-100 py-4" : "py-1"}>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={getCategoryHref(category, gender)}
          onClick={onClose}
          className={`block font-semibold tracking-tight text-neutral-950 transition hover:text-neutral-600 ${
            level === 0 ? "text-lg" : "text-sm"
          }`}
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {category.title}
        </Link>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-semibold text-neutral-700 transition hover:border-neutral-950"
            aria-label={isOpen ? "Закрити підкатегорії" : "Відкрити підкатегорії"}
            aria-expanded={isOpen}
          >
            {isOpen ? "−" : "+"}
          </button>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <div className="mt-3 space-y-1">
          {children.map((child) => (
            <CategoryGroup
              key={child._id}
              category={child}
              categories={categories}
              gender={gender}
              onClose={onClose}
              level={level + 1}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const MobileCatalogDrawer: React.FC<MobileCatalogDrawerProps> = ({
  categories,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] =
    useState<Exclude<CatalogGender, "all">>("men");

  const rootCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        !category.parent?._id &&
        categoryMatchesAudience(category, selectedGender)
      );
    });
  }, [categories, selectedGender]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white/80 px-4 text-sm font-semibold text-neutral-800 transition hover:border-neutral-950 hover:bg-white hover:text-neutral-950 md:hidden"
      >
        Каталог
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            aria-label="Закрити меню"
            onClick={onClose}
            className="fixed inset-0 z-[101] bg-neutral-950/45 backdrop-blur-sm"
          />

          <aside className="fixed left-0 top-0 z-[102] flex h-dvh w-[88vw] max-w-[390px] flex-col overflow-hidden bg-[#F7F7F5] shadow-2xl">
            <div className="flex shrink-0 items-start justify-between border-b border-neutral-200/80 bg-white/70 px-5 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-neutral-400">
                  Catalog
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
                  Каталог
                </h2>

                <p className="mt-2 max-w-[260px] text-sm leading-5 text-neutral-500">
                  Обери чоловічий або жіночий каталог чи категорію.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-xl leading-none text-neutral-950 transition hover:border-neutral-950"
                aria-label="Закрити меню"
              >
                ×
              </button>
            </div>

            <div className="border-b border-neutral-200/80 bg-white/70 px-5 py-4">
              <div className="rounded-full border border-neutral-200 bg-white p-1">
                <div className="grid grid-cols-2 gap-1">
                  {CATALOG_SWITCH_OPTIONS.map((option) => {
                    const isActive = selectedGender === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSelectedGender(option.value)}
                        className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${
                          isActive
                            ? "bg-neutral-950 !text-white"
                            : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3">
              {rootCategories.length ? (
                rootCategories.map((category) => (
                  <CategoryGroup
                    key={category._id}
                    category={category}
                    categories={categories}
                    gender={selectedGender}
                    onClose={onClose}
                  />
                ))
              ) : (
                <div className="mt-4 rounded-3xl border border-dashed border-neutral-300 bg-white/80 p-6 text-center">
                  <p className="text-sm text-neutral-500">
                    Категорії для цього каталогу поки не додані.
                  </p>
                </div>
              )}
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-neutral-200/80 bg-white/80 p-5">
              <Link
                href={`/catalog?gender=${selectedGender}`}
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
              >
                Каталог
              </Link>

              <Link
                href="/brands"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold !text-white transition hover:bg-neutral-800"
              >
                Бренди
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default MobileCatalogDrawer;