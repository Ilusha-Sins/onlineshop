import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

const getHref = (
  basePath: string,
  page: number,
  queryParams?: Record<string, string | undefined>
) => {
  const params = new URLSearchParams();

  Object.entries(queryParams || {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
};

const getPaginationItems = (
  currentPage: number,
  totalPages: number
): PaginationItem[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-start",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  basePath,
  queryParams,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav
      className="mt-12 flex flex-col items-center gap-4 border-t border-neutral-200/80 pt-8"
      aria-label="Пагінація"
    >
      <p className="text-sm text-neutral-500">
        Сторінка {currentPage} з {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={getHref(basePath, currentPage - 1, queryParams)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            Назад
          </Link>
        ) : null}

        {paginationItems.map((item) => {
          if (typeof item !== "number") {
            return (
              <span
                key={item}
                className="inline-flex h-10 w-10 items-center justify-center text-sm font-semibold text-neutral-400"
              >
                …
              </span>
            );
          }

          const isActive = item === currentPage;

          return (
            <Link
              key={item}
              href={getHref(basePath, item, queryParams)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-neutral-950 !text-white"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
              }`}
            >
              {item}
            </Link>
          );
        })}

        {currentPage < totalPages ? (
          <Link
            href={getHref(basePath, currentPage + 1, queryParams)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
          >
            Вперед
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Pagination;