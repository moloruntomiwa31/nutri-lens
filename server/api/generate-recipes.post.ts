import { GoogleGenerativeAI } from "@google/generative-ai";

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
    - Weight: ${userData.weight} ${userData.weightUnit}
    - Height: ${userData.height} ${userData.weightUnit}
    ${userData.disease ? `- Medical conditions: ${userData.disease}` : ""}

    Return a JSON object in exactly this format without any additional text, markdown, or code blocks:
    {
    "id"  : "unique number recipe id",
      "name": "Recipe name",
      "ingredients": ["ingredient 1", "ingredient 2"], array of strings with ingredients,
      "calories": "calories per serving",
      "protein": "protein in grams",
      "carbs": "carbohydrates in grams",
      "fats": "fats in grams",
      "healthBenefits": "quick health benefits summary",
      "image": "image link of the recipe that can be displayed on the website without any additional processing",
      "preparationTime": "preparation time in minutes",
      "instructions": ["step 1", "step 2"] array of strings with preparation instructions,
      "rating": "rating out of 5",
      "difficulty": "easy/medium/hard",
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up the response by removing markdown and code blocks
    const cleanResponse = responseText
      .replace(/```json\n?/g, "") // Remove ```json
      .replace(/```\n?/g, "") // Remove closing ```
      .replace(/^\s+|\s+$/g, ""); // Trim whitespace

    console.log("Raw response:", responseText);
    console.log("Cleaned response:", cleanResponse);

    const parsed = JSON.parse(cleanResponse);
    return {
      ...parsed,
      image: parsed.image || "",
    };
  } catch (error) {
    console.error("Error details:", error);
    return {
      error: "Failed to generate recipe",
      details: error,
    };
  }
});
