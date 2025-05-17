import type { Meal } from "~/types";
import { DefaultThumbnail } from "~/components/DefaultThumbnail";
import { FavoriteButton } from "./FavoriteButton";
import { Tag } from "~/components/Tag";

type MealPreviewProps = {
  meal: Meal;
};

export function MealPreview({ meal }: MealPreviewProps) {
  return (
    <div className="relative flex flex-col gap-1 leading-tight">
      <div className="absolute top-0 right-0">
        <FavoriteButton meal={meal} />
      </div>
      {meal.thumb ? (
        <img
          className="rounded-md"
          src={meal.thumb.toString()}
          alt={`${meal.name} thumbnail image`}
        />
      ) : (
        <DefaultThumbnail />
      )}
      <div className="text block font-bold">{meal.name}</div>
      <div className="text block">{meal.area}</div>
      <div className="text block">{meal.category}</div>
      <div className="flex flex-wrap gap-1">
        {meal.tags.map((tag) => (
          <Tag key={tag} value={tag} />
        ))}
      </div>
    </div>
  );
}
