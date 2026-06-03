import Link from "next/link";
import {
  GENDER_FILTER_OPTIONS,
  type CatalogGender,
} from "@/lib/utils/genderFilter";

interface GenderFilterProps {
  currentGender: CatalogGender;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

const getHref = (
  basePath: string,
  gender: CatalogGender,
  queryParams?: Record<string, string | undefined>
) => {
  const params = new URLSearchParams();

  Object.entries(queryParams || {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  params.delete("page");

  if (gender !== "all") {
    params.set("gender", gender);
  } else {
    params.delete("gender");
  }

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
};

const GenderFilter: React.FC<GenderFilterProps> = ({
  currentGender,
  basePath,
  queryParams,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
        Лінія
      </span>

      <div className="flex flex-wrap gap-2">
        {GENDER_FILTER_OPTIONS.map((option) => {
          const isActive = option.value === currentGender;

          return (
            <Link
              key={option.value}
              href={getHref(basePath, option.value, queryParams)}
              className={`inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-semibold transition ${
                isActive
                  ? "bg-neutral-950 !text-white hover:bg-neutral-800"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default GenderFilter;