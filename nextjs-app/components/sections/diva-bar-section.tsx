"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function DivaBarSection() {
  return (
    <section className="overflow-hidden bg-card py-[100px] lg:py-[140px]" id="diva-bar" aria-label="Diva Bar">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="flex flex-col items-start gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-sans text-sm font-bold tracking-[0.3em] text-accent-gold uppercase">
            Coctelería de Autor
          </span>
          <h2 className="text-[3rem] leading-[0.95] md:text-[5.5rem]">
            Diva
            <br />
            Bar
          </h2>
          <p className="max-w-[480px] font-sans text-lg leading-relaxed font-light text-muted-foreground">
            Descubre nuestra selección exclusiva de Gin &amp; Tonics premium, preparados con pasión
            y creatividad. Desde los clásicos hasta combinaciones únicas, cada copa es una
            experiencia refrescante y sofisticada.
          </p>
          <a
            href="#menu"
            className="inline-flex items-center justify-center rounded border-[1.5px] border-accent-gold px-9 py-4 font-sans text-xs font-normal tracking-[2px] text-accent-gold uppercase transition-all hover:bg-accent-gold hover:text-card"
          >
            Explorar Coctelería
          </a>
        </motion.div>

        <motion.div
          className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        >
          <Image
            src="/Cocteleria.png"
            alt="Coctelería de autor Diva Benidorm"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
