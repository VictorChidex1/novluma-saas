import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getBrandVoiceById } from "./brandVoices";

// KILL SWITCH: Global Guard
const checkSystemStatus = async () => {
  try {
    const settingsRef = doc(db, "system_config", "app_settings");
    const settingsSnap = await getDoc(settingsRef);

    if (settingsSnap.exists()) {
      const data = settingsSnap.data();
      if (data.ai_generation_enabled === false) {
        throw new Error(
          data.maintenance_message ||
            "System temporarily under maintenance. Please try again later."
        );
      }
    }
  } catch (error: any) {
    if (error.message.includes("maintenance")) throw error;
    console.warn("System check failed, proceeding:", error);
  }
};

// Helper to call our Vercel Proxy
const callGeminiProxy = async (payload: any) => {
  // 1. Get the current User ID Token
  const { auth } = await import("./firebase"); // Dynamic import to avoid cycles
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to generate content.");
  }

  const token = await user.getIdToken();

  // 2. Send Request with Token
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // <--- The Golden Key
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `Proxy Error: ${response.status}`);
  }

  return data;
};

export const generateContent = async (
  topic: string,
  platform: string,
  tone: string,
  voiceId?: string
): Promise<string> => {
  // 1. Check Kill Switch
  await checkSystemStatus();

  let brandVoiceInstruction = "";
  if (voiceId) {
    try {
      const voice = await getBrandVoiceById(voiceId);
      if (voice) {
        brandVoiceInstruction = `
        CRITICAL INSTRUCTION: You represent a specific author. You MUST write in their unique "Brand Voice".
        
        BRAND VOICE DNA:
        - Emotional Tone: ${voice.analysis.tone}
        - Sentence Structure: ${voice.analysis.sentence_structure}
        - Signature Vocabulary: ${voice.analysis.vocabulary.join(", ")}
        - Avoid These Words: ${
          voice.analysis.banned_words?.join(", ") || "None"
        }
        
        Do not sound generic. Sound like THIS person.
        `;
      }
    } catch (error) {
      console.warn("Failed to fetch brand voice, reverting to default.", error);
    }
  }

  const prompt = `
    ${brandVoiceInstruction || "You are an expert content creator."}
    
    Task: Write a ${platform} about "${topic}".
    
    ${!brandVoiceInstruction ? `Tone: ${tone}` : ""}
    
    Requirements:
    - If it's a Twitter Thread, separate tweets with "---".
    - If it's a LinkedIn Post, use professional formatting and hashtags.
    - If it's a Blog Post, include a catchy title and clear headings.
    - If it's an Email, include a subject line.
    - If it's an Instagram Caption, include engagement emojis, 20-30 relevant hashtags, and a short script idea for a Reel/Story if applicable.
    - If it's a TikTok Script, provide a scene-by-scene breakdown with visual cues and dialogue.
    - If it's a YouTube Video Script, include a hook, intro, body paragraphs with visual cues, and a strong call-to-action (CTA).
    
    Make it engaging, high-quality, and ready to post.
  `;

  // List of models and versions to try (Verified available models)
  const strategies = [
    { model: "gemini-2.0-flash", version: "v1beta" }, // Primary: Fast & Stable
    { model: "gemini-2.0-pro-exp", version: "v1beta" }, // Premium: High Intelligence (Requested)
    { model: "gemini-2.0-flash-exp", version: "v1beta" }, // Backup: Experimental Flash
    { model: "gemini-flash-latest", version: "v1beta" }, // Fallback: Generic
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      console.log(`Attempting: ${strategy.model} (${strategy.version})`);

      const data = await callGeminiProxy({
        contents: [{ parts: [{ text: prompt }] }],
        model: strategy.model,
        version: strategy.version,
      });

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        throw new Error("Invalid response format from AI");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.warn(
        `Failed strategy ${strategy.model} (${strategy.version}):`,
        error.message
      );
      lastError = error;

      // If it we got a server configuration error, stop trying
      if (error.message.includes("Missing API Key")) {
        throw error;
      }
    }
  }

  console.error("All strategies failed. Last error:", lastError);
  throw new Error(
    lastError?.message ||
      "Failed to generate content. Please check system status."
  );
};

export const refineContent = async (
  content: string,
  instruction: string
): Promise<string> => {
  // 1. Check Kill Switch
  await checkSystemStatus();

  const prompt = `
    You are an expert editor. Rewrite the following text based on this instruction: "${instruction}".
    
    ORIGINAL TEXT:
    "${content}"
    
    output ONLY the rewritten text. Do not include any explanations or quotes.
  `;

  const strategies = [
    { model: "gemini-2.0-flash", version: "v1beta" },
    { model: "gemini-2.0-pro-exp", version: "v1beta" },
    { model: "gemini-2.0-flash-exp", version: "v1beta" },
    { model: "gemini-flash-latest", version: "v1beta" },
  ];

  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_ONLY_HIGH",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_ONLY_HIGH",
    },
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      const data = await callGeminiProxy({
        contents: [{ parts: [{ text: prompt }] }],
        model: strategy.model,
        version: strategy.version,
        safetySettings,
      });

      if (data.promptFeedback && data.promptFeedback.blockReason) {
        throw new Error(
          `Blocked by safety filter: ${data.promptFeedback.blockReason}`
        );
      }

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content
      ) {
        if (
          data.candidates &&
          data.candidates[0] &&
          data.candidates[0].finishReason
        ) {
          throw new Error(
            `Generation stopped: ${data.candidates[0].finishReason}`
          );
        }
        throw new Error("Invalid response from AI");
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.warn(`Strategy ${strategy.model} failed:`, error);
      lastError = error;
    }
  }

  throw new Error(
    lastError?.message || "Failed to refine text. Please try again."
  );
};

export const analyzeBrandVoice = async (
  text: string
): Promise<{
  tone: string;
  sentence_structure: string;
  vocabulary: string[];
  banned_words: string[];
  emoji_usage: boolean;
}> => {
  // 1. Check Kill Switch
  await checkSystemStatus();

  const prompt = `
    Act as a Linguistic Expert. Analyze the following sample text to extract the author's unique writing style (Brand Voice).
    
    SAMPLE TEXT:
    "${text.slice(0, 2000)}"
    
    Return a JSON object with these exact keys:
    - "tone": A short description of the emotional tone (e.g., "Professional but Witty", "Urgent and Direct").
    - "sentence_structure": A description of how they structure sentences (e.g., "Short, punchy sentences", "Long, complex clauses").
    - "vocabulary": An array of 5-10 characteristic words or jargon they use.
    - "banned_words": An array of words they clearly avoid (or opposites of their style).
    - "emoji_usage": boolean (true if they use emojis, false otherwise).

    Return ONLY the JSON. No markedown formatting.
  `;

  const strategies = [
    { model: "gemini-2.0-flash", version: "v1beta" },
    { model: "gemini-2.0-pro-exp", version: "v1beta" },
    { model: "gemini-flash-latest", version: "v1beta" },
  ];

  let lastError: any = null;

  for (const strategy of strategies) {
    try {
      const data = await callGeminiProxy({
        contents: [{ parts: [{ text: prompt }] }],
        model: strategy.model,
        version: strategy.version,
        generationConfig: { responseMimeType: "application/json" },
      });

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) throw new Error("Empty response from AI");

      const jsonString = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      return JSON.parse(jsonString);
    } catch (error: any) {
      console.warn(
        `Analysis Strategy ${strategy.model} failed:`,
        error.message
      );
      lastError = error;
    }
  }

  throw new Error(
    lastError?.message || "Failed to analyze brand voice. Please try again."
  );
};
