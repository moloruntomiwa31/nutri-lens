import { GoogleGenerativeAI } from "@google/generative-ai";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  try {
    // Validate API key
    if (!runtimeConfig.apiSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: "API configuration error",
        message: "API key is not configured",
      });
    }

    const userPrompt = await readBody(event);

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(runtimeConfig.apiSecret);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You're a nutritional AI assistant. The user will ask you a question about nutrition and health. You should provide a helpful, precise and concise response based on this ${userPrompt}.`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      return { response: responseText };
    } catch (error) {
      console.error("Error generating response:", error);
      throw createError({
        statusCode: 500,
        message: "Failed to generate response",
      });
    }
  } catch (error) {
    console.error("Error handling API request:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to handle API request",
    });
  }
});
