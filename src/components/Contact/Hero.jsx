import { MdLocationPin } from "@/icons/index";
import content from "@/content/contact.json";
import { Heading } from "@/shared/Heading";
import { Button } from "../ui/Button";
import { Icon } from "../Stateless/Icon";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="pt-28 bg-no-repeat bg-top"
      style={{ backgroundImage: `url('${content.hero["bg-img"]}')` }}
    >
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Heading
            as="h1"
            title={
              <>
                {content.hero.title.one}{" "}
                <span className="font-extrabold text-primary">
                  {content.hero.title.two}
                </span>{" "}
                <br />
                {content.hero.title.three}
              </>
            }
            desc={content.hero.desc}
            className="space-y-4"
            classNameTitle="heading-1 font-normal"
          />
          <div className="flex flex-col mt-auto">
            <span className="flex items-center text-lg-bold">
              <MdLocationPin className="size-5" /> {content.hero.location.title}
            </span>
            <p className="text-md-medium text-text">
              {content.hero.location.desc.one} <br /> {content.hero.location.desc.two}
            </p>
          </div>
        </div>

        <div className="grid gap-5 w-full mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {content.hero.cards.map((item) => {
            return (
              <div
                key={item.title}
                className="flex flex-col gap-5 p-5 border border-border rounded-lg"
              >
                <Button
                  as="div"
                  isIconOnly
                  radius="smooth"
                  variant="outline"
                  hover="outline"
                  className="border-black"
                >
                  <Icon name={item.icon} className="text-black size-6" />
                </Button>
                <div className="space-y-2">
                  <span className="text-lg-bold">{item.title}</span>
                  <p className="font-medium text-text">{item.desc}</p>
                </div>
                {
                    item.method.url ? <Link href={item.method.url} className="link text-sm-bold w-fit mt-auto whitespace-nowrap" >
                    {item.method.info}
                  </Link> : <span className="text-sm-bold mt-auto whitespace-nowrap">{item.method.info}</span>
                }
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
