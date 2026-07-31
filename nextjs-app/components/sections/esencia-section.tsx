"use client";

import { motion, type Variants } from "motion/react";
import { TraditionWheel } from "@/components/sections/tradition-wheel";

const pilares = [
  {
    title: "Comida de calidad",
    description: "Recetas originales con ingredientes seleccionados uno a uno.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5s-5 2.24-5 5Z" />
        <path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5s-5 2.24-5 5Z" />
        <path d="M7 14c3.22-2.91 4.29-8.75 5.72-12.74" />
        <path d="M17 14c0-5.34-.93-8.85-4-11.66" />
        <path d="M22 9c-4.29 0-7.14-2.33-10-7" />
      </svg>
    ),
  },
  {
    title: "Pasión italiana",
    description: "Cada plato cuenta una historia de tradición y amor por la cocina.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    title: "Servicio excepcional",
    description: "Una experiencia que va más allá del plato, pensada para ti.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8" />
        <path d="M7 10h10" />
        <path d="M12 15v7" />
        <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
      </svg>
    ),
  },
];

const pilarVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.18, ease: "easeOut" },
  }),
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.18, ease: "backOut" },
  }),
};

export function EsenciaSection() {
  return (
    <section
      className="bg-background py-[100px] lg:py-[140px]"
      id="esencia"
      aria-label="Conócenos y Nuestra Esencia"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-15 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Columna izquierda — Conócenos */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="overflow-hidden text-[clamp(2rem,4vw,3rem)] leading-tight tracking-wide text-center md:text-left">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                Conócenos
              </motion.span>
            </h2>
            <motion.hr
              className="mx-auto mt-6 h-0.5 max-w-12 border-none bg-accent-gold md:mx-0"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </div>

          <div className="flex flex-col gap-8">
            {pilares.map((pilar, i) => (
              <motion.div
                key={pilar.title}
                className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left"
                custom={i}
                variants={pilarVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <motion.div
                  custom={i}
                  variants={iconVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-accent-gold/50"
                >
                  <span className="h-9 w-9 text-accent-gold [&>svg]:h-full [&>svg]:w-full">
                    {pilar.icon}
                  </span>
                </motion.div>
                <div>
                  <h3 className="mb-1.5 font-serif text-lg tracking-wide text-foreground normal-case">
                    {pilar.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed font-light text-muted-foreground">
                    {pilar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6 pt-4">
            <svg
              className="h-px w-full max-w-[420px] text-accent-gold/60"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 50 Q 500 50, 1000 50" stroke="currentColor" strokeWidth={2} fill="none" />
            </svg>
            <motion.p
              className="max-w-[800px] border-t border-accent-red/30 py-8 text-center font-serif text-xl leading-relaxed text-muted-foreground italic normal-case"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
              Sumérgete en la auténtica experiencia italiana. Te esperamos con los sabores más
              genuinos, un ambiente cálido y un servicio excepcional. Ven y déjate sorprender.
            </motion.p>
          </div>
        </div>

        {/* Columna derecha — Nuestra Esencia (rueda) */}
        <div className="flex flex-col gap-8" id="tradicion">
          <div>
            <h2 className="text-center text-[clamp(2rem,4vw,3rem)] leading-tight tracking-wide md:text-left">
              Nuestra Esencia
            </h2>
            <hr className="mx-auto mt-6 h-0.5 w-12 border-none bg-accent-gold md:mx-0" />
          </div>

          <div className="flex w-full justify-center">
            <TraditionWheel />
          </div>
        </div>
      </div>
    </section>
  );
}
