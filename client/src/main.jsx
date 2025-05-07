import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./component/App";
import AuthContext from "./component/AuthContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </StrictMode>
);
