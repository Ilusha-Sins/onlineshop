"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types/product";

const FAVORITES_STORAGE_KEY = "myshop:favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  function saveFavorites(nextFavorites: Product[]) {
    setFavorites(nextFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavorites));
  }

  function isFavorite(productId: string) {
    return favorites.some((product) => product._id === productId);
  }

  function addFavorite(product: Product) {
    if (isFavorite(product._id)) {
      return;
    }

    saveFavorites([...favorites, product]);
  }

  function removeFavorite(productId: string) {
    saveFavorites(favorites.filter((product) => product._id !== productId));
  }

  function toggleFavorite(product: Product) {
    if (isFavorite(product._id)) {
      removeFavorite(product._id);
      return;
    }

    addFavorite(product);
  }

  return {
    favorites,
    isLoaded,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
};