// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import HomePage from "./pages/HomePage";
import DesignsPage from "./pages/DesignsPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollToTop /> {/* 👈 aquí */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/designs" element={<DesignsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
