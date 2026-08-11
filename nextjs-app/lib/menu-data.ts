export interface MenuTab {
  id: string;
  title: string;
  description: string;
  image: string;
}

/**
 * The original static site mismatched these image filenames against their
 * tab labels (e.g. the "Pastas" tab showed the carnes photo). Corrected here
 * so each tab shows its own dish.
 */
export const menuTabs: MenuTab[] = [
  {
    id: "pizzas",
    title: "Pizzas",
    description:
      "Deléitate con nuestras pizzas artesanales, masa fresca, ingredientes de calidad y el auténtico sabor italiano.",
    image: "/pizza.jpg",
  },
  {
    id: "pastas",
    title: "Pastas",
    description:
      "Pastas frescas elaboradas con pasión y recetas tradicionales italianas. Sabor auténtico en cada plato.",
    image: "/pastas-menu.jpg",
  },
  {
    id: "carnes",
    title: "Carnes",
    description:
      "Selección de carnes a la parrilla y platos tradicionales italianos con ingredientes de primera calidad.",
    image: "/carnes-menu.jpg",
  },
  {
    id: "gin-tonics",
    title: "Gin & Tonics",
    description:
      "Selección exclusiva de Gin & Tonics premium, preparados con pasión y creatividad. Una experiencia sofisticada.",
    image: "/gin-tonics-menu.jpg",
  },
];
