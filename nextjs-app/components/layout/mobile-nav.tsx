"use client";

import { motion } from "motion/react";
import { navLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeHash?: string;
}

export function MobileNav({ isOpen, onClose, activeHash }: MobileNavProps) {
  return (
    <>
      {/* Invisible click-away catcher — the template itself has no backdrop dimming */}
      <div
        className={cn("fixed inset-0 z-[997] lg:hidden", isOpen ? "block" : "hidden")}
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="fixed top-20 right-0 left-0 z-[998] mx-auto w-[min(360px,calc(100vw-2rem))] origin-top rounded-[27px] bg-accent-gold p-[3px] shadow-[0_8px_32px_rgba(0,0,0,0.35)] lg:hidden"
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: 10, scaleY: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ visibility: isOpen ? "visible" : "hidden", pointerEvents: isOpen ? "auto" : "none" }}
        role="dialog"
        aria-label="Menú móvil"
      >
        <ul className="flex flex-col gap-[3px]">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className={cn(
                  "block rounded-[24px] px-5 py-3.5 font-sans text-sm font-medium transition-colors hover:bg-accent-gold hover:text-[#1A1A1A]",
                  activeHash === link.href ? "bg-accent-gold text-[#1A1A1A]" : "bg-card text-foreground"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              onClick={onClose}
              className="block rounded-[24px] bg-[#1A1A1A] px-5 py-3.5 text-center font-sans text-sm font-semibold tracking-wide text-accent-gold uppercase transition-colors hover:bg-accent-red hover:text-foreground"
            >
              Reservar
            </a>
          </li>
        </ul>
      </motion.div>
    </>
  );
}
