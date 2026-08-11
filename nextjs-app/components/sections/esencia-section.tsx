"use client";

import Image from "next/image";
import { motion } from "motion/react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface BentoCard {
  id: string;
  title: string;
  label?: string;
  description?: string;
  image: string;
  span: string;
  stat?: string;
  statLabel?: string;
}

/* ─────────────────────────────────────────────
   Card data  — swap /placeholderN.jpg for real shots
───────────────────────────────────────────── */
const cards: BentoCard[] = [
  {
    id: "calidad",
    title: "Comida de Calidad",
    label: "Ingredientes",
    description:
      "Cada ingrediente es seleccionado a mano: harinas de molino, tomates San Marzano DOP y mozzarella de búfala campana. Sin atajos, sin compromiso.",
    image: "/Ingredientes.png",
    span: "md:col-span-2 md:row-span-2",
    stat: "100%",
    statLabel: "Ingredientes artesanales",
  },
  {
    id: "horno",
    title: "Horno de Leña",
    label: "480 °C",
    description: "Cocción en menos de 90 segundos. El fuego hace lo demás.",
    image: "/Horno.png",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "masa",
    title: "Masa Madre",
    label: "72 h de fermentación",
    description: "Lenta maduración para una pizza ligera, crujiente y llena de carácter.",
    image: "/Masa.png",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "pasion",
    title: "Pasión Italiana",
    label: "Tradición",
    description:
      "Recetas heredadas de la nonna. El alma de Nápoles en cada bocado, a orillas del Mediterráneo.",
    image: "/pizza.jpg",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    id: "cocteles",
    title: "Coctelería de Autor",
    label: "Bar & Lounge",
    description: "Combinados únicos con licores premium e ingredientes de temporada.",
    image: "/Cocteleria.png",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "servicio",
    title: "Servicio Excepcional",
    label: "Experiencia",
    description: "Un equipo apasionado que convierte cada visita en un recuerdo.",
    image: "/local1.jpg",
    span: "md:col-span-1 md:row-span-1",
  },
];

/* ─────────────────────────────────────────────
   Shared animation variants
───────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────
   BentoCardItem
───────────────────────────────────────────── */
function BentoCardItem({ card, index }: { card: BentoCard; index: number }) {
  const isHero = card.id === "calidad";

  return (
    <motion.article
      className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-[#111111] ${card.span}`}
      custom={index * 0.08}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      aria-label={card.title}
    >
      {/* Background image with zoom-on-hover */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-40 transition-transform duration-700 ease-out group-hover:scale-105"
          priority={isHero}
        />
        {/* Gradient overlay for text legibility */}
        <div
          className={`absolute inset-0 ${
            isHero
              ? "bg-gradient-to-t from-black/90 via-black/50 to-black/20"
              : "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
          }`}
        />
      </div>

      {/* Card content */}
      <div
        className={`relative z-10 flex h-full flex-col justify-end ${
          isHero ? "min-h-[420px] p-8 md:p-10" : "min-h-[200px] p-6"
        }`}
      >
        {/* Eyebrow label */}
        {card.label && (
          <span className="mb-2 block font-sans text-xs font-light uppercase tracking-[0.2em] text-accent-gold/80">
            {card.label}
          </span>
        )}

        {/* Big stat — hero only */}
        {card.stat && (
          <p className="mb-1 font-serif text-5xl leading-none tracking-tighter text-accent-gold lg:text-6xl">
            {card.stat}
          </p>
        )}
        {card.statLabel && (
          <p className="mb-4 font-sans text-xs font-light uppercase tracking-widest text-accent-gold/60">
            {card.statLabel}
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-serif leading-tight tracking-tight text-foreground normal-case ${
            isHero ? "text-3xl lg:text-4xl" : "text-xl"
          }`}
        >
          {card.title}
        </h3>

        {/* Description */}
        {card.description && (
          <p
            className={`mt-3 font-sans font-light leading-relaxed text-gray-400 ${
              isHero ? "max-w-xs text-sm md:text-base" : "line-clamp-2 text-sm"
            }`}
          >
            {card.description}
          </p>
        )}

        {/* Bottom border accent on hover */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent-gold/60 transition-all duration-500 ease-out group-hover:w-full" />
      </div>

      {/* Glass ring */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]" />
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
   EsenciaSection
───────────────────────────────────────────── */
export function EsenciaSection() {
  return (
    <section
      id="esencia"
      aria-label="Nuestra Esencia — Pilares de Grupo Diva"
      className="bg-background py-[100px] lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 lg:mb-20">

          {/* Eyebrow */}
          <motion.span
            className="block font-sans text-xs font-light uppercase tracking-[0.25em] text-accent-gold/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Lo que nos define
          </motion.span>

          {/* Massive heading with reveal clip */}
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-5xl leading-none tracking-tighter text-foreground lg:text-7xl"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Nuestra Esencia
            </motion.h2>
          </div>

          {/* Gold rule + intro copy */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <motion.div
              className="h-[1px] origin-left bg-accent-gold"
              style={{ width: "64px" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            />
            <motion.p
              className="max-w-[480px] font-sans text-sm font-light leading-relaxed text-gray-400 md:text-right"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            >
              Pasión, fuego y tradición en cada plato. Elaborado con los mejores
              ingredientes, desde el corazón de Nápoles hasta Benidorm.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {cards.map((card, i) => (
            <BentoCardItem key={card.id} card={card} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
