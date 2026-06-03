"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  defaultValue?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ defaultValue = "" }) => {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-3 rounded-[1.75rem] border border-neutral-200 bg-white p-2 shadow-sm shadow-black/[0.02] sm:flex-row sm:rounded-full"
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Пошук товарів, категорій, брендів..."
        className="min-h-12 flex-1 rounded-full bg-[#F1F1EE] px-5 text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-950"
      />

      <button
        type="submit"
        className="min-h-12 rounded-full bg-neutral-950 px-8 text-sm font-semibold !text-white transition hover:bg-neutral-800"
      >
        Шукати
      </button>
    </form>
  );
};

export default SearchForm;