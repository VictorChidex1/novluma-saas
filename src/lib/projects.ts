import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Project {
  id: string;
  userId: string;
  title: string;
  platform: string;
  tone: string;
  content: string;
  status: "Draft" | "In Progress" | "Completed";
  createdAt: Timestamp;
  words: number;
}

export const addProject = async (
  userId: string,
  data: {
    title: string;
    platform: string;
    tone: string;
    content?: string;
    words?: number;
  }
) => {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      userId,
      ...data,
      content: data.content || "Generated content placeholder...",
      status: "Completed",
      words: data.words || Math.floor(Math.random() * 1000) + 200,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};

export const getUserProjects = async (userId: string): Promise<Project[]> => {
  try {
    // Remove orderBy to avoid needing a composite index immediately
    const q = query(collection(db, "projects"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];

    // Sort client-side
    return projects.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA; // Descending order
    });
  } catch (error) {
    console.error("Error getting projects: ", error);
    throw error;
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await deleteDoc(doc(db, "projects", projectId));
  } catch (error) {
    console.error("Error deleting project: ", error);
    throw error;
  }
};

export const getProject = async (
  projectId: string
): Promise<Project | null> => {
  try {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await import("firebase/firestore").then((m) =>
      m.getDoc(docRef)
    );

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting project: ", error);
    throw error;
  }
};

export const updateProject = async (
  projectId: string,
  data: Partial<Project>
) => {
  try {
    const docRef = doc(db, "projects", projectId);
    await import("firebase/firestore").then((m) => m.updateDoc(docRef, data));
  } catch (error) {
    console.error("Error updating project: ", error);
    throw error;
  }
};
