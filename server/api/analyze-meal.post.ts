import { GoogleGenerativeAI } from "@google/generative-ai";

interface MealAnalysisResult {
  ingredients: string[];
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  healthBenefits: string;
  concerns?: string;
  recommendation: string;
}

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

    // Get form data with error handling
    let formData;
    try {
      formData = await readFormData(event);
    } catch (formError) {
      throw createError({
        statusCode: 400,
        message: "Error reading form data",
      });
    }

    const imageFile = formData.get("image");
    if (!imageFile) {
      throw createError({
        statusCode: 400,
        message: "Image file is missing",
      });
    }

    // Validate file type
    if (!(imageFile instanceof File) || !imageFile.type.startsWith("image/")) {
      throw createError({
        statusCode: 400,
        message: "Invalid file type. Please upload an image.",
      });
    }

    // Convert image to base64 with error handling
    let base64Data;
    try {
      const imageBytes = await imageFile.arrayBuffer();
      base64Data = Buffer.from(imageBytes).toString("base64");
    } catch (conversionError) {
      throw createError({
        statusCode: 500,
        message: "Error processing image file",
      });
    }

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(runtimeConfig.apiSecret);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Prepare the image data
      const imageData = {
        inlineData: {
          data: base64Data,
          mimeType: imageFile.type,
        },
      };

      const prompt = `You're a nutritional analyzer, analyze this food image and provide the following information in JSON format:
      {
        "ingredients": ["list of main visible ingredients"],
        "calories": "estimated calories per serving in kcals",
        "protein": "estimated protein content in grams",
        "carbs": "estimated carbohydrate content in grams",
        "fat": "estimated fat content in grams",
        "healthBenefits": "brief description of potential health benefits",
        "concerns": "any potential health concerns or allergens",
        "recommendation": "brief dietary recommendation"
      }
      Please ensure all numbers are provided as strings and use "N/A" if any value cannot be determined but try to estimate them especially calories, protein, carbs, fat, healthBenefits and recommendation.`;
      // Get response from Gemini
      const result = await model.generateContent([prompt, imageData]);
      const responseText = result.response.text();

      // Parse and validate the response
      let parsedResponse: MealAnalysisResult;
      try {
        // Find the JSON object in the response text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.error("No JSON found in response");
          throw new Error("No JSON found in response");
        }

        parsedResponse = JSON.parse(jsonMatch[0]);
        console.log("Parsed response:", parsedResponse);

        // Validate required fields
        const requiredFields = [
          "ingredients",
          "calories",
          "protein",
          "carbs",
          "fat",
          "healthBenefits",
          "recommendation",
        ];
        for (const field of requiredFields as (keyof MealAnalysisResult)[]) {
          if (!parsedResponse[field]) {
            if (field === "ingredients") {
              parsedResponse[field] = ["N/A"];
            } else {
              parsedResponse[field] = "N/A";
            }
          }
        }

        // Ensure ingredients is always an array
        if (!Array.isArray(parsedResponse.ingredients)) {
          parsedResponse.ingredients = [parsedResponse.ingredients].filter(
            Boolean
          );
        }
      } catch (parseError) {
        throw createError({
          statusCode: 500,
          message: "Failed to parse analysis results",
        });
      }

      return {
        success: true,
        response: parsedResponse,
      };
    } catch (aiError: any) {
      throw createError({
        statusCode: 500,
        message: "Error analyzing image with AI",
      });
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }

    if (error.message?.includes("quota")) {
      throw createError({
        statusCode: 429,
        message: "API rate limit exceeded. Please try again later.",
      });
    }

    throw createError({
      statusCode: 500,
      message: "Error analyzing food image",
    });
  }
});
