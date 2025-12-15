import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { BrandVoice, BrandVoiceAnalysis } from "../types";

const COLLECTION_NAME = "brand_voices";

export const addBrandVoice = async (
  userId: string,
  name: string,
  exemplar: string,
  analysis: BrandVoiceAnalysis
) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      userId,
      name,
      exemplar,
      analysis,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding brand voice:", error);
    throw error;
  }
};

export const getBrandVoices = async (userId: string): Promise<BrandVoice[]> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    // Sort by createdAt desc in memory (or add index in Firebase)
    const voices = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BrandVoice[];

    return voices.sort((a, b) => {
      // Handle potential null/missing dates gracefully
      const timeA = a.createdAt?.seconds || 0;
      const timeB = b.createdAt?.seconds || 0;
      return timeB - timeA;
    });
  } catch (error) {
    console.error("Error fetching brand voices:", error);
    throw error;
  }
};

export const deleteBrandVoice = async (voiceId: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, voiceId));
  } catch (error) {
    console.error("Error deleting brand voice:", error);
    throw error;
  }
};

export const getBrandVoiceById = async (
  voiceId: string
): Promise<BrandVoice | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, voiceId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BrandVoice;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching brand voice by ID:", error);
    throw error;
  }
};
