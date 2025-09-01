import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

// Carga perezosa de imágenes en src/img/personalizacion/
const rawImgs = import.meta.glob("../img/personalizacion/*.{png,jpg,jpeg,webp}", {
  eager: true,
}) as Record<string, { default: string }>;

function pickImage(basename: string): string | null {
  const entry = Object.entries(rawImgs).find(([p]) =>
    p.toLowerCase().endsWith(`/personalizacion/${basename.toLowerCase()}.png`) ||
    p.toLowerCase().endsWith(`/personalizacion/${basename.toLowerCase()}.jpg`) ||
    p.toLowerCase().endsWith(`/personalizacion/${basename.toLowerCase()}.jpeg`) ||
    p.toLowerCase().endsWith(`/personalizacion/${basename.toLowerCase()}.webp`)
  );
  return entry?.[1]?.default ?? null;
}

type TabKey = "colores" | "logos" | "tallas" | "numeracion";

const TABS: { key: TabKey; label: string; imgBase: string; bullets: string[] }[] = [
  {
    key: "colores",
    label: "Colores",
    imgBase: "colores_1",
    bullets: [
      "Paleta ilimitada y combinaciones personalizadas.",
      "Degradados y efectos especiales.",
      "Coincidencia con colores corporativos.",
    ],
  },
  {
    key: "logos",
    label: "Logos",
    imgBase: "logos_1",
    bullets: [
      "Integración fiel de escudos y patrocinadores.",
      "Vectores nítidos sin pérdida de calidad.",
      "Ubicaciones optimizadas para visibilidad.",
    ],
  },
  {
    key: "tallas",
    label: "Tallas",
    imgBase: "tallas_1",
    bullets: [
      "Amplio rango de tallas para todo el equipo.",
      "Cortes unisex y específicos por deporte.",
      "Guía de tallas descargable en PDF.",
    ],
  },
  {
    key: "numeracion",
    label: "Numeración",
    imgBase: "num_1",
    bullets: [
      "Tipografías personalizadas para nombre y número.",
      "Estilos sólidos, contornos y efectos.",
      "Ubicación y tamaño reglamentarios.",
    ],
  },
];

export const CustomizationSection: React.FC = () => {
  const [active, setActive] = React.useState<TabKey>("colores");
  const tab = TABS.find((t) => t.key === active)!;
  const imgSrc = pickImage(tab.imgBase);

  // Swatches de ejemplo (puedes cambiarlos por los de tu marca)
  const swatches = [
    "#111827", "#374151", "#6B7280", "#D1D5DB",
    "#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8",
    "#F59E0B", "#10B981", "#EF4444", "#A855F7",
  ];

  return (
    <section id="custom" className="relative bg-background py-20 md:py-28">
      {/* Degradé superior */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0B0B0F] to-transparent" />

      <div className="container mx-auto px-4 section-fade-in">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Personalización <span className="text-primary">total</span>
          </h2>
          <p className="text-foreground-500 max-w-2xl mx-auto mt-3">
            Ajustamos colores, logos, tallas y numeración para representar fielmente la identidad de tu equipo.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={
                  "px-4 py-2 rounded-xl text-sm border transition " +
                  (isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-content2 text-foreground-600 hover:bg-content3 border-white/10")
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LADO IZQUIERDO – ahora más lleno */}
          <div className="bg-content1 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-white text-xl font-semibold mb-4">{tab.label}</h3>

            {/* lista principal */}
            <ul className="space-y-3 text-foreground-500">
              {tab.bullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <Icon icon="lucide:check-circle2" className="text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Píldoras informativas */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-foreground-400">
                <Icon icon="lucide:clock-4" className="inline mr-1" />
                Entrega: 2–3 semanas
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-foreground-400">
                <Icon icon="lucide:users-round" className="inline mr-1" />
                Pedido mínimo: 6
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-foreground-400">
                <Icon icon="lucide:waves" className="inline mr-1" />
                Tela dry-fit 
              </span>
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                as="a"
                href="/disenos"
                color="primary"
                size="lg"
                startContent={<Icon icon="lucide:sparkles" />}
                className="font-semibold"
              >
                Ver diseños
              </Button>

              <Button
                as="a"
                href="/docs/guia_tallas.pdf"
                target="_blank"
                rel="noopener"
                variant="bordered"
                color="primary"
                startContent={<Icon icon="lucide:download" />}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Guía de tallas
              </Button>
            </div>

            {/* Separador */}
            <div className="my-7 h-px bg-white/10" />

            {/* Mini checklist extra */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 grid place-items-center">
                  <Icon icon="lucide:palette" className="text-primary" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">Pruebas de color</p>
                  <p className="text-foreground-500">Te mostramos previews antes de producir.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 grid place-items-center">
                  <Icon icon="lucide:shield-check" className="text-primary" />
                </div>
                <div className="text-sm">
                  <p className="text-white font-medium">Garantía de impresión</p>
                  <p className="text-foreground-500">Durabilidad y nitidez en cada prenda.</p>
                </div>
              </div>
            </div>

            {/* Swatches para “llenar” visualmente */}
            <div className="mt-7">
              <p className="text-foreground-400 text-sm mb-2">Paleta de ejemplo</p>
              <div className="grid grid-cols-12 gap-1.5">
                {swatches.map((c, i) => (
                  <span
                    key={i}
                    className="w-6 h-6 rounded-full border border-white/15"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Nota / WhatsApp */}
            <div className="mt-7 text-sm text-foreground-500">
              ¿Dudas de tallas o materiales?
              <a
                href="https://wa.me/529222107515?text=Hola%20EliteDesigns,%20necesito%20ayuda%20con%20las%20tallas%20y%20materiales."
                className="ml-2 text-primary hover:underline"
                target="_blank"
                rel="noopener"
              >
                Escríbenos por WhatsApp
              </a>
              .
            </div>
          </div>

          {/* LADO DERECHO – mockup con imagen */}
          <div className="bg-content1 border border-white/10 rounded-2xl p-4 md:p-6">
            <div
              className="
                relative w-full h-[420px] md:h-[520px]
                overflow-hidden rounded-2xl group
              "
            >
              {/* Fondo: halo + cuadrícula */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  backgroundImage: `
                    radial-gradient(60% 60% at 50% 25%, rgba(37,99,235,.20), rgba(0,0,0,0) 60%),
                    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 28px 28px, 28px 28px",
                  backgroundPosition: "center, center, center",
                }}
              />

              {/* Imagen */}
              <div className="w-full h-full flex items-center justify-center">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={`${tab.label} - EliteDesigns`}
                    className="
                      max-h-full max-w-full object-contain select-none
                      transition-transform duration-300 ease-out
                      group-hover:scale-[1.02]
                    "
                    draggable={false}
                    decoding="async"
                    loading="lazy"
                  />
                ) : (
                  <div className="text-foreground-500 text-center px-6">
                    <p className="font-medium">Imagen no encontrada</p>
                    <p className="text-sm mt-1">
                      Sube <span className="font-semibold">{tab.imgBase}</span> a
                      <code className="ml-1">src/img/personalizacion/</code>.
                    </p>
                  </div>
                )}
              </div>

              {/* Sombra y chips de mockup */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/5 h-8 bg-black/40 blur-2xl rounded-full pointer-events-none" />
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 backdrop-blur text-white">
                  <Icon className="inline mr-1" icon="lucide:scan-line" />
                  Sublimación HD
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 backdrop-blur text-white">
                  <Icon className="inline mr-1" icon="lucide:waves" />
                  Tela dry-fit
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {["#60A5FA", "#3B82F6", "#1D4ED8"].map((c, i) => (
                  <span
                    key={i}
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Degradé inferior */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-[#0B0B0F]" />
    </section>
  );
};
