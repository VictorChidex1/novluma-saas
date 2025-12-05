import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (
  topic: string,
  platform: string,
  tone: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an expert content creator. Write a ${platform} about "${topic}".
      
      Tone: ${tone}
      
      Requirements:
      - If it's a Twitter Thread, separate tweets with "---".
      - If it's a LinkedIn Post, use professional formatting and hashtags.
      - If it's a Blog Post, include a catchy title and clear headings.
      - If it's an Email, include a subject line.
      
      Make it engaging, high-quality, and ready to post.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(
      "Failed to generate content. Please check your API key or try again."
    );
  }
};
