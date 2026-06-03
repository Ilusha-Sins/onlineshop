import Link from "next/link";
import {
  CATALOG_SWITCH_OPTIONS,
  type CatalogGender,
} from "@/lib/utils/genderFilter";

interface CatalogAudienceSwitchProps {
  currentGender: Exclude<CatalogGender, "all">;
  basePath: string;
  queryParams?: Record<string, string | undefined>;
}

const getHref = (
  basePath: string,
  gender: Exclude<CatalogGender, "all">,
  queryParams?: Record<string, string | undefined>
) => {
  const params = new URLSearchParams();

  Object.entries(queryParams || {}).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  params.delete("page");
  params.set("gender", gender);

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
};

const CatalogAudienceSwitch: React.FC<CatalogAudienceSwitchProps> = ({
  currentGender,
  basePath,
  queryParams,
}) => {
  return (
    <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sm shadow-black/[0.02]">
      {CATALOG_SWITCH_OPTIONS.map((option) => {
        const isActive = option.value === currentGender;

        return (
          <Link
            key={option.value}
            href={getHref(basePath, option.value, queryParams)}
            className={`inline-flex h-10 min-w-24 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${
              isActive
                ? "bg-neutral-950 !text-white"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
            }`}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
};

export default CatalogAudienceSwitch;