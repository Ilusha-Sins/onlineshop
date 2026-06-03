"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { Category } from "@/lib/types/product";
import type { CatalogGender } from "@/lib/utils/genderFilter";
import { CATALOG_SWITCH_OPTIONS } from "@/lib/utils/genderFilter";
import { categoryMatchesAudience } from "@/lib/utils/categories";

interface CatalogDropdownProps {
  categories: Category[];
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

const CatalogDropdown: React.FC<CatalogDropdownProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] =
    useState<Exclude<CatalogGender, "all">>("men");

  const rootCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        !category.parent?._id && categoryMatchesAudience(category, selectedGender)
      );
    });
  }, [categories, selectedGender]);

  const getChildren = (parentId: string) => {
    return categories.filter((category) => {
      return (
        category.parent?._id === parentId &&
        categoryMatchesAudience(category, selectedGender)
      );
    });
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="inline-flex h-10 items-center rounded-full border border-transparent px-4 text-sm font-semibold text-neutral-700 transition hover:border-neutral-200 hover:bg-white/80 hover:text-neutral-950"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        Каталог
        <span className="ml-2 text-[10px] text-neutral-400">▼</span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 pt-4">
          <div className="w-[820px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-2xl shadow-black/[0.08]">
            <div className="grid grid-cols-[0.78fr_1.22fr]">
              <div className="bg-[#F1F1EE] p-7">
                <p className="text-xs font-medium uppercase tracking-[0.32em] text-neutral-400">
                  Catalog
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950">
                  Обери каталог
                </h2>

                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  Перемикай чоловічий або жіночий каталог. Категорії
                  підтягуються відповідно до налаштувань у Sanity.
                </p>

                <div className="mt-6 rounded-full border border-neutral-200 bg-white p-1">
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

                <div className="mt-6 grid gap-3">
                  <Link
                    href="/brands"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-950 transition hover:border-neutral-950"
                  >
                    Бренди
                  </Link>

                  <Link
                    href={`/catalog?gender=${selectedGender}`}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold !text-white transition hover:bg-neutral-800"
                  >
                    Переглянути {selectedGender === "men" ? "Men" : "Women"}
                  </Link>
                </div>
              </div>

              <div className="p-7">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">
                      {selectedGender === "men"
                        ? "Men catalog"
                        : "Women catalog"}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-950">
                      Категорії
                    </h3>
                  </div>
                </div>

                {rootCategories.length ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                    {rootCategories.map((rootCategory) => {
                      const children = getChildren(rootCategory._id);

                      return (
                        <div key={rootCategory._id}>
                          <Link
                            href={getCategoryHref(rootCategory, selectedGender)}
                            className="text-base font-semibold tracking-tight text-neutral-950 transition hover:text-neutral-600"
                            onClick={() => setIsOpen(false)}
                          >
                            {rootCategory.title}
                          </Link>

                          {children.length ? (
                            <div className="mt-3 space-y-2">
                              {children.slice(0, 7).map((childCategory) => (
                                <Link
                                  href={getCategoryHref(
                                    childCategory,
                                    selectedGender
                                  )}
                                  key={childCategory._id}
                                  className="block text-sm leading-6 text-neutral-500 transition hover:text-neutral-950"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {childCategory.title}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-sm text-neutral-400">
                              Підкатегорії поки не додані
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-8 text-center">
                    <p className="text-sm text-neutral-500">
                      Категорії для цього каталогу поки не додані.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CatalogDropdown;