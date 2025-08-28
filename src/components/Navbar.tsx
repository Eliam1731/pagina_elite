// src/components/Navbar.tsx
import React from "react";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import logoBlanco from "../img/logo_blanco.png";
import logoNegro from "../img/logo_negro.png"; // por si en el futuro usas navbar clara

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ====== CONTACTO POR WHATSAPP (MX) ======
  // Formato: 52 + 1 + número de 10 dígitos
  const phone = "5219222107515";
  const message = "Hola EliteDesigns, quiero cotizar uniformes personalizados.";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  // ========================================

  // SOLO Instagram y Facebook
  const socials = [
    { name: "Instagram", href: "https://www.instagram.com/_designs_elite_?igsh=MXB0d3lobm8yeG8yMw==", icon: "lucide:instagram" },
    { name: "Facebook", href: "https://www.facebook.com/share/1BLoEUhoQp/?mibextid=wwXIfr", icon: "lucide:facebook" },
  ];

  const menuItems = [
    { name: "Inicio", href: "#" },
    { name: "Portafolio", href: "#portfolio" },
    { name: "Proceso", href: "#process" },
    { name: "Personalización", href: "#customization" },
    { name: "Testimonios", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <HeroNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
      maxWidth="xl"
    >
      {/* Izquierda: menú + marca */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <img
              src={logoBlanco /* usa logoNegro si cambias a navbar clara */}
              alt="EliteDesigns"
              className="h-7 w-auto select-none"
              draggable={false}
            />
            <p className="font-bold text-white text-lg">
              Elite<span className="text-primary">Designs</span>
            </p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Centro: links (desktop) */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              href={item.href}
              color="foreground"
              className="font-medium text-sm hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Derecha: redes + WhatsApp (desktop) */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex items-center gap-3">
          {/* Redes (solo IG y FB) */}
          <div className="hidden md:flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Icon icon={s.icon} className="w-5 h-5" />
              </Link>
            ))}
          </div>

          {/* CTA WhatsApp */}
          <Button
            as={Link}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="solid"
            className="font-medium"
            startContent={<Icon icon="lucide:whatsapp" />}
          >
            Cotiza ahora
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Menú móvil */}
      <NavbarMenu className="pt-6">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              href={item.href}
              color="foreground"
              className="w-full font-medium text-lg py-2"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Botón WhatsApp y redes en móvil */}
        <div className="mt-4 space-y-3">
          <Button
            as={Link}
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            variant="solid"
            className="w-full font-medium"
            startContent={<Icon icon="lucide:whatsapp" />}
          >
            Escríbenos por WhatsApp
          </Button>

          <div className="flex items-center gap-4 px-1">
            {socials.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground-500 hover:text-primary transition"
              >
                <Icon icon={s.icon} className="w-5 h-5" />
                <span>{s.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
