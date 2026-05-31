"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/types/product";

interface MobileCatalogDrawerProps {
  categories: Category[];
}

interface CategoryGroupProps {
  category: Category;
  categories: Category[];
  onClose: () => void;
  level?: number;
}

const getChildren = (categories: Category[], parentId: string) => {
  return categories.filter((category) => category.parent?._id === parentId);
};

const CategoryGroup: React.FC<CategoryGroupProps> = ({
  category,
  categories,
  onClose,
  level = 0,
}) => {
  const [isOpen, setIsOpen] = useState(level === 0);
  const children = getChildren(categories, category._id);
  const hasChildren = children.length > 0;

  return (
    <div className={level === 0 ? "border-b border-neutral-100 py-3" : "py-1"}>
      <div className="flex items-center justify-between gap-3">
        <Link
          href={`/category/${category.slug.current}`}
          onClick={onClose}
          className={`block font-semibold text-neutral-950 transition hover:text-neutral-600 ${
            level === 0 ? "text-base" : "text-sm"
          }`}
          style={{ paddingLeft: `${level * 16}px` }}
        >
          {category.title}
        </Link>

        {hasChildren ? (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-700"
            aria-label={isOpen ? "Закрити підкатегорії" : "Відкрити підкатегорії"}
          >
            {isOpen ? "−" : "+"}
          </button>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <div className="mt-2 space-y-1">
          {children.map((child) => (
            <CategoryGroup
              key={child._id}
              category={child}
              categories={categories}
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

  const rootCategories = useMemo(() => {
    return categories.filter((category) => !category.parent?._id);
  }, [categories]);

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
        className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950 md:hidden"
      >
        Каталог
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] md:hidden">
          <button
            type="button"
            aria-label="Закрити меню"
            onClick={onClose}
            className="fixed inset-0 z-[101] bg-black/50"
          />

          <aside className="fixed left-0 top-0 z-[102] flex h-dvh w-[88vw] max-w-[380px] flex-col overflow-hidden bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-5 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                  Menu
                </p>
                <h2 className="mt-1 text-xl font-bold text-neutral-950">
                  Каталог
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-xl font-bold text-neutral-950"
                aria-label="Закрити меню"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain bg-white px-5 py-4">
              {rootCategories.length ? (
                rootCategories.map((category) => (
                  <CategoryGroup
                    key={category._id}
                    category={category}
                    categories={categories}
                    onClose={onClose}
                  />
                ))
              ) : (
                <p className="text-sm text-neutral-500">
                  Категорії поки не додані.
                </p>
              )}
            </div>

            <div className="shrink-0 border-t border-neutral-200 bg-white p-5">
              <Link
                href="/search"
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-950"
              >
                Пошук товарів
              </Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default MobileCatalogDrawer;