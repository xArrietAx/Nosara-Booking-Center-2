import { Hero } from "@/components/About/Hero";
import { Offer } from "@/components/About/Offer";
import { Video } from "@/components/About/Video";
import { Blog } from "@/components/Home/Blog";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";

export default function About() {
  return (
    <main>
      <Breadcrumb />
      <Hero />
      <Video />
      <Offer />
      <WhyChooseUs />
      <Blog />
    </main>
  );
}