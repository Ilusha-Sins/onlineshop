import type { CatalogSort } from "@/lib/utils/catalogSort";
import { getSanityOrderBySort } from "@/lib/utils/catalogSort";

export const productFields = `
  _id,
  name,
  slug,
  images,
  price,
  oldPrice,
  brand,
  description,
  sizes,
  colors,
  material,
  gender,
  season,
  isAvailable,
  isFeatured,
  isVisible,
  createdAt,
  category->{
    _id,
    title,
    slug,
    image,
    order,
    isVisible,
    parent->{
      _id,
      title,
      slug
    }
  }
`;

export const allProductsQuery = `
  *[_type == "product" && isVisible != false] | order(createdAt desc) {
    ${productFields}
  }
`;

export const rootCategoriesQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current) &&
    !defined(parent)
  ] | order(order asc, title asc) {
    _id,
    title,
    slug,
    image,
    order,
    isVisible
  }
`;

export const allCategoriesQuery = `
  *[
    _type == "category" &&
    isVisible != false &&
    defined(slug.current)
  ] | order(order asc, title asc) {
    _id,
    title,
    slug,
    image,
    order,
    isVisible,
    parent->{
      _id,
      title,
      slug
    }
  }
`;

export const categoryBySlugQuery = `
  *[
    _type == "category" &&
    slug.current == $slug &&
    isVisible != false
  ][0] {
    _id,
    title,
    slug,
    image,
    order,
    isVisible,
    parent->{
      _id,
      title,
      slug
    }
  }
`;

export const productsByCategoryIdsQuery = `
  *[
    _type == "product" &&
    isVisible != false &&
    category._ref in $categoryIds
  ] | order(createdAt desc) {
    ${productFields}
  }
`;

export const getPaginatedProductsByCategoryIdsQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    category._ref in $categoryIds
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const productsByCategoryIdsCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    category._ref in $categoryIds
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
    category._ref == $categoryId &&
    slug.current != $slug
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
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern
    )
  ] | order(createdAt desc) {
    ${productFields}
  }
`;

export const getPaginatedSearchProductsQuery = (sort: CatalogSort) => `
  *[
    _type == "product" &&
    isVisible != false &&
    (
      name match $searchPattern ||
      brand match $searchPattern ||
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern
    )
  ] | order(${getSanityOrderBySort(sort)}) [$start...$end] {
    ${productFields}
  }
`;

export const searchProductsCountQuery = `
  count(*[
    _type == "product" &&
    isVisible != false &&
    (
      name match $searchPattern ||
      brand match $searchPattern ||
      description match $searchPattern ||
      material match $searchPattern ||
      gender match $searchPattern ||
      season match $searchPattern ||
      category->title match $searchPattern
    )
  ])
`;