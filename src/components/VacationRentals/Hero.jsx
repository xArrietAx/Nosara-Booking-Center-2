import content from "@/content/vacationRentals.json";
import { SearchBar } from "@/components/VacationRentals/SearchBar";

export function Hero() {
  return (
    <section>
      <div className="vacationRentals_banner relative py-32 bg-cover bg-no-repeat bg-center">

        <div className="container relative z-10 flex flex-col items-center gap-14">
          <div className="text-white text-center">
            <h1 className="heading-3">{content.hero.title}</h1>
            <p className="heading-6 heading-6-medium">{content.hero.desc}</p>
          </div>
          <SearchBar />
        </div>
      </div>
    </section>
  );
}