import { SmallCard } from "../ui/Cards/SmallCard";
import { Heading } from "@/components/Stateless/Heading";
import content from "@/content/home.json";

export function Destinations() {
  return (
    <section className="mt-10">
      <div className="container">
        <Heading as="h2" title={content.destinations.title} desc={content.destinations.desc} className="text-center" classNameTitle="heading-2" />

        <ul className="grid gap-6 mt-7 sm:grid-cols-2 lg:grid-cols-4">
          {content.destinations.cards.map(item => {
            return (
              <li key={item.name}>
                <SmallCard data={{icon: "HiOutlineClock", ...item}} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}