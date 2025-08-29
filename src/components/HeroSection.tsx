import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// Tus cuatro imágenes locales (ajusta rutas si cambian)
import whiteFront from "../img/jerseys/jerseyWhiteFront.png";
import whiteBack  from "../img/jerseys/jerseyWhiteBack.png";
import blackFront from "../img/jerseys/jerseyBlackFront.png";
import blackBack  from "../img/jerseys/jerseyBlackBack.png";

export const HeroSection: React.FC = () => {
  // frames en orden manual
  const frames = [blackFront, blackBack, whiteFront, whiteBack];

  const [idx, setIdx] = React.useState(0);

  const next = React.useCallback(
    () => setIdx((i) => (i + 1) % frames.length),
    [frames.length]
  );
  const prev = React.useCallback(
    () => setIdx((i) => (i - 1 + frames.length) % frames.length),
    [frames.length]
  );

  // Evitar seleccionar/arrastrar imagen
  const preventDrag = (e: React.DragEvent) => e.preventDefault();

  // Link directo a WhatsApp con mensaje
  const whatsappLink =
    "https://wa.me/529222107515?text=" +
    encodeURIComponent("Hola EliteDesigns, quiero cotizar uniformes.");

  return (
    <section
      id="home"
      className="
        relative overflow-hidden hero-gradient
        pt-24 md:pt-28 lg:pt-32
        pb-12 md:pb-16
      "
    >
      {/* fondo radial suave detrás del jersey */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[1200px] h-[1200px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(18, 37, 75, .85) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
          {/* Texto */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 text-white">
                Uniformes <span className="text-primary">sublimados</span> con
                estilo
              </h1>
              <p className="text-foreground-500 text-lg md:text-xl mb-8">
                Calidad premium, acabados limpios y personalización total.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  as={Link}
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  size="lg"
                  className="font-semibold"
                  startContent={<Icon icon="mdi:whatsapp" />}
                >
                  Cotiza por WhatsApp
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

          {/* Vista del jersey (manual, sin autoplay) */}
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto w-full max-w-[520px] aspect-[3/4]">
              {/* imagen actual */}
              <img
                src={frames[idx]}
                alt="Jersey EliteDesigns"
                className="
                  absolute inset-0 w-full h-full object-contain
                  select-none pointer-events-none
                  transition-transform duration-150 ease-out
                "
                onDragStart={preventDrag}
              />

              {/* flechas */}
              <button
                aria-label="Anterior"
                onClick={prev}
                className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  grid place-items-center h-10 w-10 rounded-full
                  bg-white/10 hover:bg-white/20 backdrop-blur
                  border border-white/10 text-white
                "
              >
                <Icon icon="lucide:chevron-left" />
              </button>
              <button
                aria-label="Siguiente"
                onClick={next}
                className="
                  absolute right-0 top-1/2 -translate-y-1/2
                  grid place-items-center h-10 w-10 rounded-full
                  bg-white/10 hover:bg-white/20 backdrop-blur
                  border border-white/10 text-white
                "
              >
                <Icon icon="lucide:chevron-right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* pequeño degradé al final del hero */}
      <div className="absolute -z-10 bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
