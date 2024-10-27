export default interface RecipeResponse {
  id: number;
  image: string;
  name: string;
  ingredients: string[];
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
  healthBenefits: string;
  concerns: string;
  recommendation: string;
}
