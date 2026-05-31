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

export type Category = {
  _id: string;
  title: string;
  slug: SanitySlug;
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
  brand?: string;
  description?: string;
  sizes?: string[];
  colors?: ProductColor[];
  material?: string;
  gender?: "women" | "men" | "unisex" | "kids";
  season?: "spring" | "summer" | "autumn" | "winter" | "all-season";
  isAvailable?: boolean;
  isFeatured?: boolean;
  isVisible?: boolean;
  createdAt?: string;
  category?: Category;
};