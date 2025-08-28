import React from "react";
import { Icon } from "@iconify/react";

type Props = {
  frames: string[];          // p. ej. [whiteF, whiteB, blackF, blackB]
  alt?: string;
  height?: number;
  auto?: boolean;
  /** ms por frame (2000 = 2s) */
  speed?: number;
  /** ms de fade lineal entre capas */
  fadeMs?: number;
  className?: string;
  showControls?: boolean;
  pauseOnHover?: boolean;    // por defecto no pausamos para que el ritmo sea constante
};

export const Jersey360: React.FC<Props> = ({
  frames,
  alt = "Jersey 360",
  height = 520,
  auto = true,
  speed = 2000,
  fadeMs = 500,              // ← fundido suave y lineal
  className = "",
  showControls = true,
  pauseOnHover = false,
}) => {
  // doble buffer
  const [srcA, setSrcA] = React.useState(frames[0] ?? "");
  const [srcB, setSrcB] = React.useState(frames[1] ?? frames[0] ?? "");
  const [useAFront, setUseAFront] = React.useState(true);  // qué capa está al frente
  const [loaded, setLoaded] = React.useState(false);

  // índice actual en un ref para que el autoplay sea estable aunque cambie el estado
  const indexRef = React.useRef(0);
  const timeoutRef = React.useRef<number | null>(null);
  const mountedRef = React.useRef(true);

  const stop = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // precarga y setup inicial
  React.useEffect(() => {
    mountedRef.current = true;
    if (!frames?.length) { setLoaded(false); return; }

    // precargamos todas
    let cancel = false;
    const preload = (src: string) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.onload = () => res();
        img.onerror = () => res();
        img.src = src;
      });

    (async () => {
      await Promise.all(frames.map(preload));
      if (cancel || !mountedRef.current) return;

      indexRef.current = 0;
      setSrcA(frames[0]);
      setSrcB(frames[1 % frames.length]);
      setUseAFront(true);
      setLoaded(true);
    })();

    return () => { cancel = true; mountedRef.current = false; stop(); };
  }, [frames, stop]);

  // cambia con cross-fade sin parpadeo
  const goTo = React.useCallback((nextIdx: number) => {
    if (!mountedRef.current || !frames.length) return;

    const nextSrc = frames[nextIdx];
    // ponemos la siguiente imagen en la capa de atrás
    if (useAFront) setSrcB(nextSrc);
    else setSrcA(nextSrc);

    // En el siguiente frame cambiamos qué capa está al frente → sólo opacidad
    requestAnimationFrame(() => {
      if (!mountedRef.current) return;
      setUseAFront((v) => !v);
      indexRef.current = nextIdx;
    });
  }, [frames, useAFront]);

  // autoplay con setTimeout encadenado (más suave/estable que setInterval)
  const tick = React.useCallback(() => {
    if (!mountedRef.current || !auto || !loaded || frames.length <= 1) return;
    const next = (indexRef.current + 1) % frames.length;
    goTo(next);
    timeoutRef.current = window.setTimeout(tick, Math.max(200, speed));
  }, [auto, loaded, frames.length, speed, goTo]);

  React.useEffect(() => {
    stop();
    if (auto && loaded && frames.length > 1) tick();
    return stop;
  }, [auto, loaded, frames.length, speed, tick, stop]);

  // navegación manual (no afecta el ritmo del autoplay)
  const next = () => goTo((indexRef.current + 1) % frames.length);
  const prev = () => goTo((indexRef.current - 1 + frames.length) % frames.length);

  // hover opcional
  const onMouseEnter = () => { if (pauseOnHover) stop(); };
  const onMouseLeave = () => { if (pauseOnHover) tick(); };

  if (!frames?.length) return null;

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ height }}
      role="img"
      aria-label={alt}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* capa A */}
      <img
        src={srcA}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain 
                    transition-opacity ease-linear`}
        style={{ opacity: useAFront ? 1 : 0, transitionDuration: `${fadeMs}ms` }}
        draggable={false}
        decoding="async"
        loading="eager"
      />
      {/* capa B */}
      <img
        src={srcB}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-contain 
                    transition-opacity ease-linear`}
        style={{ opacity: useAFront ? 0 : 1, transitionDuration: `${fadeMs}ms` }}
        draggable={false}
        decoding="async"
        loading="eager"
      />

      {/* Controles (no interfieren con el temporizador) */}
      {showControls && frames.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
          >
            <Icon icon="lucide:chevron-left" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 backdrop-blur-sm"
          >
            <Icon icon="lucide:chevron-right" />
          </button>
        </>
      )}
    </div>
  );
};
