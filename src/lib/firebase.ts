import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

import { getStorage } from "firebase/storage";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// App Check Implementation
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

if (typeof window !== "undefined") {
  // Localhost Debug Token
  if (import.meta.env.DEV) {
    // @ts-ignore
    // We force the token to match what the user typed in Firebase Console (matching their "0bce" typo)
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = "3d3c969c-0bce-4068-90eb-8c0b71b49c9d";
    console.log("🔧 Using Hardcoded Debug Token for Localhost");
  }

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  if (siteKey) {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
    console.log("🛡️ App Check Security Enabled");
  } else {
    console.warn("⚠️ App Check disabled: Missing VITE_RECAPTCHA_SITE_KEY");
  }
}
