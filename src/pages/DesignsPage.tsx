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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { supabase } from "../lib/supabase";

type Sport = "futbol" | "voleibol" | "baloncesto" | "beisbol";

type DesignUI = {
  id: string;        // code
  name: string;      // title
  sport: Sport;
  price: number;     // price_usd
  img: string;       // public URL
  createdAt: number; // timestamp (ms)
};

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

const MXN_RATE = Number(import.meta.env.VITE_MXN_RATE ?? 17.5);

const fieldWrapper =
  "bg-content3 border-white/10 " +
  "data-[hover=true]:bg-content3 data-[hover=true]:border-white/20 " +
  "group-data-[focus=true]:bg-content3 group-data-[focus=true]:border-white/30 " +
  "group-data-[invalid=true]:border-danger/50";

const WA = {
  phone: "5219222107515",
  msg: (d: DesignUI) =>
    `Hola, me interesa el diseño ${d.name} (${d.id}) para ${d.sport}. ¿Podemos avanzar con la compra/cotización?`,
};

const DesignsPage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [sport, setSport] = React.useState<string>("");
  const [order, setOrder] = React.useState<Set<string>>(new Set(["recent"]));

  const [items, setItems] = React.useState<DesignUI[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Modal
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<DesignUI | null>(null);

  const orderValue = React.useMemo(
    () => Array.from(order)[0] ?? "recent",
    [order]
  );

  React.useEffect(() => {
    let ignore = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("designs")
        .select("code, title, sport, price_usd, thumb_path, created_at")
        .order("created_at", { ascending: false });

      if (ignore) return;

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const mapped: DesignUI[] =
        data?.map((row: any) => {
          const publicThumb = supabase.storage
            .from("thumbs")
            .getPublicUrl(row.thumb_path).data.publicUrl;

          return {
            id: row.code,
            name: row.title,
            sport: row.sport as Sport,
            price: Number(row.price_usd) || 0,
            img: publicThumb,
            createdAt: row.created_at ? new Date(row.created_at).getTime() : 0,
          };
        }) ?? [];

      setItems(mapped);
      setLoading(false);
    };

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = React.useMemo(() => {
    let arr = items.slice();

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
  }, [query, sport, orderValue, items]);

  const whatsappHref = (d: DesignUI) =>
    `https://wa.me/${WA.phone}?text=${encodeURIComponent(WA.msg(d))}`;

  const openDetails = (d: DesignUI) => {
    setSelected(d);
    setOpen(true);
  };

  const onBuy = (d: DesignUI) => {
    const extra = `\nQuiero COMPRAR este diseño por $${d.price.toFixed(2)} USD.`;
    window.open(
      `https://wa.me/${WA.phone}?text=${encodeURIComponent(WA.msg(d) + extra)}`,
      "_blank"
    );
  };

  return (
    <section className="pt-[calc(var(--nav-h,72px)+24px)] pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Tienda de <span className="text-primary">Diseños</span>
          </h1>
          <p className="text-foreground-500 mt-2">
            Selecciona un diseño, personalízalo y hazlo tuyo.
          </p>
        </div>

        {/* Filtros — optimizado para móvil (sticky, compacto) */}
        <div className="mb-6">
          <div className="rounded-xl border border-white/10 bg-content1/60 backdrop-blur p-3 md:p-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-12">
              {/* Buscador */}
              <div className="col-span-2 md:col-span-8">
                <Input
                  size="sm"
                  isClearable
                  aria-label="Buscar diseños"
                  value={query}
                  onValueChange={setQuery}
                  label="Buscar"
                  labelPlacement="outside"
                  placeholder="Nombre, ID o deporte…"
                  startContent={<Icon icon="lucide:search" />}
                  classNames={{
                    label: "text-xs text-white/80",
                    inputWrapper: fieldWrapper + " h-11",
                    input: "text-sm text-white placeholder:text-white/50",
                  }}
                />
              </div>

              {/* Deporte */}
              <div className="col-span-1 md:col-span-2">
                <Select
                  size="sm"
                  selectedKeys={sport ? [sport] : []}
                  onSelectionChange={(keys) =>
                    setSport(Array.from(keys)[0] as string)
                  }
                  className="w-full"
                  label="Deporte"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-xs text-white/80",
                    value: "text-sm text-white",
                    trigger: fieldWrapper + " h-11",
                  }}
                >
                  {SPORTS.map((s) => (
                    <SelectItem key={s.value} textValue={s.label}>
                      {s.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Ordenar */}
              <div className="col-span-1 md:col-span-2">
                <Select
                  size="sm"
                  selectedKeys={order}
                  onSelectionChange={(keys) =>
                    setOrder(keys as Set<string>)
                  }
                  className="w-full"
                  label="Ordenar"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-xs text-white/80",
                    value: "text-sm text-white",
                    trigger: fieldWrapper + " h-11",
                  }}
                >
                  {ORDER.map((o) => (
                    <SelectItem key={o.value} textValue={o.label}>
                      {o.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>

        {loading && <div className="text-foreground-500">Cargando diseños…</div>}
        {error && <div className="text-danger">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {filtered.map((d) => (
                <Card
                  key={d.id}
                  className="bg-content1/90 border border-white/10 h-full"
                >
                  <CardBody className="p-0">
                    <div className="relative aspect-[3/4] overflow-hidden bg-content2">
                      <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-contain"
                        draggable={false}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://placehold.co/640x820?text=Sin+imagen";
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-white font-semibold truncate">
                          {d.name}
                        </h3>
                        <Chip
                          size="sm"
                          className="bg-white/5 text-white/80 border-white/10"
                        >
                          {d.id}
                        </Chip>
                      </div>

                      <div className="mt-2 flex items-center gap-2">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-primary/15 text-primary"
                          startContent={<Icon icon="lucide:shirt" />}
                        >
                          {SPORTS.find((s) => s.value === d.sport)?.label ??
                            d.sport}
                        </Chip>

                        {/* Precio USD + estimado MXN */}
                        <div className="ml-auto text-right leading-tight">
                          <div className="text-white font-bold">
                            ${d.price.toFixed(2)} USD
                          </div>
                          <div className="text-foreground-500 text-xs">
                            ≈ $
                            {Math.round(d.price * MXN_RATE).toLocaleString(
                              "es-MX"
                            )}{" "}
                            MXN
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button
                          as="a"
                          href={whatsappHref(d)}
                          target="_blank"
                          rel="noopener"
                          size="sm"
                          color="primary"
                          radius="lg"
                          className="h-9 px-3 font-medium shadow-sm"
                          startContent={
                            <Icon icon="lucide:whatsapp" className="h-4 w-4" />
                          }
                        >
                          WhatsApp
                        </Button>

                        <Button
                          size="sm"
                          variant="bordered"
                          radius="lg"
                          className="h-9 px-3 text-white/90 border-white/15"
                          startContent={
                            <Icon icon="lucide:info" className="h-4 w-4" />
                          }
                          onPress={() => openDetails(d)}
                        >
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
          </>
        )}
      </div>

      <Modal
      isOpen={open}
      onOpenChange={setOpen}
      placement="center"
      backdrop="blur"
      classNames={{
        // pegadito arriba y centrado
        wrapper:
          "fixed inset-0 grid items-start justify-center px-4 sm:px-10 pt-2 pb-3",
      
        // tamaño del modal (igual que antes) y SIN tocar el scroll aquí
        base:
          "bg-content1 w-[min(96vw,1100px)] h-[min(92vh,1000px)] " +
          "rounded-2xl border border-white/10 shadow-2xl overflow-hidden",
      
        header: "px-4 sm:px-8 py-4 border-b border-white/10",
      
        // ⇩ el scroll va en el body
        body: "px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto scroll-smooth",
      
        // footer fijo (opcional pero útil en móvil)
        footer:
          "px-4 sm:px-8 py-4 border-t border-white/10 " +
          "sticky bottom-0 bg-content1/80 backdrop-blur " +
          "supports-[backdrop-filter]:bg-content1/60",
      }}
    >
      <ModalContent>
        {(close) => (
          <>
            {/* Header */}
            <ModalHeader className="flex items-center gap-3">
              <Icon icon="lucide:layers" className="text-primary" />
              {selected?.name}
              {selected && (
                <Chip
                  size="sm"
                  className="ml-auto bg-white/5 text-white/80 border-white/10"
                >
                  {selected.id}
                </Chip>
              )}
            </ModalHeader>
            
            {/* Body: DESCRIPCIÓN (arriba) – IMAGEN (abajo en móvil) */}
            <ModalBody>
              {selected && (
                <div className="grid grid-cols-12 gap-6 xl:h-full">
                  {/* IZQUIERDA: Detalles (sin h-full en móvil) */}
                  <div className="col-span-12 xl:col-span-8 flex flex-col xl:h-full min-h-0">
                    <div className="flex items-center justify-between mb-5">
                      <Chip
                        size="sm"
                        variant="flat"
                        className="bg-primary/15 text-primary"
                        startContent={<Icon icon="lucide:shirt" />}
                      >
                        {SPORTS.find((s) => s.value === selected.sport)?.label ??
                          selected.sport}
                      </Chip>
                        
                      <div className="rounded-lg border border-white/10 bg-white/5 px-4 py-2">
                        <div className="text-white text-2xl font-bold">
                          ${selected.price.toFixed(2)} USD
                        </div>
                        <div className="text-foreground-500 text-xs">
                          ≈ ${Math.round(selected.price * MXN_RATE)} MXN
                        </div>
                      </div>
                    </div>
                        
                    <div className="grid grid-cols-2 gap-5 text-sm">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 rounded-md bg-primary/15 p-1.5">
                          <Icon icon="lucide:package" className="text-primary h-4 w-4" />
                        </div>
                        <div className="leading-relaxed">
                          <p className="font-medium text-white/90">Entrega</p>
                          <p className="text-foreground-500">
                            Recibirás un archivo <b>.zip</b> con los recursos del diseño.
                          </p>
                        </div>
                      </div>
                        
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 rounded-md bg-primary/15 p-1.5">
                          <Icon icon="lucide:files" className="text-primary h-4 w-4" />
                        </div>
                        <div className="leading-relaxed">
                          <p className="font-medium text-white/90">Contenido</p>
                          <p className="text-foreground-500">
                            Archivos en <b>Adobe Illustrator (.ai)</b> y <b>PDF vectorial</b>.
                          </p>
                        </div>
                      </div>
                        
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 rounded-md bg-primary/15 p-1.5">
                          <Icon
                            icon="lucide:monitor-smartphone"
                            className="text-primary h-4 w-4"
                          />
                        </div>
                        <div className="leading-relaxed">
                          <p className="font-medium text-white/90">Compatibilidad</p>
                          <p className="text-foreground-500">
                            El PDF puede abrirse sin problema en <b>CorelDRAW</b>.
                          </p>
                        </div>
                      </div>
                        
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 rounded-md bg-primary/15 p-1.5">
                          <Icon icon="lucide:zap" className="text-primary h-4 w-4" />
                        </div>
                        <div className="leading-relaxed">
                          <p className="font-medium text-white/90">Uso inmediato</p>
                          <p className="text-foreground-500">
                            Compras el diseño tal cual se muestra. Tras el pago podrás descargar
                            el <b>.zip</b> y usar los archivos en impresión o edición por tu cuenta
                            (sin personalización).
                          </p>
                        </div>
                      </div>
                        
                      <div className="flex items-start gap-3">
                        <div className="mt-1 shrink-0 rounded-md bg-primary/15 p-1.5">
                          <Icon icon="lucide:shield-check" className="text-primary h-4 w-4" />
                        </div>
                        <div className="leading-relaxed">
                          <p className="font-medium text-white/90">Licencia estándar</p>
                          <p className="text-foreground-500">Uso para <b>1 equipo</b>.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                        
                  {/* DERECHA/ABAJO: Imagen (altura controlada en móvil) */}
                  <div className="col-span-12 xl:col-span-4 rounded-xl overflow-hidden bg-content2 flex items-center justify-center p-3 min-h-[260px] max-h-[65vh] xl:h-auto">
                    <img
                      src={selected.img}
                      alt={selected.name}
                      loading="lazy"
                      className="w-full h-auto max-h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "https://placehold.co/700x900?text=Sin+imagen";
                      }}
                    />
                  </div>
                </div>
              )}
            </ModalBody>
            
            {/* Footer (fijo) */}
            <ModalFooter className="justify-between">
              <Button
                variant="flat"
                className="text-white"
                startContent={<Icon icon="lucide:whatsapp" />}
                as="a"
                href={selected ? whatsappHref(selected) : "#"}
                target="_blank"
                rel="noopener"
              >
                WhatsApp
              </Button>
            
              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  onPress={close}
                  className="text-white/90 border-white/15"
                >
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={() => selected && onBuy(selected)}
                  startContent={<Icon icon="lucide:shopping-cart" />}
                >
                  Comprar
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

        </section>
      );
    };
    
export default DesignsPage;
