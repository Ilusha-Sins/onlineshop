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
      onClick={() => toggleFavorite(product)}
      className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg shadow-sm transition ${
        active
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-200 bg-white text-neutral-950 hover:border-neutral-950"
      }`}
      aria-label={active ? "Прибрати з обраного" : "Додати в обране"}
    >
      {active ? "♥" : "♡"}
    </button>
  );
};

export default FavoriteButton;