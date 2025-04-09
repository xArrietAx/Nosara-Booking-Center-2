import content from "@/content/vacationRentals.json";
import { SearchBar } from "@/components/VacationRentals/SearchBar";

export function Hero() {
  return (
    <section>
      <div className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/50 bg-[url(/vacationRentals/banner.webp)] bg-cover bg-center bg-no-repeat relative py-32">

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