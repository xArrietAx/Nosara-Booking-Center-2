import { Destinations } from "@/components/Home/Destinations";
import { WhyNosara } from "@/components/Home/WhyNosara";
import { Stays } from "@/components/Home/Stays";
import { Hero } from "@/components/Home/Hero";
import { Blog } from "@/components/Home/Blog";
import { Tours } from "@/components/Home/Tours";
import { WhyChooseUs } from "@/components/About/WhyChooseUs";

export default function Home({ searchParams }) {
  return (
    <main>
      <Hero />
      <Destinations />
      <Stays />
      <WhyNosara />
      <Tours searchParams={searchParams} />
      <WhyChooseUs />
      <Blog /> 
    </main>
  )
}