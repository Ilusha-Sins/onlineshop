"use client";

import type { Product } from "@/lib/types/product";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  product: Product;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product }) => {
  const { isLoaded, isFavorite, toggleFavorite } = useFavorites();

  const active = isLoaded && isFavorite(product._id);

  return (
    <button
      type="button"
      disabled={!isLoaded}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isLoaded) {
          return;
        }

        toggleFavorite(product);
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-base shadow-sm backdrop-blur transition duration-200 disabled:cursor-not-allowed disabled:opacity-70 md:h-10 md:w-10 ${
        active
          ? "border-neutral-950 bg-neutral-950 !text-white hover:bg-neutral-800"
          : "border-white/80 bg-white/90 text-neutral-950 hover:border-neutral-950 hover:bg-white"
      }`}
      aria-label={active ? "Прибрати з обраного" : "Додати в обране"}
      aria-pressed={active}
    >
      <span aria-hidden="true">{active ? "♥" : "♡"}</span>
    </button>
  );
};

export default FavoriteButton;