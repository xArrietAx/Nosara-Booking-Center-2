import content from "@/content/about.json";
import { Heading } from "@/components/Stateless/Heading";
import { BtnInfo } from "../Stateless/BtnInfo";
import Image from "next/image";

export function Hero() {
  return (
    <section className="pt-12 pb-20 bg-no-repeat bg-top">
      <div className="container">
        <div className="flex flex-wrap items-end gap-6">

          <div className="lg:w-3/5">
            <BtnInfo variant="primary" className="w-fit mb-4" img={content.hero.btnInfo.img}>
              {content.hero.btnInfo.text}
            </BtnInfo>
            <Heading
              as="h1"
              title={
                <>
                  {content.hero.title.one}
                  <span className="font-normal"> {content.hero.title.two}</span> <br />
                  <span className="font-normal"> {content.hero.title.three} </span>
                   {content.hero.title.four}
                </>
              }
              desc={content.hero.desc}
              className="space-y-4"
              classNameTitle="heading-1 "
            />
          </div>

          <div className="flex-1">
            <Image src={content.hero['bg-img']} alt="" width={264} height={140} className="mb-5 -ml-5" />
            <p className="heading-6 min-[480px]:w-2/3 min-[480px]:ml-auto lg:w-full lg:ml-0">{content.hero.mission}</p>
          </div>

        </div>
      </div>
    </section>
  );
}