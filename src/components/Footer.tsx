import React from "react";
import { Link, Divider } from "@heroui/react";
import logoLetrasBlanco from "../img/logo_letra_blanco.png"; // 👈 logo con letras en blanco

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Empresa",
      links: [
        { name: "Sobre nosotros", href: "/about" },
        { name: "Nuestro equipo", href: "/team" },
        { name: "Carreras", href: "/careers" },
        { name: "Historia", href: "/history" },
      ],
    },
    {
      title: "Productos",
      links: [
        { name: "Uniformes de fútbol", href: "/products/futbol" },
        { name: "Uniformes de baloncesto", href: "/products/baloncesto" },
        { name: "Uniformes de voleibol", href: "/products/voleibol" },
        { name: "Accesorios deportivos", href: "/products/accesorios" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Guías de tallas", href: "/size-guide" },
        { name: "Cuidado de uniformes", href: "/care-guide" },
        { name: "Preguntas frecuentes", href: "/faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Términos y condiciones", href: "/terms" },
        { name: "Política de privacidad", href: "/privacy" },
        { name: "Política de cookies", href: "/cookies" },
        { name: "Política de devoluciones", href: "/returns" },
      ],
    },
  ];

  return (
    <footer className="bg-background text-white pt-16 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Marca */}
          <div className="lg:col-span-2">
            <img
              src={logoLetrasBlanco}
              alt="EliteDesigns"
              className="h-9 w-auto mb-5"
            />
            <p className="text-white/70 mb-6 max-w-md">
              Uniformes deportivos personalizados de alta calidad: estilo, rendimiento y durabilidad para tu equipo.
            </p>
            <div className="flex gap-4">
              {["facebook", "instagram", "twitter", "youtube"].map((net) => (
                <Link
                  key={net}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <span className="sr-only">{net}</span>
                  {/* simple bullets para no depender de iconos aquí */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* Columnas */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link
                      href={l.href}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider className="bg-white/20" />

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm">
            © {currentYear} EliteDesigns. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-white/70 hover:text-white text-sm transition-colors">
              Términos
            </Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
