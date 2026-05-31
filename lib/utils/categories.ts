import type { Category } from "@/lib/types/product";

export const getDescendantCategoryIds = (
  categories: Category[],
  parentId: string
): string[] => {
  const directChildren = categories.filter(
    (category) => category.parent?._id === parentId
  );

  const nestedChildrenIds = directChildren.flatMap((child) =>
    getDescendantCategoryIds(categories, child._id)
  );

  return [...directChildren.map((child) => child._id), ...nestedChildrenIds];
};

export const getChildCategories = (
  categories: Category[],
  parentId: string
): Category[] => {
  return categories.filter((category) => category.parent?._id === parentId);
};