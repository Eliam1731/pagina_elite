// src/components/TestimonialsSection.tsx
import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// ✅ IMPORTA la imagen local si está en src/img/avatars/1.jpg
import eliasAvatar from "../img/avatars/1.jpg";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  rating: number; // 1..5
  quote: string;
  avatar?: string; // opcional: por si falla, mostramos iniciales o DiceBear
};

const testimonials: Testimonial[] = [
  {
    name: "Ana Martínez",
    role: "Entrenador, Atomos Cosoleacaque",
    location: "Minatitlán, Ver.",
    rating: 5,
    quote:
      "Entendieron nuestra idea rápido y el resultado quedó increíble. La calidad del tejido y la sublimación aguantaron toda la temporada.",
    avatar: "https://img.heroui.chat/face/woman?i=8",
  },
  {
    name: "David Torres",
    role: "Entrenador, Academia Antares",
    location: "Coatzacoalcos, Ver.",
    rating: 5,
    quote:
      "Excelente atención y tiempos de entrega reales. Las tallas llegaron exactas y el diseño se ve profesional en cancha.",
    avatar: "https://img.heroui.chat/face/man?i=4",
  },
  {
    name: "Elias Jimenez",
    role: "Deportivo Titanes",
    location: "Xalapa, Veracruz",
    rating: 4,
    quote:
      "Muy buena calidad y detalle en el acabado. Solo ajustaría un poco el grosor del cuello, pero en general quedamos muy satisfechos.",
    // ✅ usa el import, NO un string relativo
    avatar: eliasAvatar,
  },
];

// Fallback con iniciales (DiceBear) por si una imagen remota/local falla
const dicebearAvatar = (name: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    name
  )}&radius=50&fontFamily=Inter&fontWeight=700&backgroundType=gradientLinear`;

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1 mt-1" aria-label={`Calificación ${rating} de 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        icon={i < rating ? "mdi:star" : "mdi:star-outline"}
        className={i < rating ? "text-warning" : "text-foreground-400"}
        width={18}
        height={18}
      />
    ))}
  </div>
);

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto section-fade-in mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Lo que dicen nuestros <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-foreground-500 mt-3">
            Reseñas reales de equipos de Coatzacoalcos, Minatitlán y Tabasco.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => {
            const initialSrc =
              t.avatar && t.avatar.trim().length > 0
                ? t.avatar
                : dicebearAvatar(t.name);

            return (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.08 * idx }}
              >
                <Card className="bg-content1/90 border border-white/10 testimonial-card h-full">
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar
                        src={initialSrc}
                        name={t.name} // si todo falla, muestra iniciales
                        size="lg"
                        radius="full"
                        className="ring-2 ring-primary/40"
                        imgProps={{
                          loading: "lazy",
                          referrerPolicy: "no-referrer",
                          onError: (e) => {
                            const img = e.currentTarget as HTMLImageElement;
                            if (!img.src.includes("dicebear.com")) {
                              img.src = dicebearAvatar(t.name);
                            }
                          },
                        }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white truncate">{t.name}</p>
                          <Icon icon="lucide:badge-check" className="text-primary" />
                        </div>
                        <p className="text-foreground-500 text-sm">
                          {t.role} • {t.location}
                        </p>
                        <Stars rating={t.rating} />
                      </div>
                    </div>

                    <p className="text-foreground-500 mt-4 leading-relaxed">“{t.quote}”</p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
