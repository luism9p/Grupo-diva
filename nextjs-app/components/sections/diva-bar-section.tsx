"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/* ─────────────────────────────────────────────
   Animated underline CTA
───────────────────────────────────────────── */
function EditorialCTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-4 py-1 font-sans text-xs font-light uppercase tracking-[0.22em] text-accent-gold"
    >
      {/* Animated background fill on hover */}
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 translate-x-0 text-lg transition-transform duration-500 ease-out group-hover:translate-x-2">
        →
      </span>
      {/* Underline that expands to full width */}
      <span className="absolute bottom-0 left-0 h-[1px] w-full origin-left scale-x-100 bg-accent-gold/30 transition-none" />
      <span className="absolute bottom-0 left-0 h-[1px] w-0 origin-left bg-accent-gold transition-all duration-500 ease-out group-hover:w-full" />
    </a>
  );
}

/* ─────────────────────────────────────────────
   Stat chip
───────────────────────────────────────────── */
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-serif text-2xl leading-none tracking-tight text-accent-gold">
        {value}
      </span>
      <span className="font-sans text-[10px] font-light uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DivaBarSection
───────────────────────────────────────────── */
export function DivaBarSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: image moves up slower than page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      id="diva-bar"
      aria-label="Diva Bar — Coctelería de Autor"
      className="relative overflow-hidden bg-[#090909] py-[100px] lg:py-[160px]"
    >
      {/* ── Watermark "MIXOLOGY" behind everything ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
      >
        <span
          className="font-serif text-[clamp(6rem,22vw,20rem)] font-bold leading-none tracking-tighter"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          }}
        >
          MIXOLOGY
        </span>
      </div>

      {/* ── Main layout ── */}
      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10">

        {/* ── DESKTOP: Overlap editorial ── */}
        <div className="hidden lg:block">
          <div className="relative grid grid-cols-[1fr_520px] items-end gap-0 xl:grid-cols-[1fr_600px]">

            {/* LEFT — text block, overlaps photo via negative right margin + z */}
            <div className="relative z-20 pb-16 pr-0">

              {/* Eyebrow */}
              <motion.span
                className="mb-8 block font-sans text-xs font-light uppercase tracking-[0.3em] text-accent-gold/70"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                Coctelería de Autor
              </motion.span>

              {/* Title — split typographic treatment */}
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
                >
                  {/* "DIVA" — large serif */}
                  <h2 className="font-serif leading-none tracking-tighter text-foreground"
                    style={{ fontSize: "clamp(4.5rem, 10vw, 9rem)" }}>
                    Diva
                  </h2>
                  {/* "BAR" — small sans, gold, spaced */}
                  <div className="flex items-center gap-4">
                    <span className="h-[1px] w-12 bg-accent-gold/60" />
                    <span className="font-sans text-sm font-light uppercase tracking-[0.5em] text-accent-gold">
                      Bar
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Glass text block that overlaps the image */}
              <motion.div
                className="mt-10 max-w-[440px] rounded-2xl border border-white/[0.06] bg-black/40 p-8 backdrop-blur-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              >
                <p className="font-sans text-base font-light leading-[1.8] text-gray-400">
                  Descubre nuestra selección exclusiva de Gin&nbsp;&amp;&nbsp;Tonics premium,
                  preparados con pasión y creatividad. Desde los clásicos hasta combinaciones
                  únicas — cada copa es una experiencia sofisticada.
                </p>

                {/* Stats row */}
                <div className="mt-8 flex gap-10 border-t border-white/[0.06] pt-8">
                  <StatChip value="+40" label="Ginebras" />
                  <StatChip value="6" label="Locales" />
                  <StatChip value="100%" label="De autor" />
                </div>

                <div className="mt-8">
                  <EditorialCTA href="#menu">Explorar Coctelería</EditorialCTA>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — large portrait photo with parallax */}
            <div className="relative z-10 -ml-20 aspect-[3/4] overflow-hidden rounded-3xl shadow-[0_48px_120px_rgba(0,0,0,0.75)]">
              <motion.div
                className="absolute inset-[-8%] h-[116%] w-full"
                style={{ y: imageY }}
              >
                <Image
                  src="/Cocteleria.png"
                  alt="Coctelería de autor — Diva Bar Benidorm"
                  fill
                  sizes="(min-width: 1024px) 45vw"
                  className="object-cover"
                />
                {/* Left edge fade to blend with text glass block */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#090909]/70 via-transparent to-transparent" />
                {/* Bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/50 via-transparent to-transparent" />
              </motion.div>

              {/* Subtle glass ring */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.05]" />
            </div>
          </div>
        </div>

        {/* ── MOBILE: Elegant vertical stack ── */}
        <div className="flex flex-col gap-10 lg:hidden">

          {/* Eyebrow + Title */}
          <div>
            <motion.span
              className="mb-6 block font-sans text-xs font-light uppercase tracking-[0.3em] text-accent-gold/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Coctelería de Autor
            </motion.span>

            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <h2 className="font-serif text-[4rem] leading-none tracking-tighter text-foreground">
                  Diva
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="h-[1px] w-8 bg-accent-gold/60" />
                  <span className="font-sans text-xs font-light uppercase tracking-[0.5em] text-accent-gold">
                    Bar
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Portrait image — mobile */}
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image
              src="/Cocteleria.png"
              alt="Coctelería de autor — Diva Bar Benidorm"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>

          {/* Text + CTA — mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <p className="font-sans text-base font-light leading-[1.8] text-gray-400">
              Descubre nuestra selección exclusiva de Gin&nbsp;&amp;&nbsp;Tonics premium,
              preparados con pasión y creatividad. Cada copa es una experiencia sofisticada.
            </p>

            {/* Stats */}
            <div className="flex gap-8 border-t border-white/[0.06] pt-6">
              <StatChip value="+40" label="Ginebras" />
              <StatChip value="6" label="Locales" />
              <StatChip value="100%" label="De autor" />
            </div>

            <EditorialCTA href="#menu">Explorar Coctelería</EditorialCTA>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
