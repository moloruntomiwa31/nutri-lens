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

    const body = await readBody(event);
    const userMessage = body.message || body.question || "";

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(runtimeConfig.apiSecret);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `You're a nutritional AI assistant named Dr. Nutri. The user will ask you a question about nutrition, health, fitness and related topics. provide a helpful, precise and concise response. 
      
      User Question: ${userMessage}`;
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
