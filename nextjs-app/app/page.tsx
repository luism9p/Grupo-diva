import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { EsenciaSection } from "@/components/sections/esencia-section";
import { MenuSection } from "@/components/sections/menu-section";

// Below-the-fold sections: still server-rendered (so content/SEO/LCP aren't
// affected), but split into separate JS chunks that only load once the
// browser needs them — instead of all shipping in the same bundle as the
// Hero. La Carta alone renders ~100 menu items, the single biggest chunk of
// this page's DOM and JS, so it benefits the most.
const CartaSection = dynamic(() =>
  import("@/components/sections/carta-section").then((mod) => mod.CartaSection)
);
const DivaBarSection = dynamic(() =>
  import("@/components/sections/diva-bar-section").then((mod) => mod.DivaBarSection)
);
const UbicacionesSection = dynamic(() =>
  import("@/components/sections/ubicaciones-section").then((mod) => mod.UbicacionesSection)
);
const ContactoSection = dynamic(() =>
  import("@/components/sections/contacto-section").then((mod) => mod.ContactoSection)
);

export default function Home() {
  return (
    <>
      <Hero />
      <EsenciaSection />
      <MenuSection />
      <CartaSection />
      <DivaBarSection />
      <UbicacionesSection />
      <ContactoSection />
    </>
  );
}
