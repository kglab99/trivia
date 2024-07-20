import React from "react";
import ReactDOM from "react-dom/client";
import TopBar from "./components/TopBar";

import "@fontsource/inter";

import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";
import "./index.css"; // Ensure this import is present

import { theme } from "./theme";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import routes from "./routes";

// const router = createBrowserRouter(routes);
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider
      defaultMode="dark" // Default mode for dark theme
      theme={theme}
    >
      <CssBaseline />
        <App />

    </CssVarsProvider>
  </React.StrictMode>
);
