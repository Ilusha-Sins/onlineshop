export type CatalogAudience = "men" | "women";

export type LegacyGender = "women" | "men" | "unisex" | "kids";

export type SanitySlug = {
  current: string;
};

export type SanityImage = {
  _key?: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type ProductColor = {
  name: string;
  hex?: string;
};

export type Brand = {
  _id: string;
  title: string;
  slug: SanitySlug;
  logo?: SanityImage;
  image?: SanityImage;
  description?: string;
  order?: number;
  isVisible?: boolean;
};

export type Category = {
  _id: string;
  title: string;
  slug: SanitySlug;
  audiences?: CatalogAudience[];
  image?: SanityImage;
  order?: number;
  isVisible?: boolean;
  parent?: Category | null;
};

export type Product = {
  _id: string;
  name: string;
  slug: SanitySlug;
  images?: SanityImage[];
  price: number;
  oldPrice?: number;
  audiences?: CatalogAudience[];
  categories?: Category[];
  category?: Category;
  brand?: string;
  brandRef?: Brand;
  description?: string;
  sizes?: string[];
  colors?: ProductColor[];
  material?: string;
  gender?: LegacyGender;
  season?: "spring" | "summer" | "autumn" | "winter" | "all-season";
  isAvailable?: boolean;
  isFeatured?: boolean;
  isVisible?: boolean;
  createdAt?: string;
};