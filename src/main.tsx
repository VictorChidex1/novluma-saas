import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initEmail } from "./lib/email";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Initialize EmailJS
initEmail();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
