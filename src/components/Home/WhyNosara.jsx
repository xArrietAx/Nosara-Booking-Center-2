import { BtnInfo } from "../Stateless/BtnInfo";
import content from "@/content/home.json";
import { Heading } from "@/components/Stateless/Heading";
import Image from "next/image";

export function WhyNosara() {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center gap-20 lg:flex-row lg:gap-6">
          
          <div className="flex-1">
            
            <BtnInfo img={content.whyNosara.btnInfo.img} >{content.whyNosara.btnInfo.text}</BtnInfo>

            <Heading as="h4" title={content.whyNosara.title} classNameTitle="heading-2 my-4"  desc={content.whyNosara.desc} classNameDesc="mb-8 !text-black" />

            <div className="flex flex-wrap items-center gap-5">
              {content.whyNosara.statistics.map((item) => {
                return (
                  <div className="flex flex-1 flex-col" key={item.quantity}>
                    <h3 className="heading-3">{item.quantity}</h3>
                    <p className="text-lg-bold text-text">
                      {item.desc.one} <br /> {item.desc.two}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <ul className="grid flex-1 gap-6 w-full sm:grid-cols-2">
            {content.whyNosara.cards.map((item, i) => {

              const styles = {
                "0":"bg-red-500/10", 
                "1":"bg-green-500/10 sm:-mt-8 sm:mb-8", 
                "2":"bg-blue-500/10", 
                "3":"bg-yellow-500/10 sm:-mt-8 sm:mb-8"
              }

              return <li key={item.title} className={`p-7 border border-border rounded-2xl text-center ${styles[i]}`}>
              <div className="w-14 h-14 border border-border rounded-full mx-auto mb-3 overflow-hidden shadow-xl">
                <Image src={item.img} width={300} height={300} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl-bold inline-block mb-2">
                {item.title}
              </span>
              <p className="text-lg-medium text-text">
              {item.desc}
              </p>
            </li>
            })}
          </ul>

        </div>
      </div>
    </section>
  );
}