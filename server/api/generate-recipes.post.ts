import { GoogleGenerativeAI } from "@google/generative-ai";
import type RecipeResponse from "~/types/RecipeResponse";

const cleanupResponse = (response: any): RecipeResponse => {
  return {
    id: response.id || Date.now(),
    name: response.name || "",
    ingredients: Array.isArray(response.ingredients)
      ? response.ingredients
      : [],
    calories: response.calories || "0",
    protein: response.protein || "0",
    carbs: response.carbs || "0",
    fats: response.fats || "0",
    healthBenefits: response.healthBenefits || "",
    image: response.image || "",
    preparationTime: response.preparationTime || "0",
    instructions: Array.isArray(response.instructions)
      ? response.instructions
      : [],
    rating: response.rating || "0",
    difficulty: response.difficulty || "medium",
    concerns: response.concerns || "",
    recommendation: response.recommendation || "",
    description: response.description || "",
  };
};

export default defineEventHandler(async (event) => {
  const { apiSecret } = useRuntimeConfig();

  try {
    if (!apiSecret) {
      throw new Error("API key is required");
    }

    const userData = await readBody(event);

    const genAI = new GoogleGenerativeAI(apiSecret);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are an API that returns only raw JSON without any markdown formatting or code blocks. Generate healthy recipes based on this user profile. Here is the user profile:
      - Age: ${userData.age} years
      - Gender: ${userData.gender}
      - Weight: ${userData.weight} ${userData.weightUnit}
      - Height: ${userData.height} ${userData.weightUnit}
      ${userData.disease ? `- Medical conditions: ${userData.disease}` : ""}

      Return a single JSON object (not an array) in exactly this format without any additional text, markdown, or code blocks:
      {
        "id": "unique number recipe id",
        "name": "Recipe name",
        "ingredients": ["ingredient 1", "ingredient 2"],
        "calories": "average value of calories per serving",
        "protein": "protein in grams",
        "carbs": "carbohydrates in grams",
        "fats": "fats in grams",
        "healthBenefits": "quick health benefits summary",
        "image": "online image link of the recipe that can be passed directly to an img tag to display the visual representation of the recipe - please make top priority to provide this, an image of an ingredient too is fine",
        "preparationTime": "preparation time in minutes",
        "instructions": ["step 1", "step 2"],
        "rating": "rating out of 5",
        "difficulty": "easy/medium/hard",
        description: "description of the recipe",
        "concerns": "concerns if any",
        "recommendation": "recommendation if any"
      }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up the response
    const cleanResponse = responseText
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .replace(/^\s+|\s+$/g, "")
      .replace(/,(\s*})/g, "}")
      .replace(/,(\s*])/g, "]");

    try {
      const parsed = JSON.parse(cleanResponse);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Invalid response format");
      }

      // Validate and clean up the response
      const cleanedResponse = cleanupResponse(parsed);
      return cleanedResponse;
    } catch (parseError) {
      throw new Error(`Failed to parse recipe data: ${parseError}`);
    }
  } catch (error) {
    return {
      error: "Failed to generate recipe",
      details: error instanceof Error ? error.message : String(error),
    };
  }
});
