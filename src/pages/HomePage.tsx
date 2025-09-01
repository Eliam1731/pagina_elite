// src/pages/HomePage.tsx
import React from "react";
import { HeroSection } from "../components/HeroSection";
import { PortfolioSection } from "../components/PortfolioSection";
import { ProcessSection } from "../components/ProcessSection";
import { CustomizationSection } from "../components/CustomizationSection";
import { FaqSection } from "../components/FaqSection";
import { ContactSection } from "../components/ContactSection";
import { TestimonialsSection } from "../components/TestimonialsSection";

const HomePage: React.FC = () => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade-in").forEach((el) => observer.observe(el));
    return () =>
      document.querySelectorAll(".section-fade-in").forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <main>
      <HeroSection />
      <PortfolioSection />
      <ProcessSection />
      <CustomizationSection />
      <FaqSection />
      <ContactSection />
      {/* Opiniones/Calificación al final */}
      <TestimonialsSection />
    </main>
  );
};

export default HomePage;
