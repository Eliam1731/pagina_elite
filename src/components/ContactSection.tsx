// src/components/ContactSection.tsx
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

  const handleChange = (key: string, value: string) =>
    setFormState((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    alert("¡Gracias! Te contactaremos pronto con tu cotización.");
  };

  const sportOptions = [
    { value: "futbol", label: "Fútbol" },
    { value: "baloncesto", label: "Baloncesto" },
    { value: "voleibol", label: "Voleibol" },
    { value: "rugby", label: "Rugby" },
    { value: "beisbol", label: "Béisbol" },
    { value: "otro", label: "Otro" },
  ];

  const baseInput = {
    variant: "bordered" as const,
    classNames: {
      label: "text-white/80",
      inputWrapper: "bg-content3 border-white/10 hover:border-white/20",
      input: "text-white placeholder:text-white/50",
    },
  };

  const contactInfo = [
    {
      icon: "lucide:map-pin",
      title: "Dirección",
      content: "Av. Deportiva #123, Col. Centro, Ciudad de México",
    },
    { icon: "lucide:phone", title: "Teléfono", content: "+52 55 1234 5678" },
    { icon: "lucide:mail", title: "Email", content: "info@elitedesigns.com" },
    { icon: "lucide:clock", title: "Horario", content: "Lunes a Viernes: 9:00 - 18:00" },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="section-fade-in">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Solicita tu <span className="text-primary">Cotización</span>
            </h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Completa el formulario y nuestro equipo te contactará con una
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
                        placeholder="Ingresa tu nombre"
                        value={formState.name}
                        onValueChange={(v) => handleChange("name", v)}
                        isRequired
                        startContent={
                          <Icon
                            icon="lucide:user"
                            className="text-default-400 text-sm"
                          />
                        }
                      />
                      <Input
                        {...baseInput}
                        label="Correo electrónico"
                        placeholder="correo@ejemplo.com"
                        value={formState.email}
                        onValueChange={(v) => handleChange("email", v)}
                        isRequired
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
                        placeholder="Tu número de contacto"
                        value={formState.phone}
                        onValueChange={(v) => handleChange("phone", v)}
                        startContent={
                          <Icon
                            icon="lucide:phone"
                            className="text-default-400 text-sm"
                          />
                        }
                      />
                      <Input
                        {...baseInput}
                        label="Nombre del equipo"
                        placeholder="Nombre de tu equipo o club"
                        value={formState.team}
                        onValueChange={(v) => handleChange("team", v)}
                        startContent={
                          <Icon
                            icon="lucide:users"
                            className="text-default-400 text-sm"
                          />
                        }
                      />

                      {/* Select corregido (HeroUI v2) */}
                      <Select
                        label="Deporte"
                        selectedKeys={
                          formState.sport
                            ? new Set([formState.sport])
                            : new Set()
                        }
                        onSelectionChange={(keys) => {
                          const sel = Array.from(keys as Set<string>)[0] ?? "";
                          handleChange("sport", sel);
                        }}
                        isRequired
                        classNames={{
                          label: "text-white/80",
                          trigger:
                            "bg-content3 border border-white/10 text-white",
                          value: "text-white",
                          listboxWrapper: "bg-content1",
                        }}
                        startContent={
                          <Icon
                            icon="lucide:trophy"
                            className="text-default-400 text-sm"
                          />
                        }
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
                        placeholder="Número de uniformes"
                        value={formState.quantity}
                        onValueChange={(v) => handleChange("quantity", v)}
                        isRequired
                        type="number"
                        min="10"
                        startContent={
                          <Icon
                            icon="lucide:shirt"
                            className="text-default-400 text-sm"
                          />
                        }
                      />
                      <Input
                        {...baseInput}
                        label="Fecha requerida"
                        placeholder="¿Cuándo los necesitas?"
                        value={formState.date}
                        onValueChange={(v) => handleChange("date", v)}
                        type="date"
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
                          placeholder="Cuéntanos colores, logos, cantidades, etc."
                          value={formState.message}
                          onValueChange={(v) => handleChange("message", v)}
                          minRows={4}
                          classNames={{
                            label: "text-white/80",
                            inputWrapper:
                              "bg-content3 border-white/10 hover:border-white/20",
                            input:
                              "text-white placeholder:text-white/50",
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        className="glow-primary"
                        startContent={<Icon icon="lucide:send" />}
                      >
                        Solicitar cotización
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>

            {/* Info de contacto */}
            <div>
              <Card className="bg-content2 border border-white/10 h-full">
                <CardBody className="p-6 md:p-8">
                  <h3 className="text-white text-xl font-semibold mb-6">
                    Información de contacto
                  </h3>

                  <div className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className="flex gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                          <Icon icon={item.icon} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">
                            {item.title}
                          </h4>
                          <p className="text-foreground-500 text-sm">
                            {item.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-white text-lg font-semibold mb-4">
                      Síguenos
                    </h3>
                    <div className="flex gap-3">
                      {[
                        { icon: "lucide:facebook", color: "bg-blue-600" },
                        { icon: "lucide:instagram", color: "bg-pink-500" },
                        { icon: "lucide:twitter", color: "bg-sky-500" },
                        { icon: "lucide:youtube", color: "bg-red-600" },
                      ].map((social, index) => (
                        <Button
                          key={index}
                          isIconOnly
                          variant="flat"
                          className={`${social.color} text-white`}
                          size="sm"
                        >
                          <Icon icon={social.icon} />
                        </Button>
                      ))}
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
