import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Albums from "../pages/albums.jsx";
import Artistes from "../pages/artistes.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/artiste" element={<Artistes />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
