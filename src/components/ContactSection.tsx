import React from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    phone: "",
    team: "",
    sport: "",
    quantity: "",
    date: "",
    message: "",
  });

  const handleChange = (k: string, v: string) =>
    setFormState((p) => ({ ...p, [k]: v }));

  // === WhatsApp submit ===
  const WHATSAPP_NUMBER = "529222107515"; // +52 922 210 7515
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, team, sport, quantity, date, message } =
      formState;

    // formatear fecha a dd/mm/yyyy para el mensaje
    const prettyDate = (() => {
      if (!date) return "-";
      const [yyyy, mm, dd] = date.split("-");
      return `${dd}/${mm}/${yyyy}`;
    })();

    const text =
      `¡Hola! Quiero cotizar uniformes.\n\n` +
      `Nombre: ${name || "-"}\n` +
      `Correo: ${email || "-"}\n` +
      `Teléfono: ${phone || "-"}\n` +
      `Equipo/Club: ${team || "-"}\n` +
      `Deporte: ${sport || "-"}\n` +
      `Cantidad: ${quantity || "-"}\n` +
      `Fecha requerida: ${prettyDate}\n` +
      `Detalles: ${message || "-"}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    window.open(url, "_blank");
  };

  const sportOptions = [
    { value: "futbol", label: "Fútbol" },
    { value: "baloncesto", label: "Baloncesto" },
    { value: "voleibol", label: "Voleibol" },
    { value: "beisbol", label: "Béisbol" },
    // { value: "rugby", label: "Rugby" }, // eliminado como pediste
    { value: "otro", label: "Otro" },
  ];

  // === Mantener oscuro en hover/focus (Inputs y Select) ===
  const wrapperDark =
    "bg-content3 border-white/10 " +
    "data-[hover=true]:bg-content3 data-[hover=true]:border-white/20 " +
    "data-[focus=true]:bg-content3 data-[focus=true]:border-white/30 " +
    "group-data-[focus=true]:bg-content3";

  const baseInput = {
    variant: "bordered" as const,
    classNames: {
      label: "text-white/80",
      inputWrapper: wrapperDark,
      input: "text-white placeholder:text-white/50",
    },
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Solicita tu <span className="text-primary">Cotización</span>
            </h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Completa el formulario y te contactamos por WhatsApp con una
              propuesta personalizada.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <Card className="bg-content1 border border-white/10">
                <CardBody className="p-6 md:p-8">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        {...baseInput}
                        label="Nombre completo"
                        value={formState.name}
                        onValueChange={(v) => handleChange("name", v)}
                        startContent={
                          <Icon
                            icon="lucide:user"
                            className="text-default-400 text-sm"
                          />
                        }
                        isRequired
                      />
                      <Input
                        {...baseInput}
                        type="email"
                        label="Correo electrónico"
                        value={formState.email}
                        onValueChange={(v) => handleChange("email", v)}
                        startContent={
                          <Icon
                            icon="lucide:mail"
                            className="text-default-400 text-sm"
                          />
                        }
                      />
                      <Input
                        {...baseInput}
                        label="Teléfono"
                        value={formState.phone}
                        onValueChange={(v) => handleChange("phone", v)}
                        startContent={
                          <Icon
                            icon="lucide:phone"
                            className="text-default-400 text-sm"
                          />
                        }
                        isRequired
                      />
                      <Input
                        {...baseInput}
                        label="Nombre del equipo"
                        value={formState.team}
                        onValueChange={(v) => handleChange("team", v)}
                        startContent={
                          <Icon
                            icon="lucide:users"
                            className="text-default-400 text-sm"
                          />
                        }
                      />

                      <Select
                        label="Deporte"
                        selectedKeys={formState.sport ? new Set([formState.sport]) : new Set()}
                          onSelectionChange={(keys) => {
                            const key = Array.from(keys as Set<string>)[0] ?? "";
                          handleChange("sport", key);
                          }}
                          classNames={{
                            label: "text-white/80",
                            trigger: "text-white border " + wrapperDark,
                            value: "text-white",
                            popoverContent: "bg-content1",
                            listbox: "bg-content1",
                          }}
                          startContent={<Icon icon="lucide:trophy" className="text-default-400 text-sm" />}
                          isRequired
>                        
                          {sportOptions.map((o) => (
                            <SelectItem key={o.value} textValue={o.label}>
                              {o.label}
                            </SelectItem>
                          ))}
                    </Select>

                      <Input
                        {...baseInput}
                        label="Cantidad de uniformes"
                        type="number"
                        min="10"
                        value={formState.quantity}
                        onValueChange={(v) => handleChange("quantity", v)}
                        startContent={
                          <Icon
                            icon="lucide:shirt"
                            className="text-default-400 text-sm"
                          />
                        }
                        isRequired
                      />
                      <Input
                        {...baseInput}
                        label="Fecha requerida"
                        type="date"
                        value={formState.date}
                        onValueChange={(v) => handleChange("date", v)}
                        startContent={
                          <Icon
                            icon="lucide:calendar"
                            className="text-default-400 text-sm"
                          />
                        }
                      />

                      <div className="md:col-span-2">
                        <Textarea
                          label="Detalles adicionales"
                          minRows={4}
                          value={formState.message}
                          onValueChange={(v) => handleChange("message", v)}
                          classNames={{
                            label: "text-white/80",
                            inputWrapper: wrapperDark,
                            input: "text-white placeholder:text-white/50",
                          }}
                          placeholder="Cuéntanos colores, logos, cantidades, tallas, etc."
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        startContent={<Icon icon="lucide:send" />}
                        className="font-semibold"
                      >
                        Solicitar cotización (WhatsApp)
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>

            {/* Información lateral */}
            <div>
              <Card className="bg-content2 border border-white/10 h-full">
                <CardBody className="p-6 md:p-8">
                  <h3 className="text-white text-xl font-semibold mb-6">
                    Información de contacto
                  </h3>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:map-pin" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Dirección</h4>
                        <p className="text-foreground-500 text-sm">
                          Minatitlán, Ver. (Col. Centro)
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:phone" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Teléfono</h4>
                        <a
                          href="https://wa.me/529222107515"
                          target="_blank"
                          rel="noopener"
                          className="text-foreground-500 text-sm hover:text-primary"
                        >
                          +52 922 210 7515 (WhatsApp)
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:mail" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Email</h4>
                        <a
                          href="mailto:elite.designs.mx2@gmail.com"
                          className="text-foreground-500 text-sm hover:text-primary break-all"
                        >
                          elite.designs.mx2@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="flex gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Icon icon="lucide:clock" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Horario</h4>
                        <p className="text-foreground-500 text-sm">
                          Lunes a Viernes: 9:00 - 18:00
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Redes sociales */}
                  <div className="mt-8">
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Síguenos
                    </h3>
                    <div className="flex gap-3">
                      <Button
                        as="a"
                        href="https://www.instagram.com/_DESIGNS_ELITE_/"
                        target="_blank"
                        rel="noopener"
                        isIconOnly
                        variant="flat"
                        className="bg-pink-500 text-white"
                        size="sm"
                        aria-label="Instagram"
                      >
                        <Icon icon="lucide:instagram" />
                      </Button>
                      <Button
                        as="a"
                        href="https://www.facebook.com/people/Elite-Designs/61561488215914/?mibextid=LQQJ4d"
                        target="_blank"
                        rel="noopener"
                        isIconOnly
                        variant="flat"
                        className="bg-blue-600 text-white"
                        size="sm"
                        aria-label="Facebook"
                      >
                        <Icon icon="lucide:facebook" />
                      </Button>

                      {/*
                      // Cuando tengas el enlace real, descomenta este bloque:
                      <Button
                        as="a"
                        href="https://www.youtube.com/tu-canal"
                        target="_blank"
                        rel="noopener"
                        isIconOnly
                        variant="flat"
                        className="bg-red-600 text-white"
                        size="sm"
                        aria-label="YouTube"
                      >
                        <Icon icon="lucide:youtube" />
                      </Button>
                      */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
