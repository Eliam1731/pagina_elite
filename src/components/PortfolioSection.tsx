import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

/* ============================
   IMPORTA TUS IMÁGENES (solo 1 activa por ahora)
   Cambia .png por .jpg si usas JPG
   ============================ */
// FÚTBOL
import futbol_1 from "../img/portfolio/futbol_1.jpg";
// import futbol_2 from "../img/portfolio/futbol_2.png";
// import futbol_3 from "../img/portfolio/futbol_3.png";
// import futbol_4 from "../img/portfolio/futbol_4.png";
// import futbol_5 from "../img/portfolio/futbol_5.png";
// import futbol_6 from "../img/portfolio/futbol_6.png";

// VOLEIBOL
import volei_1 from "../img/portfolio/volei_1.jpg";
// import volei_2 from "../img/portfolio/volei_2.png";
// import volei_3 from "../img/portfolio/volei_3.png";
// import volei_4 from "../img/portfolio/volei_4.png";
// import volei_5 from "../img/portfolio/volei_5.png";
// import volei_6 from "../img/portfolio/volei_6.png";

// BALONCESTO
import bas_1 from "../img/portfolio/bas_1.jpg";
// import bas_2 from "../img/portfolio/bas_2.png";
// import bas_3 from "../img/portfolio/bas_3.png";
// import bas_4 from "../img/portfolio/bas_4.png";
// import bas_5 from "../img/portfolio/bas_5.png";
// import bas_6 from "../img/portfolio/bas_6.png";

// BÉISBOL
import beis_1 from "../img/portfolio/beis_1.jpg";
// import beis_2 from "../img/portfolio/beis_2.png";
// import beis_3 from "../img/portfolio/beis_3.png";
// import beis_4 from "../img/portfolio/beis_4.png";
// import beis_5 from "../img/portfolio/beis_5.png";
// import beis_6 from "../img/portfolio/beis_6.png";

type Sport = "all" | "futbol" | "baloncesto" | "voleibol" | "beisbol";
type SportOnly = Exclude<Sport, "all">;

const filters: { key: Sport; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "futbol", label: "Fútbol" },
  { key: "baloncesto", label: "Baloncesto" },
  { key: "voleibol", label: "Voleibol" },
  { key: "beisbol", label: "Béisbol" },
];

/* ============================
   ITEMS DEL PORTAFOLIO
   (4 activos ahora; el resto comentado y listo para usar)
   ============================ */
const items: { id: number; sport: SportOnly; src: string; alt: string }[] = [
  // Activos
  { id: 1, sport: "futbol", src: futbol_1, alt: "Uniforme de fútbol 1" },
  { id: 2, sport: "voleibol", src: volei_1, alt: "Uniforme de voleibol 1" },
  { id: 3, sport: "baloncesto", src: bas_1, alt: "Uniforme de baloncesto 1" },
  { id: 4, sport: "beisbol", src: beis_1, alt: "Uniforme de béisbol 1" },

  // Fútbol
  // { id: 5,  sport: "futbol", src: futbol_2, alt: "Uniforme de fútbol 2" },
  // { id: 6,  sport: "futbol", src: futbol_3, alt: "Uniforme de fútbol 3" },
  // { id: 7,  sport: "futbol", src: futbol_4, alt: "Uniforme de fútbol 4" },
  // { id: 8,  sport: "futbol", src: futbol_5, alt: "Uniforme de fútbol 5" },
  // { id: 9,  sport: "futbol", src: futbol_6, alt: "Uniforme de fútbol 6" },

  // Voleibol
  // { id: 10, sport: "voleibol", src: volei_2, alt: "Uniforme de voleibol 2" },
  // { id: 11, sport: "voleibol", src: volei_3, alt: "Uniforme de voleibol 3" },
  // { id: 12, sport: "voleibol", src: volei_4, alt: "Uniforme de voleibol 4" },
  // { id: 13, sport: "voleibol", src: volei_5, alt: "Uniforme de voleibol 5" },
  // { id: 14, sport: "voleibol", src: volei_6, alt: "Uniforme de voleibol 6" },

  // Baloncesto
  // { id: 15, sport: "baloncesto", src: bas_2, alt: "Uniforme de baloncesto 2" },
  // { id: 16, sport: "baloncesto", src: bas_3, alt: "Uniforme de baloncesto 3" },
  // { id: 17, sport: "baloncesto", src: bas_4, alt: "Uniforme de baloncesto 4" },
  // { id: 18, sport: "baloncesto", src: bas_5, alt: "Uniforme de baloncesto 5" },
  // { id: 19, sport: "baloncesto", src: bas_6, alt: "Uniforme de baloncesto 6" },

  // Béisbol
  // { id: 20, sport: "beisbol", src: beis_2, alt: "Uniforme de béisbol 2" },
  // { id: 21, sport: "beisbol", src: beis_3, alt: "Uniforme de béisbol 3" },
  // { id: 22, sport: "beisbol", src: beis_4, alt: "Uniforme de béisbol 4" },
  // { id: 23, sport: "beisbol", src: beis_5, alt: "Uniforme de béisbol 5" },
  // { id: 24, sport: "beisbol", src: beis_6, alt: "Uniforme de béisbol 6" },
];

export const PortfolioSection: React.FC = () => {
  const [active, setActive] = React.useState<Sport>("all");
  const [isMobile, setIsMobile] = React.useState(false);
  const [showAllMobile, setShowAllMobile] = React.useState(false);

  // Detecta móvil (<768px)
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Al cambiar filtro, colapsa en móvil
  React.useEffect(() => {
    setShowAllMobile(false);
  }, [active]);

  const filtered = React.useMemo(() => {
    if (active === "all") return items;
    return items.filter((i) => i.sport === active);
  }, [active]);

  const visible = React.useMemo(() => {
    if (!isMobile) return filtered;             // Desktop: todos
    if (showAllMobile) return filtered;         // Móvil expandido
    return filtered.slice(0, 3);                // Móvil: los 3 primeros
  }, [filtered, isMobile, showAllMobile]);

  return (
    <section id="portfolio" className="relative py-20 md:py-28 bg-background">
      {/* Degradé superior sutil */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0B0F] to-transparent" />

      <div className="container mx-auto px-4 section-fade-in">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Nuestro <span className="text-primary">Portafolio</span>
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto mt-3">
            Explora nuestros uniformes personalizados por disciplina.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {filters.map((f) => {
            const activeStyles =
              f.key === active
                ? "bg-primary text-white border-primary"
                : "bg-content2 text-foreground-600 hover:bg-content3 border-white/10";
            return (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`px-4 py-2 rounded-xl text-sm border transition ${activeStyles}`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((it) => (
            <div
              key={it.id}
              className="portfolio-item rounded-xl overflow-hidden bg-content1 border border-white/10 hover:border-white/20 transition"
            >
              <img
                src={it.src}
                alt={it.alt}
                className="w-full h-56 md:h-64 object-cover"
                draggable={false}
                decoding="async"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Ver más solo en móvil (si hay >3) */}
        {isMobile && !showAllMobile && filtered.length > 3 && (
          <div className="mt-8 flex justify-center md:hidden">
            <Button
              color="primary"
              size="md"
              onPress={() => setShowAllMobile(true)}
              startContent={<Icon icon="lucide:plus" />}
              className="font-medium"
            >
              Ver más
            </Button>
          </div>
        )}
      </div>

      {/* Degradé inferior sutil */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0B0B0F]" />
    </section>
  );
};
