import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/inter";

import { CssVarsProvider } from "@mui/joy/styles";
import { CssBaseline } from "@mui/material";
import "./style/index.css"; 

import { theme } from "./style/theme";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssVarsProvider
      defaultMode="dark"
      theme={theme}
    >
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </React.StrictMode>
);
