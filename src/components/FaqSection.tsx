import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export const FaqSection: React.FC = () => {
  const faqItems = [
    { key: "1", title: "¿Tiempo de entrega?", content: "2–3 semanas estándar; opción express según cantidad." },
    { key: "2", title: "¿Materiales?", content: "Poliéster microperforado, dry-fit y mezclas de alto rendimiento." },
    { key: "3", title: "¿Cantidad mínima?", content: "Mínimo 10 uniformes, con precios escalonados." },
    { key: "4", title: "¿Diseño personalizado?", content: "3 propuestas iniciales + 3 rondas de ajustes." },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-content3">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Preguntas <span className="text-primary">Frecuentes</span></h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">Respuestas a dudas comunes.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
              <Accordion variant="bordered" className="bg-content1 border border-white/10 rounded-xl">
                {faqItems.map((it) => (
                  <AccordionItem key={it.key} aria-label={it.title} title={it.title} className="px-2">
                    <p className="text-foreground-500">{it.content}</p>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
