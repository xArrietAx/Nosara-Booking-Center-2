import { getFilterCounts } from "@/utils/supabase/getFilterCounts";
import { Transports } from "@/components/Shuttle/Transports";
import { createClient } from "@/utils/supabase/server";
import { Hero } from "@/components/Shuttle/Hero";

async function fetchShuttles(
  page,
  limit,
  sortBy,
  type,
  duration,
  demand,
  distance,
  priceRange,
  pickUpLocation,
  dropOffLocation
) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let query = supabase
    .from("Shuttles")
    .select("*", { count: "exact" })
    .range(offset, offset + limit - 1)
    .order(sortBy, { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  if (duration) {
    const durationArray = duration.split(",");
    if (durationArray.includes("5")) {
      query = query.or(
        `duration.gte.5,duration.in.(${durationArray.filter((d) => d !== "5").join(",")})`
      );
    } else {
      query = query.in("duration", durationArray);
    }
  }

  if (demand) {
    const demandArray = demand.split(",");
    query = query.in("demand", demandArray);
  }

  if (distance) {
    const distanceArray = distance.split(",");
    const filters = distanceArray.map((dist) => `distance->>type.eq.${dist}`).join(",");
    query = query.or(filters);
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    query = query.gte("price", minPrice).lte("price", maxPrice);
  }

  if (pickUpLocation && dropOffLocation) {
    query = query.or(
      `name.ilike.%${pickUpLocation}%${dropOffLocation}%, name.ilike.%${dropOffLocation}%${pickUpLocation}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw error;
  }

  const sortedData = data.sort((a, b) => {
    const aMatchesUserOrder =
      a.name.toLowerCase().includes(pickUpLocation.toLowerCase()) &&
      a.name.toLowerCase().indexOf(pickUpLocation.toLowerCase()) <
        a.name.toLowerCase().indexOf(dropOffLocation.toLowerCase());

    const bMatchesUserOrder =
      b.name.toLowerCase().includes(pickUpLocation.toLowerCase()) &&
      b.name.toLowerCase().indexOf(pickUpLocation.toLowerCase()) <
        b.name.toLowerCase().indexOf(dropOffLocation.toLowerCase());

    if (aMatchesUserOrder && !bMatchesUserOrder) return -1; 
    if (!aMatchesUserOrder && bMatchesUserOrder) return 1; 
    return 0;
  });

  return { data: sortedData, count };
}

export default async function Shuttles({ searchParams: params }) {
  const searchParams = await params;

  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 5;
  const type = searchParams?.type || "";
  const demand = searchParams?.demand || "";
  const duration = searchParams?.duration || "";
  const distance = searchParams?.distance || "";
  const priceRange = searchParams?.priceRange || "";
  const sortBy = searchParams?.sortBy || "name";
  const pickUpLocation = searchParams?.pickUpLocation || "";
  const dropOffLocation = searchParams?.dropOffLocation || "";

  const countsData = await getFilterCounts();

  const { data, count } = await fetchShuttles(
    page,
    limit,
    sortBy,
    type,
    duration,
    demand,
    distance,
    priceRange,
    pickUpLocation, 
    dropOffLocation
  );

  const totalPages = Math.ceil(count / limit);

  return (
    <main>
      <Hero />
      <Transports
        data={data}
        countsData={countsData}
        page={page}
        limit={limit}
        count={count}
        totalPages={totalPages}
        sortBy={sortBy}
      />
    </main>
  );
}