import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    { id: 1, name: "Carlos Mendoza", role: "Director Técnico, FC Águilas", image: "https://img.heroui.chat/image/avatar?w=150&h=150&u=1", content: "Los uniformes que EliteDesigns creó superaron nuestras expectativas. Calidad y precisión excepcionales.", rating: 5 },
    { id: 2, name: "Laura Sánchez", role: "Capitana, Halcones BC", image: "https://img.heroui.chat/image/avatar?w=150&h=150&u=2", content: "Entendieron nuestra visión y la calidad es impresionante incluso tras múltiples lavados.", rating: 5 },
    { id: 3, name: "Miguel Rodríguez", role: "Presidente, Club Leones", image: "https://img.heroui.chat/image/avatar?w=150&h=150&u=3", content: "Atención al detalle, servicio y producto inigualables. Seguiremos trabajando con ellos.", rating: 5 },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-content2">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Lo que dicen nuestros <span className="text-primary">Clientes</span></h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">Por qué equipos confían en EliteDesigns.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .08 * i }}>
                <Card className="testimonial-card h-full bg-content1 border border-white/10">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar src={t.image} alt={t.name} size="lg" isBordered color="primary" />
                      <div>
                        <h3 className="text-white font-semibold">{t.name}</h3>
                        <p className="text-foreground-500 text-sm">{t.role}</p>
                      </div>
                    </div>
                    <div className="mb-3 flex">
                      {Array(5).fill(0).map((_, i2) => (
                        <Icon key={i2} icon="lucide:star" className={`${i2 < t.rating ? 'text-warning' : 'text-white/20'} text-lg`} />
                      ))}
                    </div>
                    <p className="text-foreground-500 text-sm">"{t.content}"</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
