"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/layout/mobile-nav";

const HEADER_HEIGHT = 68;

export function Header() {
  const [activeHash, setActiveHash] = useState("#inicio");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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
              className="h-30 w-30"
              priority
            />
          </a>

          <nav
            className="hidden h-14 items-stretch gap-1 rounded-full bg-transparent p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] lg:flex"
            role="navigation"
            aria-label="Navegación principal"
          >
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center justify-center rounded-full bg-accent-gold px-5 font-sans text-[0.722rem] font-semibold tracking-wider text-[#1A1A1A] uppercase transition-colors duration-300 hover:bg-black hover:text-foreground",
                    isActive && "is-active"
                  )}
                >
                  {link.label}
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
