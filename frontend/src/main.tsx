import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* ✅ Wrap your app with BrowserRouter for routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
