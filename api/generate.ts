export const config = {
  runtime: "edge", // Use Edge runtime for speed and lower cost
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { contents, model, version, generationConfig, safetySettings } =
      await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "Server Configuration Error: Missing API Key",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/${
      version || "v1beta"
    }/models/${model || "gemini-2.0-flash"}:generateContent?key=${
      process.env.GEMINI_API_KEY
    }`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig,
        safetySettings,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
