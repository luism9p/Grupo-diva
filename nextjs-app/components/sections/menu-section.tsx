"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { menuTabs } from "@/lib/menu-data";

/* ─────────────────────────────────────────────────────────────
   CategoryRow — one giant typographic line
───────────────────────────────────────────────────────────── */
function CategoryRow({
  tab,
  index,
  isActive,
  onEnter,
  onClick,
}: {
  tab: (typeof menuTabs)[number];
  index: number;
  isActive: boolean;
  onEnter: () => void;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-pressed={isActive}
      onMouseEnter={onEnter}
      onClick={onClick}
      className="group relative w-full cursor-pointer border-t border-white/[0.06] py-5 text-left outline-none first:border-t-0 focus-visible:outline-none"
      initial={false}
    >
      {/* Number label — tiny, gold, absolute left */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 font-sans text-[10px] font-light uppercase tracking-[0.25em] transition-all duration-500 ${
          isActive ? "text-accent-gold opacity-100" : "text-white/20 opacity-0 group-hover:opacity-60"
        }`}
      >
        0{index + 1}
      </span>

      {/* Giant title */}
      <span
        className={`block select-none pl-10 font-serif leading-[0.9] tracking-tighter transition-all duration-500 ease-out
          text-[clamp(3.5rem,8vw,7rem)]
          ${isActive ? "text-foreground" : "text-white/15 group-hover:text-white/50"}`}
      >
        {tab.title}
      </span>

      {/* Description — only shows on active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.span
            key="desc"
            className="block overflow-hidden pl-10 font-sans text-sm font-light leading-relaxed text-gray-500"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "0.75rem" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {tab.description}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active bottom line */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] bg-accent-gold/60"
        animate={{ width: isActive ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────────────
   MobileCard — full-bleed card for touch devices
───────────────────────────────────────────────────────────── */
function MobileCard({ tab, index }: { tab: (typeof menuTabs)[number]; index: number }) {
  return (
    <motion.div
      className="relative h-[55vw] min-h-[220px] w-[72vw] flex-shrink-0 overflow-hidden rounded-2xl"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Image
        src={tab.image}
        alt={tab.title}
        fill
        sizes="72vw"
        className="object-cover"
      />
      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      {/* Number + Title */}
      <div className="absolute bottom-0 left-0 p-5">
        <span className="mb-1 block font-sans text-[10px] font-light uppercase tracking-[0.25em] text-accent-gold/70">
          0{index + 1}
        </span>
        <span className="block font-serif text-2xl leading-none tracking-tight text-foreground">
          {tab.title}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MenuSection
───────────────────────────────────────────────────────────── */
export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Track previous for exit direction
  const prevIndex = useRef(0);

  const handleEnter = (i: number) => {
    prevIndex.current = activeIndex;
    setActiveIndex(i);
  };

  const activeTab = menuTabs[activeIndex];

  return (
    <section
      id="menu"
      aria-label="Menú de Grupo Diva"
      className="bg-background py-[100px] lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">

        {/* ── Section header ── */}
        <div className="mb-16 lg:mb-24">
          <motion.span
            className="mb-4 block font-sans text-xs font-light uppercase tracking-[0.25em] text-accent-gold/70"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Nuestra cocina
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-5xl leading-none tracking-tighter text-foreground lg:text-7xl"
              initial={{ y: "105%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              Menú
            </motion.h2>
          </div>
        </div>

        {/* ── DESKTOP: Two-column hover reveal ── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 xl:grid-cols-[5fr_7fr]">

          {/* Left — sticky image panel */}
          <div className="relative">
            <div className="sticky top-[20vh]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <Image
                      src={activeTab.image}
                      alt={activeTab.title}
                      fill
                      sizes="40vw"
                      className="object-cover"
                      priority
                    />
                    {/* Bottom fade into page background */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle glass border */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.06]" />
              </div>

              {/* Active label beneath image */}
              <div className="mt-6 flex items-center gap-3 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTab.id + "-label"}
                    className="font-sans text-xs font-light uppercase tracking-[0.2em] text-accent-gold/70"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab.title}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right — giant typographic list */}
          <div className="flex flex-col justify-center">
            <nav aria-label="Categorías del menú">
              {menuTabs.map((tab, i) => (
                <CategoryRow
                  key={tab.id}
                  tab={tab}
                  index={i}
                  isActive={activeIndex === i}
                  onEnter={() => handleEnter(i)}
                  onClick={() => handleEnter(i)}
                />
              ))}
            </nav>

            {/* CTA */}
            <motion.a
              href="#carta"
              className="mt-12 inline-flex w-fit items-center gap-3 self-start border-b border-accent-gold/40 pb-1 font-sans text-xs uppercase tracking-[2px] text-accent-gold/80 transition-all duration-300 hover:gap-5 hover:border-accent-gold hover:text-accent-gold"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Ver carta completa
              <span className="text-base">→</span>
            </motion.a>
          </div>
        </div>

        {/* ── MOBILE: Horizontal scroll cards ── */}
        <div className="lg:hidden">
          {/* Scrollable row */}
          <div
            className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="list"
            aria-label="Categorías del menú"
          >
            {menuTabs.map((tab, i) => (
              <div key={tab.id} role="listitem">
                <MobileCard tab={tab} index={i} />
              </div>
            ))}
          </div>

          {/* Scroll hint dots */}
          <div className="mt-5 flex justify-center gap-1.5">
            {menuTabs.map((tab) => (
              <div key={tab.id} className="h-[3px] w-6 rounded-full bg-white/10" />
            ))}
          </div>

          {/* CTA mobile */}
          <div className="mt-10 text-center">
            <a
              href="#carta"
              className="inline-flex items-center gap-2 border-b border-accent-gold/40 pb-1 font-sans text-xs uppercase tracking-[2px] text-accent-gold/80"
            >
              Ver carta completa
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
