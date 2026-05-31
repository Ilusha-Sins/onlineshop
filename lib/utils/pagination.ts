export const PRODUCTS_PER_PAGE = 12;

export const getValidPage = (page?: string | string[]) => {
  const pageValue = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number(pageValue || "1");

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return Math.floor(parsedPage);
};

export const getPaginationRange = (
  page: number,
  perPage = PRODUCTS_PER_PAGE
) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    start,
    end,
  };
};