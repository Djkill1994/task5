import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
);
