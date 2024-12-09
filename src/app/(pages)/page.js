"use client"

import { SearchBar } from "@/components/SearchBar/SearchBar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}

function Hero() {
  return (
    <section>

      <div className="relative pt-[100px] pb-[190px] text-white bg-[url('/banner.webp')] bg-cover bg-no-repeat bg-center">

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />

        <div className="container relative z-10 flex flex-col items-center gap-5 text-center">

          <div className="flex items-center justify-center">
            <span className="flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-primary">
              <Image src="earth.svg" width={25} height={25} alt="earth" />
              Explore Nosara
            </span>
          </div>

          <h1 className="heading-1">Your Gateway to Adventures in Nosara</h1>
          <p className="heading-6 heading-6-medium">
            We offer vacation rentals, tours, shuttles, and a variety of
            rentals, <br className="d-none d-md-block" /> including ATVs, golf
            carts, and cars in Nosara
          </p>
          
        </div>

      </div>

      <div className="container">
      <SearchBar />
      </div>

    </section>
  );
}