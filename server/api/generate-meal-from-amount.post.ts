import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const { apiSecret } = useRuntimeConfig();

  try {
    if (!apiSecret) {
      throw new Error("API key is required");
    }

    const mealBudget = await readBody(event);

    const genAI = new GoogleGenerativeAI(apiSecret);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // - Age: ${userData.age} years
    // - Weight: ${userData.weight} ${userData.weightUnit}
    // - Height: ${userData.height} ${userData.weightUnit}
    // ${userData.disease ? `- Medical conditions: ${userData.disease}` : ""}

    const prompt = `You are an API that returns only raw JSON without any markdown formatting or code blocks. Generate healthy meals, breakfast, lunch, dinner based on this user profile and the amount of money. Here is the user profile:
    - Amount: '${mealBudget.amount}' ${mealBudget.currency}

    Return a JSON object in exactly this format without any additional text, markdown, or code blocks:
    {
        "breakfast": ['breakfast 1', 'breakfast 2'],
        "lunch": ['lunch 1', 'lunch 2'],
        "dinner": ['dinner 1', 'dinner 2'],
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
      error: "Failed to generate meals",
      details: error,
    };
  }
});