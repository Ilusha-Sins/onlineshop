"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const HeaderSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const currentQuery = searchParams.get("query") || "";
    setSearchValue(currentQuery);
  }, [searchParams]);

  function onSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      router.push("/search");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmedValue)}`);
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex h-11 w-full items-center rounded-full border border-neutral-200 bg-white/75 p-1 shadow-sm shadow-black/[0.02] transition focus-within:border-neutral-950 focus-within:bg-white"
    >
      <input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Знайти річ, бренд або категорію..."
        className="min-w-0 flex-1 bg-transparent px-5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
      />

      <button
        type="submit"
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 px-5 text-xs font-semibold !text-white transition hover:bg-neutral-800"
      >
        Шукати
      </button>
    </form>
  );
};

export default HeaderSearch;