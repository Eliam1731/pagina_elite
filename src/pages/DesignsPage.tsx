// src/pages/DesignsPage.tsx
import React from "react";
import {
  Input,
  Select,
  SelectItem,
  Card,
  CardBody,
  Button,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";

type Design = {
  id: string;
  name: string;
  sport: "futbol" | "voleibol" | "baloncesto" | "beisbol";
  price: number;
  img: string;
  createdAt: number;
};

const DESIGNS: Design[] = [
  { id: "FUT-001", name: "Elite Rayas", sport: "futbol", price: 399, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=fut1", createdAt: 20250128 },
  { id: "VOL-002", name: "Nebula", sport: "voleibol", price: 399, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=vol1", createdAt: 20250127 },
  { id: "BAS-003", name: "Metro", sport: "baloncesto", price: 449, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=bas1", createdAt: 20250126 },
  { id: "BEI-004", name: "Classic", sport: "beisbol", price: 449, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=bei1", createdAt: 20250125 },
  { id: "FUT-005", name: "Vector", sport: "futbol", price: 399, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=fut2", createdAt: 20250124 },
  { id: "VOL-006", name: "Gradient", sport: "voleibol", price: 399, img: "https://img.heroui.chat/image/sports?w=640&h=820&u=vol2", createdAt: 20250123 },
];

const SPORTS = [
  { value: "", label: "Todos" },
  { value: "futbol", label: "Fútbol" },
  { value: "voleibol", label: "Voleibol" },
  { value: "baloncesto", label: "Baloncesto" },
  { value: "beisbol", label: "Béisbol" },
] as const;

const ORDER = [
  { value: "recent", label: "Más recientes" },
  { value: "priceAsc", label: "Precio: menor a mayor" },
  { value: "priceDesc", label: "Precio: mayor a menor" },
] as const;

const WA = {
  phone: "5219222107515",
  msg: (d: Design) =>
    `Hola, me interesa el diseño ${d.name} (${d.id}) para ${d.sport}. ¿Podemos avanzar con la compra/cotización?`,
};

const DesignsPage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [sport, setSport] = React.useState<string>("");
  const [order, setOrder] = React.useState<Set<string>>(new Set(["recent"]));

  const orderValue = React.useMemo(() => Array.from(order)[0] ?? "recent", [order]);

  const filtered = React.useMemo(() => {
    let arr = DESIGNS.slice();
    if (sport) arr = arr.filter((d) => d.sport === sport);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      arr = arr.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q) ||
          d.sport.toLowerCase().includes(q)
      );
    }
    if (orderValue === "recent") arr.sort((a, b) => b.createdAt - a.createdAt);
    if (orderValue === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (orderValue === "priceDesc") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [query, sport, orderValue]);

  const whatsappHref = (d: Design) =>
    `https://wa.me/${WA.phone}?text=${encodeURIComponent(WA.msg(d))}`;

  return (
    <section className="pt-[calc(var(--nav-h,72px)+24px)] pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Tienda de <span className="text-primary">Diseños</span>
          </h1>
          <p className="text-foreground-500 mt-2">
            Selecciona un diseño listo para personalizar con tu logo, colores y numeración.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:items-end mb-6">
          <div className="flex-1">
            <Input
              value={query}
              onValueChange={setQuery}
              label="Buscar"
              placeholder="Nombre, ID o deporte…"
              startContent={<Icon icon="lucide:search" />}
              classNames={{
                label: "text-white/80",
                inputWrapper: "bg-content3 border-white/10",
                input: "text-white placeholder:text-white/50",
              }}
            />
          </div>

          <Select
            selectedKeys={sport ? [sport] : []}
            onSelectionChange={(keys) => setSport(Array.from(keys)[0] as string)}
            className="w-44"
            label="Deporte"
            classNames={{ label: "text-white/80", value: "text-white", trigger: "bg-content3 border-white/10" }}
          >
            {SPORTS.map((s) => (
              <SelectItem key={s.value} textValue={s.label}>
                {s.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            selectedKeys={order}
            onSelectionChange={(keys) => setOrder(keys as Set<string>)}
            className="w-56"
            label="Ordenar"
            classNames={{ label: "text-white/80", value: "text-white", trigger: "bg-content3 border-white/10" }}
          >
            {ORDER.map((o) => (
              <SelectItem key={o.value} textValue={o.label}>
                {o.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <Chip className="bg-primary/10 text-primary border border-primary/20 mb-6" startContent={<Icon icon="lucide:download" />}>
          Descarga digital • Licencia estándar (1 equipo)
        </Chip>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((d) => (
            <Card key={d.id} className="bg-content1/90 border border-white/10 h-full">
              <CardBody className="p-0">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={d.img} alt={d.name} className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-white font-semibold truncate">{d.name}</h3>
                    <Chip size="sm" className="bg-white/5 text-white/80 border-white/10">
                      {d.id}
                    </Chip>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Chip size="sm" variant="flat" className="bg-primary/15 text-primary" startContent={<Icon icon="lucide:shirt" />}>
                      {SPORTS.find((s) => s.value === d.sport)?.label ?? d.sport}
                    </Chip>
                    <span className="ml-auto text-white font-bold">${d.price} MXN</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button
                      as="a"
                      href={whatsappHref(d)}
                      target="_blank"
                      rel="noopener"
                      color="primary"
                      startContent={<Icon icon="lucide:whatsapp" />}
                    >
                      WhatsApp
                    </Button>
                    <Button variant="flat" className="text-white">
                      Detalles
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-foreground-500 mt-12">
            No encontramos diseños con esos filtros.
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignsPage;
