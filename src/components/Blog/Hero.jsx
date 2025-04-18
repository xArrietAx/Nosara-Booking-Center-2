import { getCategories } from "@/utils/blog/getCategories";
import { HeroCarousel } from "./HeroCarrousel";
import content from "@/content/blog.json";

export async function Hero() {

 const categories = await getCategories()

  return (
    <section className="pt-12">
      <div className="container">
        <div className="flex flex-col justify-between gap-12 pb-20 border-b-4 border-border lg:flex-row lg:gap-6">
          <div className="lg:w-1/2">
            <h1 className="text-86-bold break-words">
              {content.hero.title.one}
            <span className="block text-64-medium">{content.hero.title.two}</span>
            </h1>
            <p className="heading-6 text-text">{content.hero.desc}</p>
          </div>
          <div className="mt-5 lg:w-1/2">
            <HeroCarousel categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
