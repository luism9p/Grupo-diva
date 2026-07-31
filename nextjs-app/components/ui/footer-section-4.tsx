"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { SocialCloud } from "@/components/ui/footer-section-4-utils/social-cloud";
import { navLinks } from "@/lib/nav-links";

const FOOTER_TITLE = "Cocina Italiana Con Alma Premium";

export default function Footer4() {
  const enlaces = navLinks.filter((link) => link.href !== "#contacto");
  enlaces.push({ href: "#contacto", label: "Reservas" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-background px-4 py-12" id="footer" aria-label="Pie de página">
      <motion.div
        className="container mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex h-full flex-col gap-4 md:flex-row">
          {/* Gold brand card */}
          <motion.div
            className="relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-2xl bg-accent-gold p-8 md:min-h-[500px] md:w-1/3 md:p-10"
            variants={itemVariants}
          >
            {/* SVG Noise Overlay */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90 mix-blend-multiply"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="footerNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={4} stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#footerNoiseFilter)" />
            </svg>

            <div className="relative z-10">
              <Image
                src="/Grupo-diva-logo-black.png"
                alt="Grupo Diva"
                width={120}
                height={38}
                className="h-9 w-auto"
              />
            </div>

            <div className="relative z-10 space-y-5">
              <h3 className="font-serif text-xl leading-snug text-[#1A1A1A]">{FOOTER_TITLE}</h3>
              <SocialCloud className="gap-4 text-[#1A1A1A]/80" />
              <p className="font-sans text-xs text-[#1A1A1A]/60">
                &copy; {new Date().getFullYear()} Diva Benidorm. Todos los derechos reservados.
              </p>
            </div>
          </motion.div>

          {/* Dark card */}
          <motion.div
            className="flex min-h-[400px] w-full flex-col justify-between rounded-2xl border border-accent-red/20 bg-card p-8 md:min-h-[500px] md:w-2/3 md:p-12"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col space-y-5">
                <h4 className="font-serif text-lg text-foreground">Enlaces</h4>
                <ul className="flex flex-col space-y-3 font-sans text-sm font-light text-muted-foreground">
                  {enlaces.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="transition-colors hover:text-accent-gold">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-5">
                <h4 className="font-serif text-lg text-foreground">Contacto</h4>
                <ul className="flex flex-col space-y-3 font-sans text-sm font-light text-muted-foreground">
                  <li>
                    <a href="tel:+34650904402" className="transition-colors hover:text-accent-gold">
                      650 904 402
                    </a>
                  </li>
                  <li>6 locales en Benidorm</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start gap-4 border-t border-accent-red/20 pt-8 sm:flex-row sm:items-center sm:justify-between md:mt-0">
              <p className="font-sans text-sm font-light text-muted-foreground">
                ¿Listo para vivir la experiencia Diva?
              </p>
              <a
                href="#contacto"
                className="inline-flex w-fit items-center justify-center rounded border-[1.5px] border-accent-gold px-8 py-3.5 font-sans text-xs uppercase tracking-[2px] text-accent-gold transition-all hover:bg-accent-gold hover:text-card"
              >
                Reservar Mesa
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
