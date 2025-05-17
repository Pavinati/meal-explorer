import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

import type { Meal } from "~/types";
import { fetchMeal } from "~/themealdb-client";
import { DefaultThumbnail } from "~/components/DefaultThumbnail";
import { Spinner } from "~/components/Spinner";
import { Tag } from "~/components/Tag";
import { YouTubeIframe } from "~/components/YouTubeIframe";
import { FavoriteButton } from "~/components/FavoriteButton";

export default function Instructions() {
  const [params] = useSearchParams();
  const mealId = params.get("id");
  const [meal, setMeal] = useState<"Loading" | "Error" | Meal | null>(
    "Loading",
  );

  useEffect(() => {
    if (mealId) {
      fetchMeal(mealId)
        .then(setMeal)
        .catch(() => setMeal("Error"));
    }
  }, []);

  if (meal === "Error" || !meal) {
    return (
      <div>
        <div>We could not find the recipe.</div>
        <div>
          The server is currently not reachable or the recipe may have been
          removed from the database.
        </div>
      </div>
    );
  }

  if (meal === "Loading") {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-4">
      {meal.thumb ? (
        <img
          className="h-50 rounded-md object-cover md:h-75"
          src={meal.thumb.toString()}
          alt={`${meal.name} thumbnail image`}
        />
      ) : (
        <DefaultThumbnail />
      )}
      <div className="flex flex-row">
        <FavoriteButton meal={meal} />
        <div className="content-center text-xl font-bold">{meal.name}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {meal.tags.map((tag) => (
          <Tag key={tag} value={tag} />
        ))}
      </div>
      <div>
        <div className="text mb-1 font-bold">Ingredients</div>
        <ul className="flex list-outside list-disc flex-col gap-1 ps-6">
          {meal.ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>
              {ingredient}: {measure}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text mb-1 font-bold">Instructions</div>
        <ol className="flex list-outside list-decimal flex-col gap-2 ps-6">
          {meal.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
      {meal.youtubeURL && (
        <div className="flex flex-col gap-1">
          <div className="text font-bold">Video tutorial</div>
          <YouTubeIframe url={meal.youtubeURL} />
        </div>
      )}
    </div>
  );
}
