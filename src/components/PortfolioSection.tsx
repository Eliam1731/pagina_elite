import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const PortfolioSection: React.FC = () => {
  const portfolioItems = [
    { id: 1, category: "Fútbol", title: "FC Águilas - Uniforme Local" },
    { id: 2, category: "Baloncesto", title: "Halcones BC - Uniforme Visitante" },
    { id: 3, category: "Voleibol", title: "Tigres VC - Uniforme Completo" },
    { id: 4, category: "Rugby", title: "Toros Rugby - Edición Especial" },
    { id: 5, category: "Béisbol", title: "Leones BC - Uniforme Alternativo" },
    { id: 6, category: "Fútbol", title: "Deportivo Halcones - Edición Limitada" },
    { id: 7, category: "Baloncesto", title: "Panteras BC - Uniforme Conmemorativo" },
    { id: 8, category: "Voleibol", title: "Lobos VC - Uniforme de Temporada" },
  ];

  const [filter, setFilter] = React.useState("Todos");
  const categories = ["Todos", "Fútbol", "Baloncesto", "Voleibol", "Rugby", "Béisbol"];
  const filteredItems = filter === "Todos" ? portfolioItems : portfolioItems.filter(i => i.category === filter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Nuestro <span className="text-primary">Portafolio</span>
            </h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Explora nuestra colección de uniformes deportivos personalizados.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => {
              const selected = filter === category;
              return (
                <Button
                  key={category}
                  size="sm"
                  className={
                    selected
                      ? "bg-primary text-white border-transparent"
                      : "bg-white/5 text-white/80 border border-white/10 hover:bg-white/10"
                  }
                  variant={selected ? "solid" : "flat"}
                  onPress={() => setFilter(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .08 * index }}>
                <Card shadow="sm" className="portfolio-item bg-[#0F1322] border border-white/5 overflow-hidden">
                  <CardBody className="p-0 overflow-hidden">
                    <div className="relative group">
                      <img src={`https://img.heroui.chat/image/sports?w=400&h=500&u=jersey${item.id}`} alt={item.title} className="w-full h-64 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-xs text-primary-200 font-medium">{item.category}</span>
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <Button size="sm" className="mt-2 self-start bg-white/10 text-white border border-white/20 hover:bg-white/15" startContent={<Icon icon="lucide:eye" className="text-sm" />}>
                          Ver detalles
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-white/5 text-white border border-white/10 hover:bg-white/10" endContent={<Icon icon="lucide:arrow-right" />}>
              Ver más diseños
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
