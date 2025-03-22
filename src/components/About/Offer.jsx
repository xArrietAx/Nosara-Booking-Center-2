import { Heading } from "@/components/Stateless/Heading";
import content from "@/content/about.json";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { BtnInfo } from "../Stateless/BtnInfo";

export function Offer() {
  return (
    <section className="py-[5.7rem] bg-sectionBg">
      <div className="container">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="flex-1">
            <BtnInfo img={content.offer.btnInfo.img} className="mb-4" >{content.offer.btnInfo.text}</BtnInfo>
          <Heading
            as="h2"
            title={content.offer.title}
            desc={content.offer.desc}
            classNameTitle="heading-2"
          />
          </div>
          <div className="flex flex-1 flex-col gap-3 lg:items-end">
            <p className="text-lg-bold">{content.offer.help.text}</p>
            <Link  href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank" className="flex items-center gap-2">
            <i className="icon-[famicons--logo-whatsapp] size-8" />
            <span className="heading-6">{content.offer.help.phone}</span>
            </Link>
          </div>
        </div>

        <div className="grid gap-12 mt-20 md:grid-cols-2 lg:grid-cols-4">
          {content.offer.cards.map((item) => {
            return (
              <div key={item.title} className="flex flex-col gap-5">
                <div className="flex items-center justify-center w-16 h-16 p-3 rounded-xl bg-white shadow-xl">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <h3 className="text-xl-bold">{item.title}</h3>
                  <p className="text-sm-medium text-text">{item.desc}</p>
                  <Link
                    href={item.url}
                    className="link text-sm-medium flex items-center gap-2 w-fit mt-auto"
                  >
                    {item.info} <i className="icon-[ion--arrow-forward] size-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
