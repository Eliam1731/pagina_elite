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
  Link as HeroLink,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { NavLink, Link as RouterLink } from "react-router-dom";

import logoBlanco from "../img/logo_blanco.png";

type MenuItem =
  | { name: string; href: string }   // ancla dentro de la landing (#seccion)
  | { name: string; route: string }; // ruta SPA (página nueva)

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Exponer la altura real del navbar en --nav-h
  React.useEffect(() => {
    const el = document.getElementById("site-navbar");
    const setVar = () => {
      const h = el?.getBoundingClientRect().height ?? 72;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    setVar();
    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);

  // WhatsApp CTA
  const phone = "5219222107515"; // 52 + 1 + 10 dígitos
  const message = "Hola EliteDesigns, quiero cotizar uniformes personalizados.";
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  // Solo IG y FB
  const socials = [
    { name: "Instagram", href: "https://www.instagram.com/_DESIGNS_ELITE_/#", icon: "lucide:instagram" },
    { name: "Facebook", href: "https://www.facebook.com/people/Elite-Designs/61561488215914/?mibextid=LQQJ4d", icon: "lucide:facebook" },
  ];

  // OJO: el anchor debe coincidir con el id del <section>
  const menuItems: MenuItem[] = [
    { name: "Inicio", href: "/#" },
    { name: "Portafolio", href: "/#portfolio" },
    { name: "Proceso", href: "/#process" },
    { name: "Personalización", href: "/#custom" }, // <-- usa este o cambia el id del section a "custom"
    { name: "Diseños", route: "/designs" },               // ruta SPA
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <HeroNavbar
      id="site-navbar"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      maxWidth="xl"
    >
      {/* Izquierda: menú + marca (marca lleva a Inicio) */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center gap-2">
            <img
              src={logoBlanco}
              alt="EliteDesigns"
              className="h-7 w-auto select-none"
              draggable={false}
            />
            <p className="font-bold text-white text-lg">
              Elite<span className="text-primary">Designs</span>
            </p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Centro: links (desktop) */}
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            {"route" in item ? (
              // Rutas SPA: NavLink (más confiable)
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `font-medium text-sm transition-colors ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              // Anclas absolutas: HeroLink
              <HeroLink
                href={item.href}
                color="foreground"
                className="font-medium text-sm hover:text-primary transition-colors"
              >
                {item.name}
              </HeroLink>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Derecha: redes + WhatsApp (desktop) */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            {socials.map((s) => (
              <HeroLink
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="text-white/80 hover:text-white transition-colors"
              >
                <Icon icon={s.icon} className="w-5 h-5" />
              </HeroLink>
            ))}
          </div>

          <Button
            as={HeroLink}
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
            {"route" in item ? (
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `w-full font-medium text-lg py-2 transition-colors ${
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ) : (
              <HeroLink
                href={item.href}
                color="foreground"
                className="w-full font-medium text-lg py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </HeroLink>
            )}
          </NavbarMenuItem>
        ))}

        {/* CTA WhatsApp y redes en móvil */}
        <div className="mt-4 space-y-3">
          <Button
            as={HeroLink}
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
              <HeroLink
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground-500 hover:text-primary transition"
              >
                <Icon icon={s.icon} className="w-5 h-5" />
                <span>{s.name}</span>
              </HeroLink>
            ))}
          </div>
        </div>
      </NavbarMenu>
    </HeroNavbar>
  );
};

export default Navbar;
