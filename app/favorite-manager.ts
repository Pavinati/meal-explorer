import type { Meal } from "~/types";

export function isFavorite(mealId: string): boolean {
  const storedValue = localStorage.getItem(mealId);
  // this assumes the meal didn't change in the meal DB API
  return storedValue !== null;
}

export function addToFavorites(meal: Meal) {
  localStorage.setItem(meal.id, JSON.stringify(meal));
}

export function removeFromFavorites(mealId: string) {
  localStorage.removeItem(mealId);
}

export function listFavoriteMeals(): Meal[] {
  const meals = Object.values(localStorage).map((m) => JSON.parse(m));
  return meals;
}
