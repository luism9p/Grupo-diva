"use client";

import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { traditionPillars, type TraditionPillar } from "@/lib/tradition-data";

const ROTATION_SPEED_DEG_PER_SEC = 2.4;
const NODE_LINE_INSET = 32;

function computeNodeOffsets(index: number, total: number, radius: number, rotationDeg: number) {
  const baseAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const angle = baseAngle + (rotationDeg * Math.PI) / 180;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  const lineX = x - NODE_LINE_INSET * Math.cos(angle);
  const lineY = y - NODE_LINE_INSET * Math.sin(angle);
  return { x, y, lineX, lineY };
}

// Shared by the desktop floating card and the mobile panel below, so the
// two surfaces never drift out of sync content-wise.
function PillarCardBody({ pillar }: { pillar: TraditionPillar }) {
  const Icon = pillar.icon;
  return (
    <>
      <div className="pb-2">
        <div className="mb-1 flex items-center gap-2">
          <Icon className="h-4 w-4 text-[#C5A059]" />
          <h3 className="m-0 font-serif text-base font-semibold text-foreground normal-case">
            {pillar.title}
          </h3>
        </div>
        <p className="m-0 font-sans text-xs text-muted-foreground">{pillar.subtitle}</p>
      </div>
      <p className="m-0 font-sans text-sm leading-relaxed text-muted-foreground">
        {pillar.description}
      </p>
      {pillar.relatedIds.length > 0 && (
        <div className="mt-3 border-t border-accent-red/30 pt-3">
          <p className="m-0 mb-2 font-sans text-xs font-medium text-[#C5A059]">Conecta con:</p>
          <div className="flex flex-wrap gap-1">
            {pillar.relatedIds.map((relatedId) => {
              const related = traditionPillars.find((p) => p.id === relatedId);
              if (!related) return null;
              return (
                <span
                  key={relatedId}
                  className="rounded-full border border-accent-red px-2 py-0.5 font-sans text-xs text-muted-foreground transition-colors hover:border-accent-gold"
                >
                  {related.title}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export function TraditionWheel() {
  const [radius, setRadius] = useState(180);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // The auto-rotation runs continuously (~60x/sec) for as long as no card is
  // expanded. Driving it through React state would re-render this whole
  // component every frame — in environments where requestAnimationFrame
  // isn't throttled to real vsync (e.g. some embedded webviews), that can
  // fire fast enough to trip React's "Maximum update depth exceeded" guard.
  // Instead the angle lives in a ref and gets written straight to the DOM.
  const rotationRef = useRef(0);
  const radiusRef = useRef(radius);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  const lastTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  function applyPositions() {
    traditionPillars.forEach((pillar, index) => {
      const { x, y, lineX, lineY } = computeNodeOffsets(
        index,
        traditionPillars.length,
        radiusRef.current,
        rotationRef.current
      );

      const nodeEl = nodeRefs.current[index];
      if (nodeEl) {
        nodeEl.style.left = `calc(50% + ${x}px)`;
        nodeEl.style.top = `calc(50% + ${y}px)`;
      }

      const lineEl = lineRefs.current[index];
      if (lineEl) {
        lineEl.setAttribute("x2", `calc(50% + ${lineX}px)`);
        lineEl.setAttribute("y2", `calc(50% + ${lineY}px)`);
      }
    });
  }

  useEffect(() => {
    function updateRadius() {
      setRadius(window.innerWidth <= 768 ? 120 : 180);
    }

    updateRadius();
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateRadius, 100);
    }

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useLayoutEffect(() => {
    radiusRef.current = radius;
    applyPositions();
  }, [radius]);

  useEffect(() => {
    if (activeId !== null) {
      lastTimeRef.current = null;
      return;
    }

    function tick(time: number) {
      if (lastTimeRef.current !== null) {
        const deltaSec = (time - lastTimeRef.current) / 1000;
        rotationRef.current = (rotationRef.current + ROTATION_SPEED_DEG_PER_SEC * deltaSec) % 360;
        applyPositions();
      }
      lastTimeRef.current = time;
      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [activeId]);

  const activePillar = traditionPillars.find((p) => p.id === activeId);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div
        className="relative flex h-[400px] w-full max-w-[672px] items-center justify-center select-none md:h-[500px]"
        onClick={() => setActiveId(null)}
      >
        {/* Hover reveal images */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden rounded-full">
          <div className="absolute inset-0 z-[2] bg-black/62" />
          {traditionPillars.map((pillar) => (
            <div
              key={pillar.id}
              className={cn(
                "absolute inset-0 z-[1] transition-[opacity,transform] duration-500 ease-out",
                hoveredId === pillar.id ? "scale-100 opacity-100" : "scale-95 opacity-0"
              )}
            >
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Ring */}
        <div className="absolute h-[240px] w-[240px] rounded-full border border-accent-gold/20 md:h-[360px] md:w-[360px]" />

        {/* Center */}
        <div className="absolute z-10 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-gold bg-card shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-7 w-7 text-[#C5A059]"
            >
              <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589c-.26 0-.51.051-.74.144A5.5 5.5 0 0 0 5.253 9.444 4 4 0 0 0 4 17c0 1.104.896 2 2 2h11Z" />
              <path d="M12 21v-4" />
              <path d="M7 21v-4" />
            </svg>
          </div>
          <span className="mt-2 font-serif text-lg font-semibold text-foreground normal-case">
            Tradición
          </span>
        </div>

        {/* Connector lines */}
        <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full">
          {traditionPillars.map((pillar, index) => {
            const initial = computeNodeOffsets(index, traditionPillars.length, 180, 0);
            return (
              <line
                key={pillar.id}
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${initial.lineX}px)`}
                y2={`calc(50% + ${initial.lineY}px)`}
                stroke="#FAD261"
                strokeWidth={1}
                strokeDasharray="4 4"
                className={cn(
                  "transition-opacity duration-300",
                  activeId === pillar.id ? "opacity-60" : "opacity-0"
                )}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 h-full w-full">
          {traditionPillars.map((pillar, index) => {
            const isActive = activeId === pillar.id;
            const Icon = pillar.icon;
            const initial = computeNodeOffsets(index, traditionPillars.length, 180, 0);
            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  nodeRefs.current[index] = el;
                }}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
                  isActive ? "z-[100]" : "z-20"
                )}
                style={{ left: `calc(50% + ${initial.x}px)`, top: `calc(50% + ${initial.y}px)` }}
                onMouseEnter={() => setHoveredId(pillar.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <button
                  type="button"
                  aria-label={pillar.title}
                  aria-expanded={isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId((current) => (current === pillar.id ? null : pillar.id));
                  }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent-gold p-0 outline-none transition-all duration-300 hover:scale-110",
                    isActive
                      ? "scale-110 bg-accent-gold shadow-[0_4px_6px_-1px_rgba(250,210,97,0.3)]"
                      : "bg-card"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-[#1A1A1A]" : "text-[#C5A059]"
                    )}
                  />
                </button>
                <span className="pointer-events-none absolute top-14 left-1/2 -translate-x-1/2 font-sans text-xs whitespace-nowrap tracking-wide text-foreground">
                  {pillar.title}
                </span>

                {/* Desktop/tablet only: the node-anchored floating card can
                    only assume a wide-enough viewport (it's node-relative, so
                    on a narrow phone a node near the wheel's edge would push
                    the card off-screen). Mobile gets the panel below instead. */}
                <div
                  className={cn(
                    "absolute top-20 left-1/2 z-50 hidden w-64 -translate-x-1/2 rounded-lg border border-accent-gold bg-card p-4 text-left shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-200 md:block",
                    isActive
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2.5 opacity-0"
                  )}
                >
                  <PillarCardBody pillar={pillar} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-only panel: shows the active pillar's info in normal document
          flow below the wheel, so it can never be pushed past the viewport
          edge the way a node-anchored floating card could be. */}
      {activePillar && (
        <div className="w-full max-w-[360px] px-4 md:hidden">
          <div className="rounded-lg border border-accent-gold bg-card p-4 text-left shadow-[0_4px_6px_-1px_rgba(0,0,0,0.5)]">
            <PillarCardBody pillar={activePillar} />
          </div>
        </div>
      )}
    </div>
  );
}
