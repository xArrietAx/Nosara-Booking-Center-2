import content from "@/content/not-found.json";
import { Button } from "../ui/Button";
import Link from "next/link";

export function Grid() {
    return <section className="mt-24">
    <div className="container">
      <div className="grid gap-5 w-full mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {content.hero.cards.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-5 p-5 border border-border rounded-lg" >
              <Button
                as="div"
                isIconOnly="lg"
                radius="smooth"
                variant="outline"
                hover="outline"
                className="!border-black"
              >
                <i className={`${item.icon} size-6`} />
              </Button>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg-bold">{item.title}</h2>
                <p className="font-medium text-text">{item.desc}</p>
              </div>
              <Link href={item.url} className="link flex items-center gap-2 w-fit mt-auto font-bold" >
                Details <i className="icon-[ion--arrow-forward] size-5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
}