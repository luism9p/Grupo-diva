"use client";

import { useRef } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";

const SCROLL_HEIGHT = 2000;
// Matches the original static site's reveal: a tight centered window that
// opens up as the user scrolls. This only stays fully visible if the content
// is vertically centered (see `items-center` below) — top-aligning it (as a
// previous fix did, to clear the floating nav) pushes it outside this small
// window and makes the Hero look blank at rest.
const CLIP_START = 30;
const CLIP_END = 70;

function buildClipPath(start: number, end: number) {
  return `polygon(${start}% ${start}%, ${end}% ${start}%, ${end}% ${end}%, ${start}% ${end}%)`;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgDesktopRef = useRef<HTMLDivElement>(null);
  const bgMobileRef = useRef<HTMLDivElement>(null);

  // Lenis takes over scrolling in root mode, so the native `window` "scroll"
  // event never fires — read the scroll position through Lenis instead. This
  // runs on every Lenis tick (~60/sec), so the clip-path/background-size are
  // written straight to the DOM here instead of through React state — piping
  // them through setState would re-render the component every tick, which is
  // exactly what tripped "Maximum update depth exceeded" in production.
  useLenis((lenis) => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    const scrollY = lenis.scroll;
    const heroTop = section.offsetTop;
    const progress = Math.min(Math.max((scrollY - heroTop) / SCROLL_HEIGHT, 0), 1);

    const clipStart = CLIP_START * (1 - progress);
    const clipEnd = CLIP_END + (100 - CLIP_END) * progress;
    sticky.style.clipPath = buildClipPath(clipStart, clipEnd);

    const sizeProgress = Math.min(Math.max((scrollY - heroTop) / (SCROLL_HEIGHT + 500), 0), 1);
    const bgSize = `${170 - 70 * sizeProgress}%`;
    if (bgDesktopRef.current) bgDesktopRef.current.style.backgroundSize = bgSize;
    if (bgMobileRef.current) bgMobileRef.current.style.backgroundSize = bgSize;
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Inicio"
      className="relative w-full bg-black"
      style={{ height: `calc(${SCROLL_HEIGHT}px + 100vh)` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-dvh min-h-[700px] w-full items-start justify-center bg-black pt-20 [will-change:clip-path] md:items-center md:pt-0"
        style={{ clipPath: buildClipPath(CLIP_START, CLIP_END) }}
      >
        <div
          ref={bgDesktopRef}
          className="absolute inset-0 z-0 hidden bg-center bg-no-repeat [will-change:background-size] md:block"
          style={{ backgroundImage: "url('/pizza.jpg')", backgroundSize: "170%" }}
          role="img"
          aria-label="Pizza artesanal italiana"
        />
        <div
          ref={bgMobileRef}
          className="absolute inset-0 z-0 block bg-center bg-no-repeat [will-change:background-size] md:hidden"
          style={{ backgroundImage: "url('/pizza-mobile.jpg')", backgroundSize: "170%" }}
          role="img"
          aria-label="Pizza artesanal italiana"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/65 to-black/40" />

        <div className="relative z-[2] mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 md:flex-row">
          <div className="relative z-[2] w-full text-center md:max-w-[50%] md:flex-[0_0_50%] md:pr-8 md:text-left">
            {/* Mobile-only editorial treatment: an oversized outlined "PIZZA"
                breaks out of the normal text block instead of just being a
                smaller copy of the desktop headline. */}
            <div className="mb-4 md:hidden">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-gold/50 bg-accent-gold/10 px-4 py-1.5 font-sans text-[0.65rem] font-bold tracking-[0.3em] text-accent-gold uppercase">
                100% Artesanal
              </span>
              <h1 className="text-foreground">
                <span className="block text-[1.4rem] leading-none uppercase">No solo hacemos</span>
                <span className="-mx-1 block text-[4rem] leading-[0.85] text-transparent uppercase [-webkit-text-stroke:1.5px_#FAD261]">
                  Pizza
                </span>
                <span className="mt-2 block text-[1.4rem] leading-none uppercase">te hacemos feliz</span>
              </h1>
              <div className="mx-auto mt-3 h-px w-16 -rotate-3 bg-accent-gold" aria-hidden="true" />
            </div>

            <h1 className="mb-5 hidden text-3xl leading-tight text-foreground md:block md:text-6xl">
              No solo hacemos <span className="text-accent-gold">pizza</span>,
              <br />
              te hacemos feliz
            </h1>
            <p className="mb-6 font-sans text-base font-light leading-relaxed text-muted-foreground sm:text-lg md:mb-10">
              Auténtica cocina italiana, elaborada con pasión y los mejores ingredientes.
              <br />
              Ven y disfruta.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              {/* Primary — solid gold pill */}
              <a
                href="#menu"
                className="rounded-full bg-accent-gold px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-black transition-transform duration-300 hover:scale-105"
              >
                Explorar Menú
              </a>
              {/* Secondary — ghost pill */}
              <a
                href="#contacto"
                className="rounded-full border border-white/30 px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-white/10"
              >
                Reservar Mesa
              </a>
            </div>
          </div>

          <div className="relative mt-2 flex h-[20vh] w-full items-center justify-center overflow-visible md:mt-0 md:h-auto md:max-w-[50%] md:flex-[0_0_50%]">
            <div className="relative w-full max-w-[800px] origin-[center_right] md:absolute md:top-[45%] md:-right-[30%] md:w-full md:-translate-y-1/2 md:scale-[1.3] 2xl:-right-[35%] 2xl:max-w-[900px] 2xl:scale-[1.4]">
              <Image
                src="/hero.png"
                alt="Pizza Premium Diva Benidorm"
                width={800}
                height={800}
                className="h-auto w-full animate-[float_6s_ease-in-out_infinite] object-contain drop-shadow-[0px_35px_35px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="h-12 w-px animate-[scrollPulse_2s_ease-in-out_infinite] bg-gradient-to-b from-accent-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
