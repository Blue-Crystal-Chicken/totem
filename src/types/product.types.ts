import type { CategoryResponse } from "./category.types";


export interface IngredientResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  category: CategoryResponse;
  description: string;
  // Generic attributes
  size: string | null;
  quantity: number | null;
  weight: number | null;
  liters: number | null;
  // Food properties
  isSpicy: boolean | null;
  flavor: string | null;
  temperature: string | null;
  isCarbonated: boolean | null;
  // Nutrition
  calories: number | null;
  isVegetarian: boolean | null;
  isVegan: boolean | null;
  isGlutenFree: boolean | null;
  // Price
  additions: number | null;
  price: number;
  // Media
  imgPath: string | null;
  // Ingredients
  ingredients: IngredientResponse[];
  updatedAt: string;
}
