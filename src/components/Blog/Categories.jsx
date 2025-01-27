import { getCategories } from "@/utils/blog/getCategories";
import { SmallCard } from "../ui/Cards/SmallCard";

export async function Categories() {

 const categories = await getCategories()

  return (
    <section>
      <div className="container">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item) => {
            return (
              <li key={item.name}>
                <SmallCard data={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
