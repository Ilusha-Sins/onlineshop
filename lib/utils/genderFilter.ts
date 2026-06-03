export type CatalogGender = "all" | "men" | "women";

export const GENDER_FILTER_OPTIONS: {
  value: CatalogGender;
  label: string;
}[] = [
  {
    value: "all",
    label: "Усе",
  },
  {
    value: "men",
    label: "Men",
  },
  {
    value: "women",
    label: "Women",
  },
];

export const CATALOG_SWITCH_OPTIONS: {
  value: Exclude<CatalogGender, "all">;
  label: string;
}[] = [
  {
    value: "men",
    label: "Men",
  },
  {
    value: "women",
    label: "Women",
  },
];

export const getValidGender = (gender?: string | string[]): CatalogGender => {
  const genderValue = Array.isArray(gender) ? gender[0] : gender;

  if (genderValue === "men" || genderValue === "women") {
    return genderValue;
  }

  return "all";
};

export const getValidCatalogGender = (
  gender?: string | string[]
): Exclude<CatalogGender, "all"> => {
  const genderValue = Array.isArray(gender) ? gender[0] : gender;

  if (genderValue === "women") {
    return "women";
  }

  return "men";
};