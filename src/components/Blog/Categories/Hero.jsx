import { MediumCard } from "@/components/ui/Cards/MediumCard";
import { getCategories } from "@/utils/blog/getCategories";
import content from "@/content/categories.json";
import { Heading } from "@/components/Stateless/Heading";

export async function Hero() {

  const categories = await getCategories()

    return <section>
    <div className="container">
      <Heading
        as="h1"
        title={content.hero.title}
        desc={content.hero.desc}
        className="my-12"
        classNameTitle="heading-2"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((item, i) => {
          return <MediumCard key={i} data={item} />
        })}
      </div>

    </div>
  </section>
}