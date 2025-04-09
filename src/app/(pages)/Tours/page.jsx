import { getToursFilterCount } from "@/utils/supabase/getToursFilterCount";
import { SearchBar } from "@/components/Tours/SearchBar";
import { createClient } from "@/utils/supabase/server";
import { Aside } from "@/components/Tours/Aside";
import { Tours } from "@/components/Tours/Tours";
import content from "@/content/tours.json";
import metadataTours from "@/SEO/tours";

export const metadata = metadataTours

async function fetchTours( page, limit, sortBy, location, activity, duration, priceRange ) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("Tours")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1)
    .order(sortBy, { ascending: true });

    if (location) {
      const locationArray = location.split(",");
      const filterString = locationArray.map(loc => `location->>place.ilike.${loc}%`).join(',');
      query = query.or(filterString);
    }

  if (duration) {
    const durationArray = duration.split(",")

    if (durationArray.includes("6")) {
      query = query.or(
        `duration.gte.6,duration.in.(${durationArray
          .filter((d) => d !== "6")
          .join(",")})`
      );
    } else {
      query = query.in(
        "duration",
        durationArray.map((d) => parseFloat(d))
      );
    }
  }

  if (activity) {
    const activityArray = activity.split(",");
    query = query.in("activity", activityArray);
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    query = query.gte("price->from", minPrice).lte("price->from", maxPrice);
  }

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return { data, count };
}

export default async function ToursPage({ searchParams: params }) {
  
  const searchParams = await params;

  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 6;
  const sortBy = searchParams?.sortBy || "name";

  const location = searchParams?.location || "";
  const activity = searchParams?.activity || "";
  const duration = searchParams?.duration || "";
  const priceRange = searchParams?.priceRange || "";

  const countsData = await getToursFilterCount();

  const { data, count } = await fetchTours(
    page,
    limit,
    sortBy,
    location,
    activity,
    duration,
    priceRange
  );

  const totalPages = Math.ceil(count / limit);

  return (
    <main>
      <section>
            <div className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/50 bg-[url(/tours/banner.webp)] bg-cover bg-center bg-no-repeat relative py-32">

              <div className="container relative z-10 flex flex-col items-center gap-14">
                <div className="text-white text-center">
                  <h1 className="heading-3">{content.hero.title}</h1>
                  <p className="heading-6 heading-6-medium">{content.hero.desc}</p>
                </div>
                <SearchBar />
              </div>
            </div>
      </section>
      <section id="tours">
        <div className="container">
          <div className="flex flex-col-reverse gap-12 mt-14 lg:flex-row lg:gap-6">
            <Aside countsData={countsData} />
            <Tours data={data} page={page} limit={limit} sortBy={sortBy} totalPages={totalPages} count={count} />
          </div>
        </div>
      </section>
    </main>
  );
}
