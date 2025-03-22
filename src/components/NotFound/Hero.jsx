import { Heading } from "../Stateless/Heading";
import content from "@/content/not-found.json";
import { Button } from "../ui/Button";
import { BtnBack } from "./BtnBack";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return ( 
  <section className="mt-28">
<div className="container">
  <div className="flex flex-col items-center justify-center gap-5">
    <Image src={content.hero.img} width={378} height={276} alt="Nosara Booking Center" priority />
    <Heading as="h1" title={
        <>
          {content.hero.title.one}{" "}
          <span className="font-extrabold text-primary">
            {content.hero.title.two}
          </span>{" "}
          {content.hero.title.three}
        </>
      } desc={content.hero.desc} classNameTitle="heading-1 !font-normal" className="text-center" />

    <div className="flex items-center gap-3 mt-10 font-semibold">
     <BtnBack />
      <Button
        as={Link}
        href="/Contact"
        variant="ghost"
        size="lg" radius="smooth"
      >
        {content.hero.btns.two}
      </Button>
    </div>
  </div>
</div>
</section>
  );
}
