import { Icon } from "@/components/Stateless/Icon";
import { HiArrowNarrowLeft } from "@/icons/index";
import content from "@/content/not-found.json";
import { Heading } from "@/components/Stateless/Heading";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function notFound() {
  return (
    <section className="mt-24">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src={content.hero.img}
            width={378}
            height={276}
            alt="Nosara Booking Center"
            priority
          />
          <Heading
            as="h1"
            title={
              <>
                {content.hero.title.one}{" "}
                <span className="font-extrabold text-primary">
                  {content.hero.title.two}
                </span>{" "}
                {content.hero.title.three}
              </>
            }
            desc={content.hero.desc}
            classNameTitle="heading-1 font-medium text-primary/70"
            className="text-center"
          />
          <div className="flex items-center gap-3 mt-10 font-semibold">
            <Button as={Link} href="/" size="lg" radius="smooth">
              <HiArrowNarrowLeft className="size-6" />
              {content.hero.btns.one}
            </Button>
            <Button
              as={Link}
              href="/Contact"
              variant="ghost"
              size="lg" radius="smooth"
            >
              {content.hero.btns.two}
            </Button>
          </div>

          <div className="grid gap-5 w-full mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {content.hero.cards.map((item) => {
              return (
                <div
                  key={item.title}
                  className="flex flex-col gap-5 p-5 border border-border rounded-lg"
                >
                  <Button as="div" isIconOnly radius="smooth" variant="outline" hover="outline" className="!border-black">
                    <Icon name={item.icon} className="text-black size-6" />
                  </Button>
                  <div className="space-y-2">
                    <span className="text-lg-bold">{item.title}</span>
                    <p className="font-medium text-text">{item.desc}</p>
                  </div>
                  <Link href={item.url} className="link flex items-center gap-5 w-fit mt-auto font-bold" >
                    Details <HiArrowNarrowLeft className="size-6 rotate-180" />{" "}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
