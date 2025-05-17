import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

import type { Meal } from "~/types";
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
    return (
      <div className="mt-5 text-center">
        <div className="text-xl">Welcome to the meal explorer app!</div>
        <div>Explore wonderful meals!</div>
        <div className="text-sm text-gray-400">
          Powered by{" "}
          <a
            className="text-blue-600 underline"
            href="https://www.themealdb.com"
            target="_blank"
            rel="nofollow"
          >
            themealdb.com
          </a>{" "}
          APIs.
        </div>
      </div>
    );
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
    </div>
  );
}
