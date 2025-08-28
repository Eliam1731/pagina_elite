import React from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { ProcessSection } from "./components/ProcessSection";
import { CustomizationSection } from "./components/CustomizationSection";
import { FaqSection } from "./components/FaqSection";
import { ContactSection } from "./components/ContactSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";

export default function App() {
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );
    document.querySelectorAll(".section-fade-in").forEach((s) => observer.observe(s));
    return () => document.querySelectorAll(".section-fade-in").forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <ProcessSection />
        <CustomizationSection />
        <FaqSection />
        <ContactSection />
        {/* 👇 Opiniones hasta el final */}
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
