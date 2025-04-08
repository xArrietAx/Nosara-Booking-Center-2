import Image from "next/image";
import content from "@/content/shuttles.json";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section>
      <div className="relative py-32 bg-cover bg-no-repeat bg-center">
        <Image
          src={content.hero.bgImg}
          alt=""
          width={1200}
          height={1200}
          priority
          className="absolute top-0 left-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

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