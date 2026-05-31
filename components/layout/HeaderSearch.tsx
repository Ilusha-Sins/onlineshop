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
      className="flex w-full items-center rounded-full border border-neutral-200 bg-neutral-100 p-1 transition focus-within:border-neutral-950 focus-within:bg-white"
    >
      <input
        type="search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Пошук товарів..."
        className="h-11 flex-1 bg-transparent px-5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400"
      />

      <button
        type="submit"
        className="h-10 rounded-full bg-neutral-950 px-5 text-xs font-semibold text-white transition hover:bg-neutral-800"
      >
        Шукати
      </button>
    </form>
  );
};

export default HeaderSearch;