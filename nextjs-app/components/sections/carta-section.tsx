"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { carta, formatPrecio, type CartaCategoria, type CartaItem } from "@/lib/carta-data";

const WHATSAPP_NUMBER = "34650904402";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, quiero hacer un pedido de la carta de Diva Benidorm 🍕"
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// Ambiente/local photos used as full-bleed dividers between category
// groups — kept separate from dish photos per the brief, never reused as an
// item's `imagen`. Keyed by the slug of the category the divider precedes.
const SEPARATORS: Record<string, { image: string; alt: string; caption: string }> = {
  entrantes: {
    image: "/gente.jpg",
    alt: "Ambiente en Diva Benidorm",
    caption: "Una mesa para cada ocasión",
  },
  postres: {
    image:
      "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.182907516_1883693601786142_3937510831874167453_n.Woblo.webp",
    alt: "Coctelería y celebraciones en Diva Benidorm",
    caption: "Para brindar antes del postre",
  },
};

export function CartaSection() {
  const [activeSlug, setActiveSlug] = useState(carta[0].slug);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Lenis takes over scrolling in root mode, so the native `window` "scroll"
  // event never fires — read the scroll position through Lenis instead.
  useLenis((lenis) => {
    const scrollPos = lenis.scroll + 170;

    for (const cat of carta) {
      const section = document.getElementById(`carta-${cat.slug}`);
      if (!section) continue;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        setActiveSlug((current) => (current === cat.slug ? current : cat.slug));
        break;
      }
    }
  }, []);

  // Keep the active pill visible within the horizontally-scrolling tab bar.
  // This must only ever touch that bar's own `scrollLeft` — `scrollIntoView`
  // on the pill itself was the bug: on first mount (or whenever the section
  // is still off-screen) the browser has to scroll SOME ancestor to satisfy
  // it, and with nothing constraining it that ancestor was the whole page,
  // yanking a fresh page load straight down to the Carta section.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const container = tabsScrollRef.current;
    const activeTab = tabRefs.current[activeSlug];
    if (!container || !activeTab) return;

    const target =
      activeTab.offsetLeft - container.clientWidth / 2 + activeTab.clientWidth / 2;
    container.scrollTo({ left: target, behavior: "smooth" });
  }, [activeSlug]);

  return (
    <section id="carta" aria-label="La Carta" className="bg-background">
      {/* Hero banner — ambiente/local photo, never a dish photo */}
      <div className="relative flex h-[55vh] min-h-[420px] w-full items-end overflow-hidden md:h-[65vh]">
        <Image
          src="/local1.jpg"
          alt="Fachada de Pizzeria Diva"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-6 pb-12 md:px-8 md:pb-16">
          <span className="mb-3 block font-sans text-sm font-bold tracking-[0.3em] text-accent-gold uppercase">
            Trece secciones, una sola pasión
          </span>
          <h2 className="text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.9] text-foreground">La Carta</h2>
          <p className="mt-4 max-w-[560px] font-sans text-base leading-relaxed font-light text-muted-foreground md:text-lg">
            Todo lo que preparamos en Diva Benidorm, de las pizzas napolitanas al último postre.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-accent-gold px-7 py-3.5 font-sans text-xs font-semibold tracking-[2px] text-[#1A1A1A] uppercase transition-all hover:scale-[1.02] hover:bg-accent-red hover:text-foreground"
            >
              Pedir por WhatsApp
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded border-[1.5px] border-accent-gold px-7 py-3.5 font-sans text-xs font-semibold tracking-[2px] text-accent-gold uppercase transition-all hover:bg-accent-gold hover:text-[#1A1A1A]"
            >
              Reservar Mesa
            </a>
          </div>
        </div>
      </div>

      {/* Sticky category nav — horizontally scrollable on mobile */}
      <div className="sticky top-20 z-30 border-b border-accent-gold/15 bg-background/95 backdrop-blur-md">
        <div
          ref={tabsScrollRef}
          className="mx-auto flex max-w-[1200px] gap-2 overflow-x-auto px-6 py-4 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {carta.map((cat) => {
            const isActive = cat.slug === activeSlug;
            return (
              <a
                key={cat.slug}
                ref={(el) => {
                  tabRefs.current[cat.slug] = el;
                }}
                href={`#carta-${cat.slug}`}
                className={cn(
                  "flex-shrink-0 rounded-full border px-5 py-2 font-sans text-[0.72rem] font-semibold tracking-wider uppercase transition-colors",
                  isActive
                    ? "border-accent-gold bg-accent-gold text-[#1A1A1A]"
                    : "border-white/10 bg-card text-muted-foreground hover:border-accent-gold/50 hover:text-foreground"
                )}
              >
                {cat.categoria}
              </a>
            );
          })}
        </div>
      </div>

      {/* Category sections, with full-bleed ambiente separators between groups */}
      <div className="pb-[100px] lg:pb-[140px]">
        {carta.map((cat, index) => {
          const separator = SEPARATORS[cat.slug];
          return (
            <div key={cat.slug}>
              {separator && <CartaSeparator {...separator} />}
              <div className="mx-auto max-w-[1200px] px-6 md:px-8">
                <CartaCategoriaBlock categoria={cat} showTopBorder={index > 0 && !separator} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Closing CTA */}
      <div className="mx-auto max-w-[1200px] px-6 pb-[100px] md:px-8 lg:pb-[140px]">
        <div className="flex flex-col items-center gap-5 rounded-xl border border-accent-gold/25 bg-card px-8 py-14 text-center">
          <h3 className="text-[clamp(1.8rem,4vw,2.75rem)] leading-tight text-foreground">
            ¿Se te antojó algo?
          </h3>
          <p className="max-w-[440px] font-sans text-base font-light text-muted-foreground">
            Pide para llevar o recoger por WhatsApp, o resérvanos una mesa en cualquiera de
            nuestros 6 locales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-accent-gold px-9 py-4 font-sans text-xs font-semibold tracking-[2px] text-[#1A1A1A] uppercase transition-all hover:scale-[1.02] hover:bg-accent-red hover:text-foreground"
            >
              Pedir por WhatsApp
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded border-[1.5px] border-accent-gold px-9 py-4 font-sans text-xs font-semibold tracking-[2px] text-accent-gold uppercase transition-all hover:bg-accent-gold hover:text-[#1A1A1A]"
            >
              Reservar Mesa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartaCategoriaBlock({
  categoria,
  showTopBorder,
}: {
  categoria: CartaCategoria;
  showTopBorder: boolean;
}) {
  return (
    <motion.div
      id={`carta-${categoria.slug}`}
      className={cn("scroll-mt-40 py-14 md:py-20", showTopBorder && "border-t border-accent-gold/10")}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mb-8 flex items-baseline gap-4">
        <h3 className="text-[clamp(1.8rem,4vw,2.5rem)] leading-none text-foreground">
          {categoria.categoria}
        </h3>
        <span className="h-px flex-1 bg-accent-gold/20" aria-hidden="true" />
      </div>

      {categoria.imagenCategoria && (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image
            src={categoria.imagenCategoria}
            alt={categoria.categoria}
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
        {categoria.items.map((item) => (
          <CartaItemRow key={item.nombre} item={item} />
        ))}
      </div>

      {categoria.extras && categoria.extras.length > 0 && (
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <p className="font-sans text-xs tracking-wide text-muted-foreground uppercase">
            {categoria.extras.map((extra, i) => (
              <span key={extra.nombre}>
                {i > 0 && " · "}
                {extra.nombre} +{formatPrecio(extra.precio)}
              </span>
            ))}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function CartaItemRow({ item }: { item: CartaItem }) {
  return (
    <div className="flex items-center gap-4 border-b border-white/[0.06] py-3.5">
      {item.imagen && (
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
          <Image src={item.imagen} alt={item.nombre} fill sizes="56px" className="object-cover" />
        </div>
      )}
      <span className="flex-1 font-sans text-[0.95rem] leading-snug text-foreground">
        {item.nombre}
      </span>
      <span className="flex-shrink-0 font-sans text-[0.95rem] font-semibold text-accent-gold">
        {formatPrecio(item.precio)}
      </span>
    </div>
  );
}

function CartaSeparator({ image, alt, caption }: { image: string; alt: string; caption: string }) {
  return (
    <div className="relative my-4 h-[220px] w-full overflow-hidden md:h-[280px]">
      <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
        <span className="text-2xl leading-tight text-foreground uppercase md:text-3xl">
          {caption}
        </span>
      </div>
    </div>
  );
}
