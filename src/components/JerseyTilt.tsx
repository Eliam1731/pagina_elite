import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
  src: string;
  alt?: string;
  height?: number;
  className?: string;
};

export const JerseyTilt: React.FC<Props> = ({ src, alt = "Jersey", height = 520, className = "" }) => {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useTransform(my, [0, 1], [12, -12]);
  const rotateY = useTransform(mx, [0, 1], [-16, 16]);
  const [cx, setCx] = React.useState(50);
  const [cy, setCy] = React.useState(50);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x); my.set(y);
    setCx(x * 100); setCy(y * 100);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); setCx(50); setCy(50); };

  return (
    <div className={`relative select-none [perspective:1000px] ${className}`} style={{ height }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="w-full h-full flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,.35)] [transform:translateZ(40px)]"
          draggable={false}
          loading="eager"
        />
        {/* brillo que sigue al mouse */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(600px at ${cx}% ${cy}%, rgba(59,130,246,.22), transparent 60%)`,
            transform: "translateZ(60px)",
          }}
        />
      </motion.div>
    </div>
  );
};
