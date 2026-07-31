import { Hero } from "@/components/sections/hero";
import { EsenciaSection } from "@/components/sections/esencia-section";
import { MenuSection } from "@/components/sections/menu-section";
import { DivaBarSection } from "@/components/sections/diva-bar-section";
import { UbicacionesSection } from "@/components/sections/ubicaciones-section";
import { ContactoSection } from "@/components/sections/contacto-section";

export default function Home() {
  return (
    <>
      <Hero />
      <EsenciaSection />
      <MenuSection />
      <DivaBarSection />
      <UbicacionesSection />
      <ContactoSection />
    </>
  );
}
