"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { menuTabs } from "@/lib/menu-data";

export function MenuSection() {
  const [activeId, setActiveId] = useState(menuTabs[0].id);

  return (
    <section className="bg-background py-[100px] lg:py-[140px]" id="menu" aria-label="Menú">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-18 text-center">
          <h2 className="text-[clamp(2.8rem,6vw,4.5rem)] leading-none tracking-wide">Menú</h2>
          <div className="mx-auto mt-5 h-0.5 w-12 bg-accent-gold" />
        </div>

        <div className="grid grid-cols-1 items-center gap-18 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl shadow-[0_32px_80px_rgba(0,0,0,0.55)]">
              {/* Stacked layers cross-fade by opacity. The transition lives on a
                  plain wrapper div, not on next/image's <img> (CSS transitions on
                  that element get wedged by its lazy-load handling). */}
              {menuTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-[450ms] ease-in-out",
                    tab.id === activeId ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  )}
                >
                  <Image
                    src={tab.image}
                    alt={tab.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(13,13,13,0.55)] to-transparent to-60%" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            {menuTabs.map((tab, index) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(tab.id)}
                  className={cn(
                    "group flex items-center gap-5 rounded-lg bg-transparent py-5 pr-5 pl-0 text-left outline-none",
                    index > 0 && "border-t border-white/[0.06]"
                  )}
                >
                  <span
                    className={cn(
                      "min-h-15 w-[3px] flex-shrink-0 self-stretch rounded-sm transition-colors",
                      isActive ? "bg-accent-gold" : "bg-transparent group-hover:bg-accent-gold/25"
                    )}
                  />
                  <span className="flex-1">
                    <span
                      className={cn(
                        "mb-2 block font-serif text-2xl leading-none tracking-wider transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {tab.title}
                    </span>
                    <span
                      className={cn(
                        "block overflow-hidden font-sans text-sm leading-relaxed font-light text-muted-foreground transition-all duration-300",
                        isActive ? "max-h-24 opacity-80" : "max-h-0 opacity-0"
                      )}
                    >
                      {tab.description}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex-shrink-0 text-xl transition-all",
                      isActive
                        ? "translate-x-0 text-accent-gold opacity-100"
                        : "-translate-x-1.5 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                    )}
                  >
                    →
                  </span>
                </button>
              );
            })}

            <a
              href="#"
              className="mt-8 inline-flex w-fit items-center justify-center self-start rounded border-[1.5px] border-accent-gold px-9 py-4 font-sans text-xs uppercase tracking-[2px] text-accent-gold transition-all hover:scale-[1.02] hover:border-accent-red hover:bg-accent-red hover:text-foreground"
            >
              Ver Carta Completa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
