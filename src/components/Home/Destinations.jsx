import { DestinationCard } from "../ui/Cards/DestinationCard";
import { Heading } from "@/shared/Heading";
import content from "@/content/home.json";

export function Destinations() {
  return (
    <section className="mt-10">
      <div className="container">
        <Heading as="h2" title={content.destinations.title} desc={content.destinations.desc} className="text-center" classNameTitle="heading-2" />

        <ul className="grid gap-5 mt-7 sm:grid-cols-2 lg:grid-cols-4">
          {content.destinations.cards.map(item => {
            return (
              <li key={item.name}>
                <DestinationCard data={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}