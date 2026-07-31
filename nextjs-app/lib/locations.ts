export interface Location {
  id: string;
  name: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  phone: string;
  phoneHref: string;
  hours: string;
  openingHours: string;
  image: string;
}

export const locations: Location[] = [
  {
    id: "diva-8",
    name: "Diva 8",
    street: "Calle Gerona",
    streetNumber: "8",
    postalCode: "03503",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local.jpeg",
  },
  {
    id: "casa-diva",
    name: "Casa Diva",
    street: "Calle Tomás Ortuño",
    streetNumber: "56",
    postalCode: "03501",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local1.jpg",
  },
  {
    id: "diva-club",
    name: "Diva Club",
    street: "Avda. del Mediterráneo",
    streetNumber: "19",
    postalCode: "03503",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local2.jpg",
  },
  {
    id: "pizzeria-diva",
    name: "Pizzería Diva",
    street: "Plaza de la Creu Alameda",
    streetNumber: "13",
    postalCode: "03502",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local3.jpg",
  },
  {
    id: "diva-15",
    name: "Diva 15",
    street: "Calle Gerona",
    streetNumber: "15",
    postalCode: "03503",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local.jpeg",
  },
  {
    id: "diva-13",
    name: "Diva 13",
    street: "Plaza de la Creu Alameda",
    streetNumber: "13",
    postalCode: "03502",
    city: "Benidorm",
    phone: "650 904 402",
    phoneHref: "+34650904402",
    hours: "12:00 – 00:00",
    openingHours: "Mo-Su 12:00-00:00",
    image: "/local3.jpg",
  },
];

export function formatAddress(location: Location) {
  return `${location.street} ${location.streetNumber}, ${location.postalCode} ${location.city}`;
}
