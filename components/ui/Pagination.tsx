import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

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

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={getHref(basePath, currentPage - 1, queryParams)}
          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
        >
          Назад
        </Link>
      ) : null}

      {pages.map((page) => {
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={getHref(basePath, page, queryParams)}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition ${
              isActive
                ? "bg-neutral-950 text-white"
                : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link
          href={getHref(basePath, currentPage + 1, queryParams)}
          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
        >
          Вперед
        </Link>
      ) : null}
    </nav>
  );
};

export default Pagination;