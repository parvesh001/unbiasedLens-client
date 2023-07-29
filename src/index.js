import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import CategoryContextProvider from "./context/categoryContext";
import App from "./App";
import "./index.scss";
import 'bootstrap/dist/css/bootstrap.css';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
