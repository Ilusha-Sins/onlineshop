import type { Category } from "@/lib/types/product";
import type { CatalogGender } from "@/lib/utils/genderFilter";

export const categoryMatchesAudience = (
  category: Category,
  gender: CatalogGender
) => {
  if (gender === "all") {
    return true;
  }

  if (!category.audiences?.length) {
    return true;
  }

  return category.audiences.includes(gender);
};

export const getChildCategories = (
  categories: Category[],
  parentId: string,
  gender: CatalogGender = "all"
): Category[] => {
  return categories.filter((category) => {
    return (
      category.parent?._id === parentId && categoryMatchesAudience(category, gender)
    );
  });
};

export const getDescendantCategoryIds = (
  categories: Category[],
  parentId: string,
  gender: CatalogGender = "all"
): string[] => {
  const directChildren = getChildCategories(categories, parentId, gender);

  const nestedChildrenIds = directChildren.flatMap((child) =>
    getDescendantCategoryIds(categories, child._id, gender)
  );

  return [...directChildren.map((child) => child._id), ...nestedChildrenIds];
};