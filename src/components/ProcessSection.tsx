import React from "react";
import { motion } from "framer-motion";
import { Clock, PencilRuler, Settings, Printer, Package } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    { icon: PencilRuler, title: "Diseño", desc: "Conceptos personalizados según tu identidad y colores." },
    { icon: Settings, title: "Producción", desc: "Materiales premium y confección precisa." },
    { icon: Printer, title: "Sublimación", desc: "Impresión HD duradera con acabado profesional." },
    { icon: Package, title: "Entrega", desc: "Control de calidad y envío a tiempo." },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-content2">
      <div className="container mx-auto px-4">
        <div className="section-fade-in visible">
          {/* Título */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">
              Nuestro <span className="text-primary">Proceso</span>
            </h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Cómo fabricamos uniformes de alta calidad, paso a paso.
            </p>
          </div>

          {/* Línea conectora */}
          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-4 h-px bg-white/10" />

            {/* Grid de pasos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.45, delay: i * 0.08 }}
                    className="relative pt-8"
                  >
                    {/* Badge centrado arriba */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-background">
                      {i + 1}
                    </div>

                    {/* Card más alta */}
                    <div className="glass rounded-2xl p-6 md:p-8 border border-white/10 overflow-visible hover:scale-[1.02] transition-transform duration-300 md:min-h-[220px] lg:min-h-[260px]">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-white font-semibold text-xl mb-2">
                        {s.title}
                      </h3>
                      <p className="text-foreground-500">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Nota inferior */}
          <div className="mt-10 md:mt-12 glass rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-foreground-500">
                <span className="text-white/80">Tiempos optimizados:</span>{" "}
                pedidos estándar en <span className="font-semibold text-white">2–3 semanas</span>. También contamos con opciones <span className="text-white/80">express</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
