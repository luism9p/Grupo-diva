export interface CartaItem {
  nombre: string;
  precio: number;
  imagen?: string;
}

export interface CartaCategoria {
  slug: string;
  categoria: string;
  imagenCategoria?: string;
  items: CartaItem[];
  extras?: CartaItem[];
}

export const carta: CartaCategoria[] = [
  {
    slug: "pizzas",
    categoria: "Pizzas",
    imagenCategoria: "/pizza3.jpg",
    items: [
      { nombre: "Neapolitan", precio: 8.5 },
      { nombre: "Margherita", precio: 9.5 },
      { nombre: "Hawaiian", precio: 13.5 },
      { nombre: "BBQ", precio: 13.5 },
      { nombre: "Alameda", precio: 15.5 },
      {
        nombre: "Buffaline",
        precio: 14.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.PIZZA.Woblo.webp",
      },
      { nombre: "Salsiccia and Friarelli", precio: 13.5 },
      { nombre: "Capricciosa", precio: 13.5 },
      { nombre: "Parmigiana", precio: 13.5 },
      { nombre: "Danny", precio: 13.5 },
      { nombre: "Pugliese", precio: 15.5 },
      { nombre: "Four Cheeses", precio: 12.5 },
      { nombre: "Diva", precio: 13.5 },
      { nombre: "Diavola", precio: 12.5 },
      { nombre: "Ortolana", precio: 13.5 },
      { nombre: "Marinara", precio: 8.5 },
      { nombre: "Bolognese", precio: 13.5 },
      { nombre: "Carbonara", precio: 13.5 },
      { nombre: "Caesar", precio: 13.5 },
      { nombre: "Porchetta", precio: 15.5 },
      { nombre: "Mortadella", precio: 14.5 },
      { nombre: "York Ham", precio: 12.5 },
      { nombre: "Tuna and Onion", precio: 12.5 },
      { nombre: "Meat Lover's", precio: 17.5 },
      { nombre: "Salmon", precio: 14.5 },
    ],
    extras: [
      { nombre: "Ingrediente extra", precio: 3.0 },
      { nombre: "Ingrediente extra de burrata", precio: 5.0 },
    ],
  },
  {
    slug: "focaccia",
    categoria: "Focaccia",
    items: [
      { nombre: "Focaccia", precio: 4.5 },
      { nombre: "Special Focaccia", precio: 8.5 },
    ],
  },
  {
    slug: "saltimbocca",
    categoria: "Saltimbocca",
    items: [
      { nombre: "York Ham", precio: 12.5 },
      { nombre: "Diva", precio: 13.5 },
      { nombre: "Salsiccia and Friarelli", precio: 13.5 },
      { nombre: "Danny", precio: 13.5 },
      { nombre: "Porchetta", precio: 15.5 },
      { nombre: "Mortadella", precio: 14.5 },
    ],
  },
  {
    slug: "calzone",
    categoria: "Calzone",
    items: [
      { nombre: "Margherita", precio: 9.5 },
      { nombre: "Diavola", precio: 12.5 },
      { nombre: "York and Mushrooms", precio: 12.5 },
    ],
  },
  {
    slug: "pizza-frita",
    categoria: "Pizza Frita",
    items: [
      { nombre: "Margherita", precio: 13.5 },
      { nombre: "Ricotta and Salami", precio: 15.5 },
      { nombre: "Ricotta and York", precio: 15.5 },
    ],
  },
  {
    slug: "entrantes",
    categoria: "Entrantes",
    items: [
      { nombre: "Diva Salad", precio: 9.5 },
      { nombre: "Caesar Salad", precio: 9.5 },
      { nombre: "Alameda Salad", precio: 10.5 },
      { nombre: "Burrata Salad", precio: 15.5 },
      {
        nombre: "Caprese Salad",
        precio: 10.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.ENTRADA.Woblo.webp",
      },
      { nombre: "Grilled Vegetables", precio: 10.5 },
      { nombre: "Italian Frying", precio: 8.5 },
      { nombre: "Eggplant Parmigian", precio: 9.5 },
      { nombre: "Shrimp Scampi", precio: 10.5 },
      { nombre: "Hit the Sugo", precio: 12.5 },
      { nombre: "Bruschetta di Bread", precio: 2.0 },
      { nombre: "Toast Bread with Aioli", precio: 5.5 },
      { nombre: "Ham Croquettes, 6 unidades", precio: 8.5 },
      { nombre: "Chips", precio: 4.5 },
      { nombre: "Spicy Potatoes", precio: 6.5 },
      { nombre: "Smoked Provolone", precio: 12.5 },
    ],
  },
  {
    slug: "tablas",
    categoria: "Tablas",
    items: [
      { nombre: "Tabla variada de quesos Mediana", precio: 9.5 },
      { nombre: "Tabla variada de quesos Grande", precio: 17.5 },
      { nombre: "Tabla variada de embutidos italianos Mediana", precio: 14.5 },
      { nombre: "Tabla variada de embutidos italianos Grande", precio: 20.5 },
    ],
  },
  {
    slug: "pokebowls",
    categoria: "Pokebowls",
    items: [
      { nombre: "Poke Bowl de salmón", precio: 13.5 },
      { nombre: "Poke Bowl de pollo", precio: 13.5 },
      { nombre: "Poke Bowl vegano", precio: 13.5 },
    ],
  },
  {
    slug: "pastas",
    categoria: "Pastas",
    items: [
      {
        nombre: "Spaghetti Bolognese",
        precio: 12.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.PASTA.Woblo.webp",
      },
      { nombre: "Carbonara Spaghetti", precio: 12.5 },
      { nombre: "Lasagna", precio: 14.5 },
      { nombre: "Gnocchi a la Sorrentina", precio: 13.5 },
      { nombre: "Penne Arrabbiata", precio: 11.5 },
      { nombre: "Fusilli Italian Style", precio: 15.5 },
      { nombre: "Spaghetti with Polpette", precio: 14.5 },
      { nombre: "Tagliatelle with Genovese Pesto", precio: 13.5 },
      { nombre: "Tagliatelle with Salmon and Mushrooms", precio: 14.5 },
      {
        nombre: "Spaghetti Frutti di Mare",
        precio: 18.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.197002093_1907262782762557_1190531032350242909_n.Woblo.webp",
      },
      {
        nombre: "Lobster Spaghetti",
        precio: 30.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.185105890_1887722988049870_1884942610458433702_n.Woblo.webp",
      },
      { nombre: "4 Cheese Ravioli", precio: 15.5 },
    ],
  },
  {
    slug: "carnes",
    categoria: "Carnes",
    items: [
      { nombre: "T-Bone, 600 g", precio: 27.5 },
      { nombre: "Entrecot, 300 g", precio: 22.5 },
      { nombre: "Beef Tenderloin, 250 g", precio: 26.5 },
      { nombre: "Pork Loin, 200 g", precio: 18.5 },
      { nombre: "Pork Rib", precio: 22.5, imagen: "/carnes-menu.jpg" },
      { nombre: "Chicken Milanese", precio: 11.5 },
      { nombre: "Blue Cord", precio: 12.5 },
      { nombre: "Lemon Chicken Escalopine", precio: 11.5 },
      { nombre: "Grilled Meat", precio: 25.5 },
    ],
    extras: [{ nombre: "Suplemento de salsa", precio: 2.0 }],
  },
  {
    slug: "hamburguesas",
    categoria: "Hamburguesas",
    items: [
      { nombre: "Diva Burger", precio: 12.5 },
      { nombre: "Classic Burger", precio: 10.0 },
      {
        nombre: "BBQ Burger",
        precio: 11.5,
        imagen:
          "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.180100270_1880689585419877_96317728661841349_n.Woblo.webp",
      },
      { nombre: "Special Burger", precio: 14.5 },
      { nombre: "Krispy Chicken Burger", precio: 11.5 },
    ],
  },
  {
    slug: "pescados-y-mariscos",
    categoria: "Pescados y Mariscos",
    items: [
      { nombre: "Grilled Sardines", precio: 10.5 },
      { nombre: "Bay Fry", precio: 15.5 },
      { nombre: "Choppies", precio: 10.5 },
      { nombre: "Roman-Style Calamari", precio: 11.5 },
      { nombre: "Fried Anchovies", precio: 10.5 },
      { nombre: "Grilled Salmon with Potatoes or Salad", precio: 15.5 },
      { nombre: "Fish & Chips", precio: 15.5 },
      { nombre: "Steamed Mussels", precio: 10.5 },
      { nombre: "Seafood Grill para 2 personas", precio: 45.0 },
      { nombre: "Amalfi Octopus", precio: 14.5 },
    ],
  },
  {
    slug: "postres",
    categoria: "Postres",
    items: [
      { nombre: "Tiramisú", precio: 5.0 },
      { nombre: "Sicilian Cannolo", precio: 5.0 },
      { nombre: "Chocolate Coulant", precio: 5.0 },
      { nombre: "Neapolitan Baba with Rum", precio: 5.0 },
      { nombre: "Vanilla Ice Cream", precio: 5.0 },
      {
        nombre: "Chocolate Ice Cream",
        precio: 5.0,
        imagen: "/diva-benidorm-restaurante-pizzer-a-bar-y-eventos-de-lujo.image.0f014b0d9288.Woblo.webp",
      },
      { nombre: "Strawberry Ice Cream", precio: 5.0 },
      { nombre: "Cake of the Day", precio: 5.0 },
      { nombre: "Nutella Pizza", precio: 9.5 },
      { nombre: "Waffle", precio: 8.5, imagen: "/local3.jpg" },
    ],
  },
];

export function formatPrecio(precio: number): string {
  return `${precio.toFixed(2).replace(".", ",")} €`;
}
