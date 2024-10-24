import { GoogleGenerativeAI } from "@google/generative-ai";
const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    // Get the form data from the request
    const formData = await readFormData(event);
    const imageFile = formData.get("image");

    // Convert image to base64
    const imageBytes = await (imageFile as File).arrayBuffer();

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(runtimeConfig.apiSecret);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare the image data
    const imageData = {
      inlineData: {
        data: Buffer.from(imageBytes).toString("base64"),
        mimeType: imageFile.type,
      },
    };

    // Generate prompt for the AI
    const prompt = `Analyze this food image and provide:
    1. A detailed list of likely ingredients and their nutritional value
    2. Estimated calories
    3. Health benefits and potential concerns
    4. A clear recommendation on whether it's healthy to eat
    Format the response in JSON format`;

    // Get response from Gemini
    const result = await model.generateContent([prompt, imageData]);
    const response = result.response;
    return { response };
  } catch (error) {
    console.error("Error in analyze-food:", error);
    throw createError({
      statusCode: 500,
      message: "Error analyzing food image",
    });
  }
});
