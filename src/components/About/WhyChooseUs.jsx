import content from "@/content/about.json";
import Image from "next/image";
import { BtnInfo } from "../Stateless/BtnInfo";
import { Heading } from "../Stateless/Heading";
import { VideoModal } from "./VideoModal";

export function WhyChooseUs({ Tag = "h5" }) {
  return (
    <section
      className="section-space relative py-24 bg-no-repeat bg-bottom bg-contain"
      style={{ backgroundImage: `url('${content.whyChooseUs.bgImg}')` }}
    >
      <Image
        src={content.whyChooseUs.bgPlane}
        alt=""
        width={200}
        height={200}
        className="absolute top-0 right-20 w-[450px] h-[120px]"
      />
      <div className="container">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-6">
          <ul className="grid flex-1 gap-6 w-full sm:grid-cols-2">
            {content.whyChooseUs.images.map((item, i) => {
              const styles = {
                0: "sm:-mt-8 sm:mb-8",
                1: "",
                2: "sm:-mt-8 sm:mb-8",
                3: "",
              };

              return (
                <li
                  key={item}
                  className={`relative h-0 p-[50%] rounded-2xl overflow-hidden ${styles[i]}`}
                >
                  <Image
                    src={item}
                    alt=""
                    width={600}
                    height={600}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  {i === 0 && <VideoModal />}
                </li>
              );
            })}
          </ul>

          <div className="flex-1 pt-6 pl-6">
            <BtnInfo variant="secondary" img={content.whyChooseUs.btnInfo.img}>
              {content.whyChooseUs.btnInfo.text}
            </BtnInfo>
            <Heading
              as={Tag}
              title={content.whyChooseUs.title}
              classNameTitle="heading-2 my-4"
              desc={content.whyChooseUs.desc}
              classNameDesc="mb-8 !text-black"
            />

            <ul className="flex flex-col gap-6">
              {content.whyChooseUs.benefits.map((item, i) => {
                return (
                  <li key={i} className="flex gap-3">
                    <i className="icon-[game-icons--check-mark] text-green-500 size-8" />
                    <div className="space-y-2">
                      <h3 className="text-xl-bold">{item.title}</h3>
                      <p className="text-md-medium text-text">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
