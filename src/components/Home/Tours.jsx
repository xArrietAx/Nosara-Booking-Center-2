import { createClient } from "@/utils/supabase/server";
import { ToursCard } from "../ui/Cards/ToursCard";
import { ToursFilter } from "./ToursFilter";
import { Heading } from "@/shared/Heading";
import content from "@/content/home.json";

export async function Tours({ searchParams }) {

  const { category = "", location = "", sortBy = "" } = await searchParams;

  const supabase = await createClient();
  let query = supabase.from("Tours").select("*, category");
  
  if (category) {
    query = query.eq("category->>category", category)
  }
  
  if (location) {
    query = query.eq("location", location);
  }
  
  if (sortBy === "priceAsc") {
    query = query.order("from_price", { ascending: true });
  }
  
  if (sortBy === "priceDesc") {
    query = query.order("from_price", { ascending: false });
  }
  
  const { data: tours, error } = await query;

  return (
    <section className="section-space py-24 bg-sectionBg">
      <div className="container">
        <div className="flex flex-col gap-10 text-center lg:flex-row lg:items-end lg:justify-between lg:text-start">
          <Heading
            as="h5"
            title={content.tours.title}
            desc={content.tours.desc}
            classNameTitle="heading-2"
          />
          <ToursFilter tours={tours} />
        </div>

        <div className="mt-10">
        {
          error ? <div className="text-center text-red-500">There was an error in fetching the information</div> : tours.length === 0 ? <div className="font-bold text-center">No tours found</div> : <div className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {tours.slice(0, 6).map((item) => {
            return <ToursCard key={item.name} data={item} />;
          })}
        </div>
        }
        </div>
      </div>
    </section>
  );
}
