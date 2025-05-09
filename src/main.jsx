import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import Sidebar from "./componenents/Sidebar.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { AppNavbar } from "./componenents/AppNavbar.jsx";
import { AppRoutes } from "./componenents/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Sidebar />
    <AppNavbar />
    <AppRoutes />
  </BrowserRouter>
);
