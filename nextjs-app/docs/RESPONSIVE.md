# Plan Estratégico de Diseño Responsive — Diva Benidorm

Este documento describe el sistema responsive del proyecto: los breakpoints en uso, cómo se
comporta la navegación, cómo se reestructuran los grids entre dispositivos, las reglas de
rendimiento para imágenes y animaciones, la escala tipográfica, y el flujo de trabajo a seguir
para cualquier sección nueva o modificada.

No es teoría genérica — está basado en el sistema que ya implementa `nextjs-app/` (Tailwind v4
sin breakpoints personalizados, `motion` para animaciones, Lenis para scroll suave) y en bugs
reales que se encontraron y corrigieron durante el desarrollo del sitio.

---

## 1. Estrategia de Breakpoints

El proyecto usa la escala **por defecto de Tailwind v4** (no hay overrides en `@theme` de
`globals.css`). Estos son los valores exactos, con su media query CSS equivalente:

| Breakpoint | Media query CSS | Prefijo Tailwind | Dispositivo objetivo |
|---|---|---|---|
| Base (sin prefijo) | *(sin media query — mobile-first)* | *(ninguno)* | Móviles pequeños, 320–639px |
| `sm` | `@media (min-width: 40rem)` → 640px | `sm:` | Móviles grandes / phablets |
| `md` | `@media (min-width: 48rem)` → 768px | `md:` | Tablets verticales |
| `lg` | `@media (min-width: 64rem)` → 1024px | `lg:` | Tablets horizontales / laptops pequeños |
| `xl` | `@media (min-width: 80rem)` → 1280px | `xl:` | Laptops / desktop estándar |
| `2xl` | `@media (min-width: 96rem)` → 1536px | `2xl:` | Pantallas grandes / ultra anchas |

**Regla de oro: mobile-first siempre.** Nunca escribas `max-width`. Todo estilo base es para el
móvil más pequeño, y cada breakpoint solo *añade* o *sobreescribe* a partir de ahí — así funciona
el código hoy (`text-3xl sm:text-4xl md:text-6xl` en `hero.tsx`, no al revés).

**Por qué no agregar más breakpoints:** el proyecto ya usa `2xl:` de forma puntual y funcional
(`hero.tsx` tiene un ajuste `2xl:-right-[35%] 2xl:max-w-[900px] 2xl:scale-[1.4]` solo para el
pizza flotante en pantallas ultra anchas). No hace falta un breakpoint "ultra-wide" custom —
`2xl` ya cubre ese caso, y agregar más solo fragmenta el sistema.

---

## 2. Adaptación de la Navbar y Navegación

Implementado en `header.tsx` — es el patrón a mantener:

- **`< lg` (0–1023px):** pills de escritorio ocultas (`hidden`), se muestra el botón hamburguesa
  (`lg:hidden` en el botón). El clic abre `MobileNav` — un popover centrado con `motion`, no un
  drawer lateral de pantalla completa.
- **`≥ lg` (1024px+):** pills visibles (`hidden ... lg:flex`), hamburguesa oculta, botón
  "Reservar" visible como pill dorado independiente (`hidden ... lg:inline-flex`).

**Por qué el corte es en `lg` y no en `md`:** con 6+ enlaces + botón "Reservar", el pill-nav
necesita ~750–850px de ancho horizontal para no comprimirse. A 768px (`md`) ya se ve apretado;
1024px es el primer punto donde hay aire real. Si se agregan más enlaces al nav en el futuro,
**vuelve a medir el ancho real del `<nav>` en 1024px antes de asumir que sigue cabiendo** — es la
causa más común de que un pill-nav se rompa silenciosamente.

**Regla de header flotante:** el header es `fixed` con fondo transparente sobre el Hero.
Cualquier sección que empiece justo debajo del header necesita reservar espacio: en desktop el
header no ocupa flujo normal, así que el contenido bajo él debe tener suficiente
`padding-top`/centrado para no quedar tapado — este fue exactamente el bug que se corrigió en el
Hero mobile (el título quedaba debajo del logo).

---

## 3. Reestructuración del Grid/Layout

Patrón consistente en todo el sitio — **columna única en móvil, grid en desktop, nunca al
revés**:

| Componente | Base (mobile) | Breakpoint de cambio | Desktop |
|---|---|---|---|
| Hero (texto + imagen) | `flex-col` | `md:flex-row` | fila, texto 50% / imagen 50% |
| MenuSection (imagen + tabs) | `grid-cols-1` | `lg:grid-cols-2` | 2 columnas |
| DivaBarSection | `grid-cols-1` | `lg:grid-cols-2` | 2 columnas |
| UbicacionesSection (foto + lista) | `grid-cols-1` | `lg:grid-cols-[0.9fr_1.3fr]` | columnas asimétricas |
| CartaSection (ítems por categoría) | `grid-cols-1` | `md:grid-cols-2` | 2 columnas |
| ContactoSection (info + formulario) | `grid-cols-1` | `lg:grid-cols-2` | 2 columnas |
| Formulario — campos pareados (nombre/email, etc.) | `grid-cols-1` | `sm:grid-cols-2` | 2 columnas |

**Reglas para nuevas secciones:**

1. **El corte por defecto es `lg` (1024px)** para layouts de 2 columnas grandes (imagen+texto,
   formulario+info). Reserva `md` (768px) solo para grids internos más pequeños (como los pares
   de campos del formulario, o las cards de ítems de la carta) donde 2 columnas ya caben
   cómodamente en una tablet vertical.
2. **Nunca fuerces una tabla o grid ancho en móvil** — si tiene más de 1 columna en el diseño
   desktop, la versión base (sin prefijo) siempre es `grid-cols-1`.
3. **Galerías de imágenes**: sigue el patrón de `tradition-wheel.tsx` — en vez de intentar que el
   MISMO layout se comprima, construye una versión mobile-only estructuralmente distinta si el
   desktop depende de posicionamiento absoluto complejo (`hidden md:block` + panel mobile aparte
   `md:hidden`). Es más código, pero evita el bug que ya se dio: overflow horizontal por cards
   posicionadas con matemática de círculo que no cabían en 320px.
4. **Formularios**: campos que son pares lógicos (nombre/email, fecha/hora) van en
   `grid-cols-1 sm:grid-cols-2`; campos únicos (mensaje, selects largos) siempre a ancho
   completo.

---

## 4. Rendimiento y Fluidez

### Imágenes

- **Usa siempre `next/image`.** Dos modos según el caso:
  - **`fill` + contenedor con `relative` y tamaño explícito** (`aspect-*`, o `h-14 w-14` como en
    las miniaturas de `carta-section.tsx`) — para cualquier imagen que deba recortarse dentro de
    un contenedor (`object-cover`). Este modo es inmune a distorsión de aspect-ratio.
  - **`width`/`height` explícitos + `className` con tamaño fijo** (`h-11 w-11`, como el logo del
    header) — **nunca** dejes que `width`/`height` sean los únicos controladores del tamaño
    visual. El reset de Tailwind (`img { height: auto }`) ignora el atributo `height` y usa el
    aspect ratio real del archivo — así fue como el logo del header (archivo 1080×1080 cuadrado)
    terminó renderizando a 140px de alto en vez de 44px y tapando el Hero. **Regla:** si no usas
    `fill`, siempre fija el tamaño final con una clase (`h-X w-X` o `h-X w-auto`), nunca confíes
    solo en las props `width`/`height`.
- **Siempre pasa `sizes`** en imágenes `fill` (`sizes="(min-width: 1024px) 50vw, 100vw"` es el
  patrón ya usado) — sin esto, Next.js sirve la imagen más grande a todos los dispositivos,
  desperdiciando ancho de banda en móvil.
- **`priority` solo en imágenes above-the-fold** (Hero, logo del header) — todo lo demás debe
  cargar lazy por defecto.
- **Comprime antes de subir.** Ya hubo un caso real de una foto de stock sin comprimir con marca
  de agua visible de 450KB+ usada como fondo completo del Hero mobile — revisa siempre el peso
  real del archivo, no solo que "se vea bien".

### Animaciones basadas en JS (Lenis + motion)

Esta es la lección más importante del proyecto, aprendida arreglando bugs reales:

1. **Nunca hagas `setState` dentro de un callback de `useLenis`.** Lenis dispara su callback en
   cada frame de scroll (~60/seg). Si ese callback llama `setState`, se provoca un re-render por
   frame → en el mejor caso lag, en el peor caso el error real que se dio: "Maximum update depth
   exceeded". **Regla:** si el valor cambia continuamente con el scroll (clip-path,
   background-size, rotación), escríbelo directo al DOM vía `ref.current.style.X = ...`, nunca
   vía `useState`. Reserva `setState` solo para valores discretos que cambian pocas veces (como
   el link activo del nav).
2. **`motion`'s `whileInView` con `viewport={{ once: true }}`** para cualquier reveal-on-scroll —
   dispara una vez y se desconecta, no sigue costando ciclos después. Es el patrón usado en
   absolutamente todas las secciones (`DivaBarSection`, `UbicacionesSection`, `CartaSection`). No
   animes elemento-por-elemento en listas largas (la carta tiene ~100 ítems) — anima el bloque de
   categoría completo, no cada fila.
3. **`position: sticky` es CSS puro, no JS** — nunca lo reemplaces por una animación de scroll
   calculada en JS. Y cuidado: `overflow-x: hidden` en cualquier ancestro (incluido
   `html`/`body`) rompe silenciosamente todo `position: sticky` descendiente, porque convierte a
   ese ancestro en "scroll container". Si necesitas evitar overflow horizontal, usa
   `overflow-x: clip` en su lugar — bloquea el overflow sin ese efecto secundario. Este fue un
   bug real que dejó el Hero completamente invisible.
4. **CSS transitions van en un `<div>` envolvente, no directo en el `<img>` de `next/image`** —
   las transiciones aplicadas directamente al elemento que `next/image` renderiza pueden quedar
   "congeladas" por su manejo de lazy-load.
5. **No agregar `prefers-reduced-motion`** — se decidió explícitamente así para mantener
   consistencia visual en toda la carta y demás secciones.

---

## 5. Tipografía

Dos sistemas conviven en el proyecto, cada uno para un caso distinto:

**A) Escala por breakpoints (pasos fijos)** — para títulos que necesitan un tamaño
"mobile-especial" claramente distinto al desktop, no solo más chico:

```
text-3xl sm:text-4xl md:text-6xl   /* Hero H1 */
```

Úsalo cuando el título tiene tratamiento visual diferente por dispositivo (como el "PIZZA" con
contorno dorado que solo existe en mobile).

**B) `clamp()` fluido** — para títulos de sección que solo necesitan escalar proporcionalmente
sin puntos de quiebre visualmente distintos:

```
text-[clamp(2.8rem,6vw,4.5rem)]   /* "Menú" en MenuSection */
text-[clamp(2.8rem,8vw,5.5rem)]   /* "La Carta" */
```

Fórmula: `clamp(mínimo, preferido-en-vw, máximo)`. El mínimo es el tamaño en el móvil más chico
soportado (320px), el máximo es el tope en desktop grande, y el valor en `vw` interpola entre
ambos sin saltos. **Prefiere `clamp()` por defecto** para nuevos títulos de sección — es menos
código y no necesita mantenimiento cuando se agreguen breakpoints intermedios.

**Reglas de cuerpo de texto:**

- Body copy (`font-sans`/Lato) se mantiene en `text-sm`/`text-base` con `sm:text-lg` como
  máximo — nunca uses `clamp()` en párrafos largos, dificulta la lectura por line-length
  variable.
- Los pesos de Lato disponibles son 300/400/700 (`font-light` para body copy,
  `font-bold`/`font-semibold` para kickers y CTAs) — no cargues pesos adicionales sin necesidad,
  cada peso extra de Google Font es un request más.

---

## 6. Flujo de Trabajo Paso a Paso

Proceso a seguir para cada sección nueva o modificada:

1. **Construye mobile-first en el código**, aunque diseñes pensando en desktop primero. Escribe
   las clases base (sin prefijo) para 375px, y ve agregando `sm:`/`md:`/`lg:` para expandir.
2. **Corre `npm run lint`** después de cada cambio — atrapa imports/variables muertas antes de
   que se acumulen (como el cálculo de geometría de un componente removido que quedó sin usar
   tras simplificar el hover del navbar).
3. **Verifica en 3 anchos mínimo, no solo desktop**: 375px (móvil chico, ej. iPhone SE), 768px
   (tablet), 1440px (desktop). Usa el resize del navegador/DevTools, no asumas que "responsive"
   en un tamaño significa responsive en todos.
4. **Mide, no adivines.** Si algo puede estar cortado o desbordado, verifícalo con
   `getBoundingClientRect()` / `document.documentElement.scrollWidth` contra `window.innerWidth`
   — así se encontró cada uno de los bugs reales de este proyecto (overlap de header, overflow
   del wheel de tradición, texto cortado por clip-path). Una captura de pantalla no siempre
   revela overflow sutil; la medición sí.
5. **Corre `npm run build`** antes de dar por cerrado un cambio grande — atrapa errores de
   TypeScript que el dev server con hot-reload a veces no muestra de inmediato.
6. **Revisa que ninguna imagen nueva rompa el patrón `fill`+`sizes` o `className` de tamaño fijo**
   (regla de la sección 4) antes de mergear.
7. **Si tocas algo dentro del `<header>` fijo o agregas contenido justo debajo**, vuelve a
   verificar el clearance contra el header en el móvil más chico soportado — es el punto de falla
   más recurrente del proyecto.
