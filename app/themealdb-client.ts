import axios from "axios";
import type { Ingredient, Meal } from "./types";

// API keys should not be embedded in frontend apps
// TODO implement a login mechanism
const DEV_API_KEY = "1";
const API_KEY = import.meta.env.VITE_THEMEALDB_API_KEY || DEV_API_KEY;

const defaultConfig = {
  baseURL: `https://www.themealdb.com/api/json/v1/${API_KEY}/`,
};

/* NB: this structure is done by reverse-engineerging the result of some API calls.
 * no official API documentation has been found regarding the structure this record
 * thus its parsing may have to be adjusted.
 */
type RawMeal = {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
};

function parseIngredient([ingredient, measure]: (
  | string
  | null
)[]): Ingredient | null {
  if (!!ingredient && !!measure) {
    return { ingredient, measure };
  } else {
    return null;
  }
}

function parseMeal(rawMeal: RawMeal): Meal {
  const instructions: string[] = rawMeal.strInstructions
    .split("\r\n")
    .map((instruction) => instruction.trim())
    .filter((instruction) => instruction.length > 0);

  const ingredients: Ingredient[] = [
    [rawMeal.strIngredient1, rawMeal.strMeasure1],
    [rawMeal.strIngredient2, rawMeal.strMeasure2],
    [rawMeal.strIngredient3, rawMeal.strMeasure3],
    [rawMeal.strIngredient4, rawMeal.strMeasure4],
    [rawMeal.strIngredient5, rawMeal.strMeasure5],
    [rawMeal.strIngredient6, rawMeal.strMeasure6],
    [rawMeal.strIngredient7, rawMeal.strMeasure7],
    [rawMeal.strIngredient8, rawMeal.strMeasure8],
    [rawMeal.strIngredient9, rawMeal.strMeasure9],
    [rawMeal.strIngredient10, rawMeal.strMeasure10],
    [rawMeal.strIngredient11, rawMeal.strMeasure11],
    [rawMeal.strIngredient12, rawMeal.strMeasure12],
    [rawMeal.strIngredient13, rawMeal.strMeasure13],
    [rawMeal.strIngredient14, rawMeal.strMeasure14],
    [rawMeal.strIngredient15, rawMeal.strMeasure15],
    [rawMeal.strIngredient16, rawMeal.strMeasure16],
    [rawMeal.strIngredient17, rawMeal.strMeasure17],
    [rawMeal.strIngredient18, rawMeal.strMeasure18],
    [rawMeal.strIngredient19, rawMeal.strMeasure19],
    [rawMeal.strIngredient20, rawMeal.strMeasure20],
  ]
    .map(parseIngredient)
    .filter((ingredient) => !!ingredient);

  const tags = rawMeal.strTags ? rawMeal.strTags.split(",") : [];

  return {
    id: rawMeal.idMeal,
    name: rawMeal.strMeal,
    alternateName: rawMeal.strMealAlternate,
    category: rawMeal.strCategory,
    area: rawMeal.strArea,
    thumb: rawMeal.strMealThumb ? new URL(rawMeal.strMealThumb) : null,
    youtubeURL: rawMeal.strYoutube ? new URL(rawMeal.strYoutube) : null,
    instructions,
    ingredients,
    tags,
  };
}

const searchMeal = async (name: string): Promise<Meal[]> => {
  const result = await axios.get("/search.php", {
    params: { s: name },
    ...defaultConfig,
  });

  const meals = result.data.meals;
  return meals ? meals.map(parseMeal) : [];
};

const fetchMeal = async (mealId: string): Promise<Meal | null> => {
  const result = await axios.get("/lookup.php", {
    params: { i: mealId },
    ...defaultConfig,
  });

  // this endpoint retuns an array of just 1 element or null
  const meal: RawMeal | null = result.data.meals?.[0];
  return meal ? parseMeal(meal) : null;
};

export { searchMeal, fetchMeal };
