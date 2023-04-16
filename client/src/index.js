import React from "react";
import "./index.css";
import App from "./app";
import { AuthProvider } from "./contexts/auth/authProvider";
import { FavoritesProvider } from "./contexts/favorites/favoritesProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <App />
        <ToastContainer />
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
