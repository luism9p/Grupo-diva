import type { ComponentType, SVGProps } from "react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const MasaIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M2 22 22 2" />
    <path d="M3.47 11.53c.27 1.05-.05 2.14-.85 2.87-1.14 1.04-2.84 1.11-3.6.14.77-.97.77-2.73 0-3.69-.76-.97-2.46-.9-3.6.14-.8.73-1.12 1.82-.85 2.87" />
    <path d="M11.53 3.47c1.05.27 2.14-.05 2.87-.85 1.04-1.14 1.11-2.84.14-3.6-.97.77-2.73.77-3.69 0-.97-.76-.9-2.46.14-3.6.73-.8 1.82-1.12 2.87-.85" />
  </svg>
);

const HornoIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const IngredientesIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589c-.26 0-.51.051-.74.144A5.5 5.5 0 0 0 5.253 9.444 4 4 0 0 0 4 17c0 1.104.896 2 2 2h11Z" />
    <path d="M12 21v-4" />
    <path d="M7 21v-4" />
  </svg>
);

const PastasIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
    <path d="M15 15 3.3 21.3a2.1 2.1 0 0 1-3-3L6 7" />
    <path d="m20.7 3.3-3.9 3.9" />
    <path d="m3.3 20.7 3.9-3.9" />
  </svg>
);

const CarnesIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const CocktailIcon: IconComponent = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M8 22h8" />
    <path d="M12 15v7" />
    <path d="M19 3l-7 12-7-12Z" />
  </svg>
);

export interface TraditionPillar {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: IconComponent;
  relatedIds: number[];
  image: string;
}

export const traditionPillars: TraditionPillar[] = [
  {
    id: 1,
    title: "Masa Madre",
    subtitle: "El secreto de nuestra pizza",
    description:
      "Fermentada lentamente durante 48 horas, nuestra masa es ligera, digestible y llena de sabor. La base perfecta.",
    icon: MasaIcon,
    relatedIds: [2, 3],
    image: "/Masa.png",
  },
  {
    id: 2,
    title: "Horno de Leña",
    subtitle: "Fuego que acaricia",
    description:
      "Alcanzamos los 450°C con leña de olivo para un horneado rápido que sella los aromas y crea bordes perfectos.",
    icon: HornoIcon,
    relatedIds: [1, 4],
    image: "/Horno.png",
  },
  {
    id: 3,
    title: "Ingredientes Selectos",
    subtitle: "Del campo a la mesa",
    description:
      "Tomates San Marzano DOP, mozzarella fior di latte fresca, albahaca recién cortada. Solo lo mejor.",
    icon: IngredientesIcon,
    relatedIds: [1, 5],
    image: "/Ingredientes.png",
  },
  {
    id: 4,
    title: "Pastas Artesanales",
    subtitle: "Tradición en cada hebra",
    description:
      "Elaboramos nuestra pasta fresca cada día con sémola de trigo duro y huevos de corral. Textura y sabor inconfundibles.",
    icon: PastasIcon,
    relatedIds: [2, 5],
    image: "/pastas.png",
  },
  {
    id: 5,
    title: "Carnes Premium",
    subtitle: "Cortes de primera",
    description:
      "Selección de carnes maduradas a la parrilla, preparadas con hierbas italianas y servidas en su punto justo.",
    icon: CarnesIcon,
    relatedIds: [4, 6],
    image: "/Carnes.png",
  },
  {
    id: 6,
    title: "Coctelería de Autor",
    subtitle: "Gin & Tonics únicos",
    description:
      "Nuestro Diva Bar ofrece combinaciones exclusivas con botánicos premium, maridando con la experiencia italiana.",
    icon: CocktailIcon,
    relatedIds: [5],
    image: "/Cocteleria.png",
  },
];
