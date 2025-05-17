import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

import type { Meal } from "~/types";
import { listFavoriteMeals } from "~/favorite-manager";
import { searchMeal } from "~/themealdb-client";
import { MealPreview } from "~/components/MealPreview";
import { Spinner } from "~/components/Spinner";

export default function Meals() {
  const [params] = useSearchParams();
  const searchedMeal = params.get("s");
  const [meals, setMeals] = useState<"Loading" | "Error" | Meal[]>("Loading");

  useEffect(() => {
    if (searchedMeal) {
      searchMeal(searchedMeal)
        .then(setMeals)
        .catch(() => setMeals("Error"));
    }
  }, [searchedMeal]);

  if (!searchedMeal) {
    return <FavoriteMeals />;
  }

  if (meals === "Loading") {
    return <Spinner />;
  }

  if (meals === "Error") {
    return <div>Could not fetch meals from the server.</div>;
  }

  if (meals.length === 0) {
    return <div>No meals found matching this search.</div>;
  }

  return (
    <div>
      <MealPreviewGid meals={meals} />
    </div>
  );
}

function FavoriteMeals() {
  const meals = listFavoriteMeals();

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xl font-bold">Favorites</div>
      {meals.length > 0 ? (
        <MealPreviewGid meals={meals} />
      ) : (
        <div>No favorite meals saved yet, add some for ease of access!</div>
      )}
    </div>
  );
}

function MealPreviewGid({ meals }: { meals: Meal[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 text-gray-700 md:grid-cols-5 md:gap-8">
      {meals.map((meal) => (
        <Link
          key={meal.id}
          to={{
            pathname: "/instructions",
            search: `?id=${meal.id}`,
          }}
        >
          <MealPreview meal={meal} />
        </Link>
      ))}
    </div>
  );
}
