import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import serviceAccount from "../serviceAccountKey.json" with { type: "json" };

// 1. Initialize Firebase Admin (Singleton Pattern)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });
}

const db = getFirestore();
const auth = getAuth();

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. CORS & Methods
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 2. Security: Verify ID Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing Token" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const email = decodedToken.email;

    // 3. Rate Limiting: Check Usage Quota
    const userRef = db.collection("users").doc(userId);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      await userRef.set({
        uid: userId,
        email: email,
        createdAt: FieldValue.serverTimestamp(),
        usage: {
          wordsUsed: 0,
          cycleStart: FieldValue.serverTimestamp(),
        },
      });
    }

    const userData = userSnap.data() || {};
    const isAdmin = userData.role === "admin";

    // Check Limits (Skip for Admins)
    if (!isAdmin) {
      const usage = userData.usage || {
        wordsUsed: 0,
        cycleStart: Timestamp.now(),
      };

      // Auto-Reset (Monthly)
      const now = new Date();
      const cycleStart = usage.cycleStart
        ? usage.cycleStart.toDate()
        : new Date();
      const diffDays = Math.ceil(
        Math.abs(now.getTime() - cycleStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays > 30) {
        // Reset Usage
        await userRef.update({
          usage: {
            wordsUsed: 0,
            cycleStart: FieldValue.serverTimestamp(),
          },
        });
        usage.wordsUsed = 0; // Local update for check below
      }

      // Hard Limit
      const LIMIT = 5000;
      if (usage.wordsUsed >= LIMIT) {
        return res.status(403).json({
          error:
            "Usage Limit Exceeded. You have used your 5,000 word quota for this month.",
        });
      }
    }

    // 4. Call Google Gemini API
    const { contents, model, version, generationConfig, safetySettings } =
      req.body;

    const apiKey =
      process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Missing Server-Side API Key");

    const apiUrl = `https://generativelanguage.googleapis.com/${
      version || "v1beta"
    }/models/${model || "gemini-2.0-flash"}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents, generationConfig, safetySettings }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return res.status(geminiResponse.status).json(data);
    }

    // 5. Atomic Increment (The Cost)
    const generatedText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const roughWordCount = generatedText.split(/\s+/).length;

    if (roughWordCount > 0) {
      await userRef.update({
        "usage.wordsUsed": FieldValue.increment(roughWordCount),
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res.status(200).json(data);
  } catch (error) {
    console.error("API Error:", error);
    const err = error as { code?: string; message?: string };
    if (err.code === "auth/argument-error") {
      return res.status(401).json({ error: "Invalid Auth Token" });
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
}
