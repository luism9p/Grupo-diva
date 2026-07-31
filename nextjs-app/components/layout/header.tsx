"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";

const HEADER_HEIGHT = 68;

// The PillNav "base"/"pill" color mapping: the bar + expanding hover-circle +
// active dot use gold (the site's one bright accent), each pill rests on a
// dark card background, and the label swaps to dark text once the gold
// circle rises to cover it — the same gold-fill hover pattern already used
// on buttons across the site.
const PILL_NAV_VARS = {
  "--pn-base": "var(--accent-gold)",
  "--pn-pill-bg": "var(--card)",
  "--pn-pill-text": "var(--foreground)",
  "--pn-hover-text": "#1A1A1A",
} as React.CSSProperties;

export function Header() {
  const [activeHash, setActiveHash] = useState("#inicio");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pillRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // Lenis takes over scrolling in root mode, so the native `window` "scroll"
  // event never fires — read the scroll position through Lenis instead. This
  // runs on every Lenis tick, so only call setState when the active link
  // actually changes (it's a no-op most ticks) rather than unconditionally.
  useLenis((lenis) => {
    const scrollPos = lenis.scroll + HEADER_HEIGHT + 100;

    for (const link of navLinks) {
      const section = document.getElementById(link.href.slice(1));
      if (!section) continue;

      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        setActiveHash((current) => (current === link.href ? current : link.href));
        break;
      }
    }
  }, []);

  // Per-pill "hover-circle" geometry (React Bits' PillNav): the circle needs
  // to expand from a bottom-center point and just cover the pill, which
  // depends on each pill's actual rendered size — computed here and written
  // as CSS custom properties, then the hover reveal itself is plain CSS.
  useLayoutEffect(() => {
    function layout() {
      pillRefs.current.forEach((pill) => {
        if (!pill) return;
        const { width: w, height: h } = pill.getBoundingClientRect();
        if (!w || !h) return;

        const R = (w * w / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        pill.style.setProperty("--circle-d", `${D}px`);
        pill.style.setProperty("--circle-bottom", `${-delta}px`);
        pill.style.setProperty("--circle-origin-y", `${originY}px`);
        pill.style.setProperty("--pill-h", `${h}px`);
      });
    }

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});
    return () => window.removeEventListener("resize", layout);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (!isMobileNavOpen) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMobileNavOpen(false);
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isMobileNavOpen]);

  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  return (
    <>
      <header className="fixed top-4 left-0 z-[1000] flex h-14 w-full items-center bg-transparent lg:h-16">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8">
          <a href="#inicio" aria-label="Diva Benidorm — Inicio">
            <Image
              src="/Grupo-diva-logo-white.png"
              alt="Grupo Diva Logo"
              width={96}
              height={96}
              className="h-11 w-11"
              priority
            />
          </a>

          <nav
            className="pill-nav-bar hidden h-14 items-stretch gap-1 rounded-full p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] lg:flex"
            role="navigation"
            aria-label="Navegación principal"
            style={PILL_NAV_VARS}
          >
            {navLinks.map((link, i) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    pillRefs.current[i] = el;
                  }}
                  href={link.href}
                  className={cn(
                    "pill flex items-center justify-center rounded-full px-5 font-sans text-[0.722rem] font-semibold tracking-wider uppercase",
                    isActive && "is-active"
                  )}
                >
                  <span className="pill-hover-circle" aria-hidden="true" />
                  <span className="relative inline-block">
                    <span className="pill-label">{link.label}</span>
                    <span className="pill-label-hover" aria-hidden="true">
                      {link.label}
                    </span>
                  </span>
                </a>
              );
            })}
          </nav>

          <a
            href="#contacto"
            className="ml-3 hidden h-14 items-center justify-center rounded-full bg-accent-gold px-8 font-sans text-[0.722rem] font-semibold tracking-wider text-[#1A1A1A] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all hover:scale-[1.02] hover:bg-accent-red hover:text-foreground lg:inline-flex"
          >
            Reservar
          </a>

          <button
            className="z-[1100] flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center gap-[5px] rounded-full bg-accent-gold shadow-[0_8px_20px_rgba(0,0,0,0.35)] lg:hidden"
            aria-label={isMobileNavOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((v) => !v)}
          >
            <span
              className={cn(
                "block h-[2px] w-5 rounded-full bg-[#1A1A1A] transition-transform duration-300",
                isMobileNavOpen && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[2px] w-5 rounded-full bg-[#1A1A1A] transition-transform duration-300",
                isMobileNavOpen && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </header>

      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} activeHash={activeHash} />
    </>
  );
}
