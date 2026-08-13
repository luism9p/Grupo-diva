"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";
import { useLenis } from "lenis/react";

export function SplashCurtain() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const y = useTransform(progress, [0, 1], ["0%", "-100%"]);

  // Lenis takes over scrolling in root mode, so the native `window` "scroll"
  // event never fires — read the scroll position through Lenis instead.
  useLenis((lenis) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    // Scrub over exactly one viewport height once the trigger reaches the
    // top, matching the original ScrollTrigger `start: "top top", end: "+=100%"`.
    const start = trigger.offsetTop;
    const range = window.innerHeight;
    const p = Math.min(Math.max((lenis.scroll - start) / range, 0), 1);
    progress.set(p);
  }, [progress]);

  return (
    <>
      <div
        ref={triggerRef}
        className="pointer-events-none absolute top-0 left-0 z-0 h-[200vh] w-full"
        aria-hidden="true"
      />
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-card will-change-transform"
        role="dialog"
        aria-modal="true"
        aria-label="Pantalla de bienvenida"
      >
        <Image
          src="/Grupo-diva-logo-white.png"
          alt="Diva Benidorm"
          width={220}
          height={70}
          className="mb-12 h-auto w-[220px] animate-[splashFadeInUp_0.8s_ease-out_0.2s_both]"
          fetchPriority="high"
        />
        <div className="flex flex-col items-center gap-4 animate-[splashFadeIn_0.6s_ease-out_0.7s_both]">
          <span className="font-sans text-sm font-light tracking-[0.25em] text-muted-foreground uppercase">
            Desliza para descubrir
          </span>
          <div className="h-8 w-px bg-accent-gold/70 animate-[splashBreathe_2.5s_ease-in-out_infinite]" />
        </div>
      </motion.div>
    </>
  );
}
