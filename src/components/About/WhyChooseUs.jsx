import { WhyChooseUsCarousel } from "./WhyChooseUsCarousel";
import { GiCheckMark } from "@/icons/index";
import content from "@/content/about.json";
import Image from "next/image";
import { BtnInfo } from "../Stateless/BtnInfo";

export function WhyChooseUs() {
  return (
    <section
      className="py-24 bg-no-repeat bg-bottom"
      style={{ backgroundImage: `url(${content.whyChooseUs["bg-img"]})` }}
    >
      <div className="container">
        <div className="flex flex-wrap items-center gap-20 lg:gap-5">

          <div className="grid grid-cols-2 gap-6 w-full lg:flex-1 lg:w-1/2">
            {content.whyChooseUs.images.map((item, index) => {
              const marginClass = index % 2 === 0 ? "-mt-12 mb-14" : "mb-1";
              return (
                <div key={index} className={`rounded-md overflow-hidden ${marginClass}`} >
                  <Image src={item} alt="" width={564} height={550} className="w-full h-full object-cover"/>
                </div>
              );
            })}
          </div>

          <div className="w-full mb-7 lg:flex-1 lg:w-1/2 lg:pl-5 lg:pt-8">
            <BtnInfo size="md" variant="secondary" className="text-sm mb-2.5">
              {content.whyChooseUs.btnInfo}
            </BtnInfo>
            <h6 className="heading-2 mb-6">{content.whyChooseUs.title}</h6>
            <p className="mb-6 text-xl-medium">{content.whyChooseUs.desc}</p>
            <ul className="grid gap-3 min-[468px]:grid-cols-2">
              {content.whyChooseUs.benefits.map((item) => {
                return (
                  <li key={item} className="flex items-center gap-2 font-normal text-lg" >
                    <GiCheckMark className="text-green-500 size-5" /> {item}
                  </li>
                );
              })}
            </ul>
            <div className="max-w-[475px] mt-10">
              <span className="inline-block my-2 text-sm-bold">
              {content.whyChooseUs.awaits}
              </span>
              <WhyChooseUsCarousel data={content.whyChooseUs.carousel} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
