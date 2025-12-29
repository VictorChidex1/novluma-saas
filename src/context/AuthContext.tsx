import React, { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { sendWelcomeEmail } from "../lib/email";

interface AuthContextType {
  user: User | null;
  userRole: "admin" | "user" | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "user" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user role
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserRole(userSnap.data().role as "admin" | "user");
        } else {
          setUserRole("user");
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const createUserProfile = async (user: User, name?: string) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const displayName = name || user.displayName || "User";

        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: displayName,
          photoURL: user.photoURL,
          role: "user",
          plan: "free",
          usage: {
            wordsUsed: 0,
            cycleStart: serverTimestamp(),
          },
          createdAt: serverTimestamp(),
        });

        // Send Welcome Email for NEW users only
        if (user.email) {
          await sendWelcomeEmail(user.email, displayName);
        }
      }
    } catch (error) {
      console.error("Error creating user profile", error);
    }
  };

  // Handle Redirect Result on Mount
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("Redirect sign-in successful, creating profile...");
          await createUserProfile(result.user);
        }
      } catch (error) {
        console.error("Error handling redirect result", error);
        // You could set a global error state here if needed
      }
    };
    handleRedirectResult();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      // Architect's Note: Switched to Popup for ALL devices to avoid Safari ITP Redirect Loops.
      // signInWithRedirect is unreliable on modern mobile browsers without custom domain proxies.
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
    } catch (error: any) {
      if (error.code === "auth/popup-blocked") {
        // Only fallback to redirect if absolutely necessary (e.g. strict in-app browsers)
        console.warn("Popup blocked, falling back to redirect...");
        sessionStorage.setItem("authRedirecting", "true");
        await signInWithRedirect(auth, provider);
      } else {
        console.error("Error signing in with Google", error);
        throw error;
      }
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update the user's profile with their name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      // Create the user document in Firestore
      await createUserProfile(result.user, name);
    } catch (error) {
      console.error("Error signing up with email", error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in with email", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Error sending password reset email", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        resetPassword,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
