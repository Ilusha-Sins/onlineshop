import type { CatalogSort } from "@/lib/utils/catalogSort";
import { getSanityOrderBySort } from "@/lib/utils/catalogSort";

const productAudienceFilter = `
  (
    coalesce($gender, "all") == "all" ||
    (
      coalesce($gender, "all") == "men" &&
      (
        "men" in audiences ||
        gender in ["men", "unisex"]
      )
    ) ||
    (
      coalesce($gender, "all") == "women" &&
      (
        "women" in audiences ||
        gender in ["women", "unisex"]
      )
    )
  )
`;

const categoryAudienceFilter = `
  (
    coalesce($gender, "all") == "all" ||
    !defined(audiences) ||
    count(audiences) == 0 ||
    coalesce($gender, "all") in audiences
  )
`;

const productCategoryMembershipFilter = `
  (
    category._ref in $categoryIds ||
    count((categories[]._ref)[@ in $categoryIds]) > 0
  )
`;

export const productFields = `
  _id,
  name,
  slug,
  images,
  price,
  oldPrice,
  audiences,
  categories[]->{
    _id,
    title,
    slug,
    audiences,
    image,
    order,
    isVisible,
    parent->{
      _id,
      title,
      slug,
      audiences
    }
  },
  category->{
    _id,
    title,
    slug,
    audiences,
    image,
    order,
    isVisible,
    parent->{
      _id,
      title,
      slug,
      audiences
    }
  },
  brand,
  brandRef->{
    _id,
    title,
    slug,
    logo,
    image,
    description,
    order,
    isVisible
  },
  description,
  sizes,
  colors,
  material,
  gender,
  season,
  isAvailable,
  isFeatured,
  isVisible,
  createdAt
`;

export const categoryFields = `
  _id,
  title,
  slug,
  audiences,
  image,
  order,
  isVisible,
  parent->{
    _id,
    title,
    slug,
    audiences
  }
`;

export const brandFields = `
  _id,
  title,
  slug,
  logo,
  image,
  description,
  order,
  isVisible
`;

export const allProductsQuery = `
  *[_type == "product" && isVisible != false] | order(createdAt desc) {
    ${productFields}
  }
`;

export const getPaginatedProductsByAudienceQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    ${productAudienceFilter}
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const productsByAudienceCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    ${productAudienceFilter}
  ])
`;

export const rootCategoriesQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current) &&
    !defined(parent)
  ] | order(order asc, title asc) {
    ${categoryFields}
  }
`;

export const getRootCategoriesByGenderQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current) &&
    !defined(parent) &&
    ${categoryAudienceFilter}
  ] | order(order asc, title asc) {
    ${categoryFields}
  }
`;

export const allCategoriesQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current)
  ] | order(order asc, title asc) {
    ${categoryFields}
  }
`;

export const getAllCategoriesByGenderQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current) &&
    ${categoryAudienceFilter}
  ] | order(order asc, title asc) {
    ${categoryFields}
  }
`;

export const categoryBySlugQuery = `
  *[
    _type == "category" &&
    slug.current == $slug &&
    isVisible != false
  ][0] {
    ${categoryFields}
  }
`;

export const productsByCategoryIdsQuery = `
  *[
    _type == "product" &&
    isVisible != false &&
    ${productCategoryMembershipFilter}
  ] | order(createdAt desc) {
    ${productFields}
  }
`;

export const getPaginatedProductsByCategoryIdsQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    ${productCategoryMembershipFilter} &&
    ${productAudienceFilter}
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const productsByCategoryIdsCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    ${productCategoryMembershipFilter} &&
    ${productAudienceFilter}
  ])
`;

export const productBySlugQuery = `
  *[
    _type == "product" &&
    slug.current == $slug &&
    isVisible != false
  ][0] {
    ${productFields}
  }
`;

export const relatedProductsQuery = `
  *[
    _type == "product" &&
    isVisible != false &&
    slug.current != $slug &&
    (
      category._ref == $categoryId ||
      count((categories[]._ref)[@ == $categoryId]) > 0
    )
  ] | order(createdAt desc)[0...4] {
    ${productFields}
  }
`;

export const searchProductsQuery = `
  *[
    _type == "product" &&
    isVisible != false &&
    (
      name match $searchPattern ||
      brand match $searchPattern ||
      brandRef->title match $searchPattern ||
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern ||
      count((categories[]->title)[@ match $searchPattern]) > 0
    )
  ] | order(createdAt desc) {
    ${productFields}
  }
`;

export const getPaginatedSearchProductsQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    ${productAudienceFilter} &&
    (
      name match $searchPattern ||
      brand match $searchPattern ||
      brandRef->title match $searchPattern ||
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern ||
      count((categories[]->title)[@ match $searchPattern]) > 0
    )
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const searchProductsCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    ${productAudienceFilter} &&
    (
      name match $searchPattern ||
      brand match $searchPattern ||
      brandRef->title match $searchPattern ||
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern ||
      count((categories[]->title)[@ match $searchPattern]) > 0
    )
  ])
`;

export const allBrandsQuery = `
  *[
    _type == "brand" &&
    isVisible != false &&
    defined(slug.current)
  ] | order(order asc, title asc) {
    ${brandFields}
  }
`;

export const brandBySlugQuery = `
  *[
    _type == "brand" &&
    slug.current == $slug &&
    isVisible != false
  ][0] {
    ${brandFields}
  }
`;

export const getPaginatedProductsByBrandIdQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    brandRef._ref == $brandId &&
    ${productAudienceFilter}
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const productsByBrandIdCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    brandRef._ref == $brandId &&
    ${productAudienceFilter}
  ])
`;