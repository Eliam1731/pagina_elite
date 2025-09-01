export type Design = {
  id: string;            // slug único
  title: string;
  sport: "futbol" | "voleibol" | "basquetbol" | "beisbol" | "otro";
  price: number;         // MXN
  tags: string[];
  img: string;           // /img/designs/archivo.webp (colócalas en /public/img/designs)
  paymentUrl: string;    // Payment Link de Stripe
  createdAt: string;     // para ordenar por “Nuevo”
};

export const DESIGNS: Design[] = [
  {
    id: "elite-fut-001",
    title: "Élite Futbol – Blanco/Negro",
    sport: "futbol",
    price: 399,
    tags: ["minimal", "alto contraste"],
    img: "/img/designs/futbol_1.webp",
    paymentUrl: "https://buy.stripe.com/test_xxxxxxx", // TODO: tu link
    createdAt: "2025-08-30",
  },
  {
    id: "elite-vole-001",
    title: "Élite Voleibol – Dark",
    sport: "voleibol",
    price: 399,
    tags: ["oscuro", "moderno"],
    img: "/img/designs/volei_1.webp",
    paymentUrl: "https://buy.stripe.com/test_xxxxxxx",
    createdAt: "2025-08-29",
  },
  {
    id: "elite-bas-001",
    title: "Élite Basket – Clean",
    sport: "basquetbol",
    price: 399,
    tags: ["limpio", "premium"],
    img: "/img/designs/bas_1.webp",
    paymentUrl: "https://buy.stripe.com/test_xxxxxxx",
    createdAt: "2025-08-28",
  },
  {
    id: "elite-beis-001",
    title: "Élite Beisbol – Classic",
    sport: "beisbol",
    price: 399,
    tags: ["clásico", "tipografía fuerte"],
    img: "/img/designs/beis_1.webp",
    paymentUrl: "https://buy.stripe.com/test_xxxxxxx",
    createdAt: "2025-08-27",
  },
  // 👉 Duplica este bloque hasta completar tus 30 diseños
];
