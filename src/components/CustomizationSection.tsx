import React from "react";
import { Card, CardBody, CardFooter, Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const CustomizationSection: React.FC = () => {
  const options = [
    { key: "colors", title: "Colores", icon: "lucide:palette",
      description: "Personaliza los colores de tu uniforme según la identidad de tu equipo.",
      features: ["Paleta ilimitada de colores","Combinaciones personalizadas","Degradados y efectos especiales","Coincidencia exacta con colores corporativos"],
      image: "https://img.heroui.chat/image/sports?w=600&h=400&u=jersey-colors" },
    { key: "logos", title: "Logos", icon: "lucide:badge",
      description: "Incorpora logos de equipo y patrocinadores en alta definición.",
      features: ["Impresión de alta definición","Posicionamiento personalizado","Tamaños ajustables","Múltiples logos y emblemas"],
      image: "https://img.heroui.chat/image/sports?w=600&h=400&u=jersey-logos" },
    { key: "sizes", title: "Tallas", icon: "lucide:ruler",
      description: "Amplia gama de tallas para asegurar el ajuste perfecto.",
      features: ["Tallas estándar y personalizadas","Ajustes por posición","Opciones niños y adultos","Cortes masculinos y femeninos"],
      image: "https://img.heroui.chat/image/sports?w=600&h=400&u=jersey-sizes" },
    { key: "numbers", title: "Numeración", icon: "lucide:hash",
      description: "Personaliza numeración con estilos y ubicaciones.",
      features: ["Múltiples estilos de números","Posicionamiento personalizado","Efectos especiales","Nombres y números coordinados"],
      image: "https://img.heroui.chat/image/sports?w=600&h=400&u=jersey-numbers" },
  ];

  return (
    <section id="customization" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Opciones de <span className="text-primary">Personalización</span></h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">Crea uniformes únicos con nuestras múltiples opciones.</p>
          </div>

          <Tabs aria-label="Opciones de personalización" color="primary" variant="underlined" classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/10",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12 text-white",
            tabContent: "group-data-[selected=true]:text-primary"
          }}>
            {options.map((o) => (
              <Tab key={o.key} title={<div className="flex items-center gap-2"><Icon icon={o.icon} /><span>{o.title}</span></div>}>
                <Card className="mt-8 bg-content1 border border-white/10">
                  <CardBody className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="p-6 md:p-8">
                        <h3 className="text-2xl font-semibold mb-4 text-white">Personalización de {o.title}</h3>
                        <p className="text-foreground-500 mb-6">{o.description}</p>
                        <h4 className="font-medium mb-3 text-white">Características:</h4>
                        <ul className="space-y-3">
                          {o.features.map((f, i) => (
                            <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .3, delay: i * .08 }} className="flex items-center gap-2">
                              <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                                <Icon icon="lucide:check" className="text-primary text-xs" />
                              </div>
                              <span className="text-foreground-500">{f}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-content2 flex items-center justify-center p-6">
                        <img src={o.image} alt={`Personalización de ${o.title}`} className="max-w-full max-h-[300px] object-contain rounded-md" />
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter className="flex justify-end gap-2 border-t border-white/10">
                    <Button className="bg-white/10 text-white hover:bg-white/15" startContent={<Icon icon="lucide:info" />}>Más información</Button>
                    <Button color="primary" startContent={<Icon icon="lucide:message-square" />}>Consultar opciones</Button>
                  </CardFooter>
                </Card>
              </Tab>
            ))}
          </Tabs>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "lucide:sparkles", title: "Materiales Premium", description: "Telas de alto rendimiento: comodidad y durabilidad." },
              { icon: "lucide:shirt", title: "Diseños Exclusivos", description: "Creaciones únicas para la identidad de tu equipo." },
              { icon: "lucide:shield", title: "Calidad Garantizada", description: "Rigurosos controles antes de la entrega." },
            ].map((f, i) => (
              <Card key={i} className="bg-content3 border border-white/10">
                <CardBody className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mb-4">
                    <Icon icon={f.icon} className="text-primary text-xl" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">{f.title}</h3>
                  <p className="text-foreground-500">{f.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
