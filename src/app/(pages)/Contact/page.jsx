import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Contact/Hero";
import { GetInTouch } from "@/components/Contact/GetInTouch";
import { Faqs } from "@/components/Contact/Faqs";
import metadataContact from "@/SEO/contact";

export const metadata = metadataContact 

export default function Contact() {
  return (
    <main>
      <Breadcrumb />
      <Hero />
      <GetInTouch />
      <Faqs />
    </main>
  );
}
