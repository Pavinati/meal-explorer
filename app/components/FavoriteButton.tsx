import { useEffect, useState } from "react";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import type { Meal } from "~/types";
import {
  addToFavorites,
  isFavorite,
  removeFromFavorites,
} from "~/favorite-manager";

type FavoriteButtonProps = {
  meal: Meal;
};

export function FavoriteButton({ meal }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(meal.id));
  }, []);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(meal.id);
      setFavorite(false);
    } else {
      addToFavorites(meal);
      setFavorite(true);
    }
  };

  return (
    <button
      className="favorite scale-75 appearance-none duration-100 hover:scale-100"
      onClick={toggleFavorite}
      aria-pressed={favorite}
      aria-description="Toggle favorite button"
    >
      {favorite ? (
        <IoIosHeart className="size-12 fill-red-600" aria-hidden />
      ) : (
        <IoIosHeartEmpty className="size-12 fill-gray-500" aria-hidden />
      )}
    </button>
  );
}
