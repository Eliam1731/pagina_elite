import React from "react";
import { Button, Link } from "@heroui/react";
import { Icon } from "@iconify/react";

const phone = "5219222107515";
const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
  "Hola EliteDesigns, me interesan sus diseños."
)}`;

export default function Designs() {
  return (
    <section className="pt-28 pb-20 container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tienda de Diseños</h1>
      <p className="text-foreground-500 mb-8">
        Explora nuestros diseños listos para personalizar. Muy pronto verás el catálogo aquí.
      </p>

      <Button
        as={Link}
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        color="primary"
        startContent={<Icon icon="lucide:whatsapp" />}
      >
        Pregunta por diseños en WhatsApp
      </Button>
    </section>
  );
}
