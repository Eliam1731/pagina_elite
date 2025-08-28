import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import whiteFront from "../img/jerseys/jerseyWhiteFront.png";
import whiteBack  from "../img/jerseys/jerseyWhiteBack.png";
import blackFront from "../img/jerseys/jerseyBlackFront.png";
import blackBack  from "../img/jerseys/jerseyBlackBack.png";

import JerseyShowcase from "./JerseyShowcase";

export const HeroSection: React.FC = () => {
  const images = [whiteFront, whiteBack, blackFront, blackBack];

  return (
    <section className="relative pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Texto */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
                Uniformes <span className="text-primary">sublimados</span> con estilo 
              </h1>

              <p className="text-foreground-500 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
                Calidad premium, acabados limpios y personalización total para tu equipo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  as={Link}
                  href="#contact"
                  color="primary"
                  size="lg"
                  className="font-semibold px-6 py-3 rounded-xl"
                  startContent={<Icon icon="lucide:clipboard-check" />}
                >
                  Cotiza tu uniforme
                </Button>

                <Button
                  as={Link}
                  href="#portfolio"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  className="font-semibold text-white border-white/20 hover:bg-white/10"
                  startContent={<Icon icon="lucide:image" />}
                >
                  Ver portafolio
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Visor de jerseys */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Glow de fondo */}
              <div
                className="pointer-events-none absolute -inset-10 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 40%, rgba(37,99,235,.22), transparent 60%)",
                }}
              />
              {/* Sin autoplay; solo flechas, fade rápido */}
              <JerseyShowcase images={images} fadeMs={120} />
            </div>
          </div>
        </div>
      </div>

      {/* Degradé inferior para cierre limpio */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
