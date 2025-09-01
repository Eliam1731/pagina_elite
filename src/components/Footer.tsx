import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
// Si prefieres imagen de marca, descomenta e importa tu logo de letras:
// import logoLetras from "../img/logo_letra_blanco.png";

const WA = "https://wa.me/529222107515"; // WhatsApp Elite (formato internacional)
const IG = "https://instagram.com/";     // <-- pon tu perfil real
const FB = "https://facebook.com/";      // <-- pon tu fanpage real
const MAPS = "https://maps.google.com/?q=Minatitl%C3%A1n%2C+Veracruz%2C+Centro";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#0b0d12] border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Marca + social */}
          <div>
            {/* Si usas logo de letras:
            <img src={logoLetras} alt="ELITE" className="h-8 w-auto mb-4" />
            */}
            <div className="text-2xl font-extrabold tracking-wide text-white mb-3">
              ELITE
            </div>
            <p className="text-foreground-500 text-sm max-w-xs">
              Uniformes deportivos personalizados de alta calidad: estilo,
              rendimiento y durabilidad para tu equipo.
            </p>

            <div className="flex gap-3 mt-5">
              <Button
                as="a"
                href={IG}
                target="_blank"
                rel="noopener"
                isIconOnly
                variant="flat"
                className="bg-pink-500/90 hover:bg-pink-500 text-white"
                aria-label="Instagram"
              >
                <Icon icon="lucide:instagram" />
              </Button>
              <Button
                as="a"
                href={FB}
                target="_blank"
                rel="noopener"
                isIconOnly
                variant="flat"
                className="bg-blue-600/90 hover:bg-blue-600 text-white"
                aria-label="Facebook"
              >
                <Icon icon="lucide:facebook" />
              </Button>
              <Button
                as="a"
                href={WA}
                target="_blank"
                rel="noopener"
                isIconOnly
                variant="flat"
                className="bg-green-600/90 hover:bg-green-600 text-white"
                aria-label="WhatsApp"
              >
                <Icon icon="lucide:message-circle" />
              </Button>
              {/* YouTube (deja listo y oculto)
              <Button
                as="a"
                href="https://youtube.com/"
                target="_blank"
                rel="noopener"
                isIconOnly
                variant="flat"
                className="bg-red-600/90 hover:bg-red-600 text-white"
                aria-label="YouTube"
              >
                <Icon icon="lucide:youtube" />
              </Button>
              */}
            </div>
          </div>

          {/* Navegación (solo secciones reales) */}
          <div>
            <h4 className="text-white font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-foreground-500">
              <li><a className="hover:text-primary" href="#home">Inicio</a></li>
              <li><a className="hover:text-primary" href="#portfolio">Portafolio</a></li>
              <li><a className="hover:text-primary" href="#process">Proceso</a></li>
              <li><a className="hover:text-primary" href="#customization">Personalización</a></li>
              <li><a className="hover:text-primary" href="/disenos">Diseños</a></li>
              <li><a className="hover:text-primary" href="#faq">FAQ</a></li>
              <li><a className="hover:text-primary" href="#contact">Contacto</a></li>
            </ul>
          </div>

          {/* Recursos (reales) */}
          <div>
            <h4 className="text-white font-semibold mb-3">Recursos</h4>
            <ul className="space-y-2 text-foreground-500">
              <li>
                <a className="hover:text-primary" href="/guia_tallas.pdf" target="_blank" rel="noopener">
                  Guía de tallas (PDF)
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#customization">
                  Cuidado de uniformes
                </a>
              </li>
              <li>
                <a className="hover:text-primary" href="#faq">
                  Preguntas frecuentes
                </a>
              </li>
              {/* Si quieres dejar un catálogo PDF:
              <li>
                <a className="hover:text-primary" href="/catalogo.pdf" target="_blank" rel="noopener">
                  Catálogo PDF
                </a>
              </li>
              */}
            </ul>
          </div>

          {/* Contacto directo */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-foreground-500">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" className="text-primary" />
                <a className="hover:text-primary" href={MAPS} target="_blank" rel="noopener">
                  Minatitlán, Ver. (Col. Centro)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-primary" />
                <a className="hover:text-primary" href={WA} target="_blank" rel="noopener">
                  +52 922 210 7515 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:mail" className="text-primary" />
                <a className="hover:text-primary" href="mailto:elite.designs.mx2@gmail.com">
                  elite.designs.mx2@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-foreground-500">
          <p>© {year} EliteDesigns. Todos los derechos reservados.</p>

          {/* Actívalo cuando tengas PDFs en /public/legal/... */}
          {/*
          <div className="flex gap-4">
            <a className="hover:text-primary" href="/legal/terminos.pdf" target="_blank" rel="noopener">
              Términos y condiciones
            </a>
            <a className="hover:text-primary" href="/legal/privacidad.pdf" target="_blank" rel="noopener">
              Política de privacidad
            </a>
            <a className="hover:text-primary" href="/legal/cookies.pdf" target="_blank" rel="noopener">
              Política de cookies
            </a>
          </div>
          */}
        </div>
      </div>
    </footer>
  );
};
