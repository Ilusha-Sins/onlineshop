export type CatalogSort = "newest" | "price-asc" | "price-desc" | "sale";

export const SORT_OPTIONS: { value: CatalogSort; label: string }[] = [
  {
    value: "newest",
    label: "Нові",
  },
  {
    value: "price-asc",
    label: "Дешевші",
  },
  {
    value: "price-desc",
    label: "Дорожчі",
  },
  {
    value: "sale",
    label: "Зі знижкою",
  },
];

export const getValidSort = (sort?: string | string[]): CatalogSort => {
  const sortValue = Array.isArray(sort) ? sort[0] : sort;

  if (
    sortValue === "price-asc" ||
    sortValue === "price-desc" ||
    sortValue === "sale"
  ) {
    return sortValue;
  }

  return "newest";
};

export const getSanityOrderBySort = (sort: CatalogSort) => {
  switch (sort) {
    case "price-asc":
      return "price asc";
    case "price-desc":
      return "price desc";
    case "sale":
      return "defined(oldPrice) desc, oldPrice desc, createdAt desc";
    case "newest":
    default:
      return "createdAt desc";
  }
};