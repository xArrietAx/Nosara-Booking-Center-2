import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { WhyChooseUs } from "@/components/About/WhyChooseUs";
import { Offer } from "@/components/About/Offer";
import { Video } from "@/components/About/Video";
import { Hero } from "@/components/About/Hero";
import { Blog } from "@/components/Home/Blog";
import metadataAbout from "@/SEO/about";

export const metadata = metadataAbout

export default function About() {
  return (
    <main>
      <Breadcrumb />
      <Hero />
      <Video />
      <Offer />
      <WhyChooseUs Tag="h2" />
      <Blog Tag="h2" />
    </main>
  );
}