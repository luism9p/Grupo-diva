"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { locations, formatAddress } from "@/lib/locations";

const ClockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function UbicacionesSection() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const activeLocation = locations.find((loc) => loc.id === activeId) ?? locations[0];
  const activeCaption = `${activeLocation.name} — ${activeLocation.street}`;

  return (
    <section className="bg-background py-[100px] lg:py-[140px]" id="ubicaciones" aria-label="Ubicaciones">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-18 text-center">
          <span className="mb-4 block font-sans text-[0.8rem] font-bold tracking-[0.3em] text-accent-gold uppercase">
            Seis direcciones, un mismo sabor
          </span>
          <h2 className="mb-4 text-4xl leading-tight md:text-5xl">Cómo encontrarnos</h2>
          <hr className="mx-auto mb-8 h-0.5 w-12 border-none bg-accent-gold" />
          <p className="font-sans text-lg font-light text-muted-foreground">
            Trabajamos para ti todos los días, repartidos por el corazón de Benidorm.
          </p>
        </div>

        <motion.div
          className="mb-22 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Dynamic image */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.55)] lg:aspect-[4/5]">
              <Image
                key={activeLocation.image}
                src={activeLocation.image}
                alt={activeCaption}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition-opacity duration-[450ms] ease-in-out"
              />
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(13,13,13,0.7)] to-transparent to-55%" />
              <span className="absolute bottom-[22px] left-6 z-[2] font-sans text-[0.8rem] tracking-[0.08em] text-foreground uppercase">
                {activeCaption}
              </span>
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col border-t border-accent-gold/15">
            {locations.map((location) => {
              const isActive = location.id === activeId;
              return (
                <div
                  key={location.id}
                  className="flex flex-col items-start justify-between gap-4 border-b border-accent-gold/15 py-5 sm:flex-row sm:items-center"
                >
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(location.id)}
                    className="group flex flex-1 items-center gap-5 bg-transparent p-0 text-left outline-none"
                  >
                    <span
                      className={cn(
                        "flex h-13 w-13 flex-shrink-0 items-center justify-center rounded-md border-[1.5px] border-accent-gold font-serif text-xl transition-colors",
                        isActive
                          ? "bg-accent-gold text-card"
                          : "text-accent-gold group-hover:bg-accent-gold/10"
                      )}
                    >
                      {location.streetNumber}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span
                        className={cn(
                          "font-serif text-xl leading-tight tracking-wide transition-colors",
                          isActive ? "text-foreground" : "text-muted-foreground"
                        )}
                      >
                        {location.name}
                      </span>
                      <span className="font-sans text-[0.833rem] font-light text-muted-foreground">
                        {formatAddress(location)}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex-shrink-0 text-accent-gold transition-all",
                        isActive ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0"
                      )}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>

                  <div className="flex flex-shrink-0 flex-col items-start gap-1.5 pl-[72px] sm:items-end sm:gap-2 sm:pl-0">
                    <span className="flex items-center gap-2 font-sans text-[0.8rem] whitespace-nowrap text-muted-foreground">
                      <ClockIcon className="h-3.5 w-3.5 flex-shrink-0" />
                      {location.hours}
                    </span>
                    <a
                      href={`tel:${location.phoneHref}`}
                      className="flex items-center gap-2 font-sans text-[0.8rem] whitespace-nowrap text-foreground transition-colors hover:text-accent-gold"
                    >
                      <PhoneIcon className="h-3.5 w-3.5 flex-shrink-0" />
                      {location.phone}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-xl shadow-[0_24px_64px_rgba(0,0,0,0.5)] after:pointer-events-none after:absolute after:inset-0 after:z-[1] after:bg-gradient-to-br after:from-accent-gold/[0.18] after:to-black/40 after:[mix-blend-mode:color]">
            {(["tl", "tr", "bl", "br"] as const).map((corner) => (
              <span
                key={corner}
                aria-hidden="true"
                className={cn(
                  "absolute z-[2] h-[22px] w-[22px] border-accent-gold/85",
                  corner === "tl" && "top-3.5 left-3.5 border-t-[1.5px] border-l-[1.5px]",
                  corner === "tr" && "top-3.5 right-3.5 border-t-[1.5px] border-r-[1.5px]",
                  corner === "bl" && "bottom-3.5 left-3.5 border-b-[1.5px] border-l-[1.5px]",
                  corner === "br" && "bottom-3.5 right-3.5 border-r-[1.5px] border-b-[1.5px]"
                )}
              />
            ))}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3126.5!2d-0.1308!3d38.5411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDMyJzI4LjAiTiAwwrAwNyc1MS4wIlc!5e0!3m2!1ses!2ses!4v1700000000000"
              className="block h-[420px] w-full border-0 grayscale invert-[90%] brightness-90 contrast-[1.1]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicaciones Diva Benidorm"
            />
          </div>
          <div className="flex items-center justify-between gap-4 pt-5">
            <span className="font-sans text-[0.8rem] tracking-[0.08em] text-muted-foreground uppercase">
              Benidorm, Comunidad Valenciana
            </span>
            <a
              href="https://maps.google.com/?q=Diva+Benidorm"
              target="_blank"
              rel="noopener"
              className="font-sans text-[0.8rem] font-bold tracking-[0.05em] text-accent-gold uppercase transition-colors hover:text-foreground"
            >
              Ver en Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
