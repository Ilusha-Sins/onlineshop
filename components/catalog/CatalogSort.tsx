import Link from "next/link";
import { SORT_OPTIONS, type CatalogSort } from "@/lib/utils/catalogSort";

interface CatalogSortProps {
  currentSort: CatalogSort;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

const getHref = (
  basePath: string,
  sort: CatalogSort,
  queryParams?: Record<string, string | undefined>
) => {
  const params = new URLSearchParams();

  Object.entries(queryParams || {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  if (sort !== "newest") {
    params.set("sort", sort);
  } else {
    params.delete("sort");
  }

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
};

const CatalogSort: React.FC<CatalogSortProps> = ({
  currentSort,
  basePath,
  queryParams,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-neutral-500">
        Сортувати:
      </span>

      {SORT_OPTIONS.map((option) => {
        const isActive = option.value === currentSort;

        return (
          <Link
            key={option.value}
            href={getHref(basePath, option.value, queryParams)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-neutral-950 text-white"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
};

export default CatalogSort;