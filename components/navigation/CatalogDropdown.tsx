"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Category } from "@/lib/types/product";

interface CatalogDropdownProps {
  categories: Category[];
}

const CatalogDropdown: React.FC<CatalogDropdownProps> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const rootCategories = useMemo(() => {
    return categories.filter((category) => !category.parent?._id);
  }, [categories]);

  const getChildren = (parentId: string) => {
    return categories.filter((category) => category.parent?._id === parentId);
  };

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Каталог
        <span className="ml-1 text-xs">▼</span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-50 pt-3">
          <div className="w-[720px] rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-6">
              {rootCategories.map((rootCategory) => {
                const children = getChildren(rootCategory._id);

                return (
                  <div key={rootCategory._id}>
                    <Link
                      href={`/category/${rootCategory.slug.current}`}
                      className="text-base font-bold text-neutral-950 transition hover:text-neutral-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {rootCategory.title}
                    </Link>

                    {children.length ? (
                      <div className="mt-3 space-y-2">
                        {children.map((childCategory) => (
                          <Link
                            href={`/category/${childCategory.slug.current}`}
                            key={childCategory._id}
                            className="block text-sm text-neutral-500 transition hover:text-neutral-950"
                            onClick={() => setIsOpen(false)}
                          >
                            {childCategory.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-neutral-400">
                        Немає підкатегорій
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CatalogDropdown;