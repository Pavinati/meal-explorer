export type Meal = {
  id: string;
  name: string;
  alternateName: string | null;
  category: string;
  area: string;
  instructions: string[];
  thumb: URL | null;
  tags: string[];
  youtubeURL: URL | null;
  ingredients: Ingredient[];
};

export type Ingredient = {
  ingredient: string;
  measure: string;
};
