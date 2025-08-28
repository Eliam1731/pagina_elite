import React from "react";
import { Icon } from "@iconify/react";

type Props = {
  images: string[];      // orden: blanco-frente, blanco-espalda, negro-frente, negro-espalda
  fadeMs?: number;       // duración del fade (ms). Default: 150
};

export default function JerseyShowcase({ images, fadeMs = 150 }: Props) {
  // índice actual en el array de imágenes
  const [i, setI] = React.useState(0);

  // doble capa para crossfade inmediato
  const [showA, setShowA] = React.useState(true);
  const [aSrc, setASrc] = React.useState(images[0] ?? "");
  const [bSrc, setBSrc] = React.useState(images[1] ?? images[0] ?? "");

  // precarga para evitar “parpadeos”
  React.useEffect(() => {
    const cache = images.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      return img;
    });
    return () => { cache.forEach((img) => (img.src = "")); };
  }, [images]);

  const go = (dir: 1 | -1) => {
    if (!images.length) return;
    const next = (i + dir + images.length) % images.length;

    // pasa el próximo src a la capa oculta y luego hace toggle para el crossfade
    if (showA) setBSrc(images[next]);
    else setASrc(images[next]);

    setShowA(!showA);
    setI(next);
  };

  // accesos de teclado (← →)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, showA, images]);

  return (
    <div className="relative w-full max-w-[520px] h-[480px] md:h-[560px] mx-auto select-none">
      {/* Capa A */}
      <img
        src={aSrc}
        alt="Jersey EliteDesigns"
        draggable={false}
        decoding="async"
        loading="eager"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          opacity: showA ? 1 : 0,
          transform: "translateZ(0) scale(1.004)",
          willChange: "opacity, transform",
          transition: `opacity ${fadeMs}ms ease, transform ${fadeMs}ms ease`,
        }}
      />

      {/* Capa B */}
      <img
        src={bSrc}
        alt="Jersey EliteDesigns"
        draggable={false}
        decoding="async"
        loading="eager"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          opacity: showA ? 0 : 1,
          transform: "translateZ(0) scale(1.004)",
          willChange: "opacity, transform",
          transition: `opacity ${fadeMs}ms ease, transform ${fadeMs}ms ease`,
        }}
      />

      {/* Controles */}
      <button
        onClick={() => go(-1)}
        aria-label="Anterior"
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
      >
        <Icon icon="lucide:chevron-left" className="w-5 h-5" />
      </button>

      <button
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition"
      >
        <Icon icon="lucide:chevron-right" className="w-5 h-5" />
      </button>
    </div>
  );
}
