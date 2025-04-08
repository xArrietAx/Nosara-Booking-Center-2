import { getVacationRentalsFilterCount } from "@/utils/supabase/getVacationRentalsFilterCount";
import { createClient } from "@/utils/supabase/server";
import { Hero } from "@/components/VacationRentals/Hero";
import { Houses } from "@/components/VacationRentals/Houses";
import metadataVacationRentals from "@/SEO/vacationRentals";

export const metadata = metadataVacationRentals

async function fetchHouses( page, limit, sortBy, type, propertyType, location, amenities, priceRange ) {
  const supabase = await createClient();
  const offset = (page - 1) * limit;

  let query = supabase .from("Houses") .select("*", { count: "exact" }) .range(offset, offset + limit - 1) .order(sortBy, { ascending: true });
  
  if (propertyType) {
    const propertyTypeArray = propertyType.split(",");
    query = query.in("property_type", propertyTypeArray);
  }
  
  if (type) {
    query = query.eq("type", type);
  }
  
  if (location) { 
    query = query.ilike("location->>place", `${location}%`);
  }

  if (amenities) {
    const amenitiesArray = amenities.split(",");
    const orConditions = amenitiesArray
      .map(item => `amenities->included.cs.${JSON.stringify([item])}`)
      .join(',');
    query = query.or(orConditions);
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

export default async function VacationRentals({ searchParams: params }) {
  const searchParams = await params;

  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 6;
  const sortBy = searchParams?.sortBy || "name";

  const type = searchParams?.type || "";
  const propertyType = searchParams?.property_type || "";
  const amenities = searchParams?.amenities || "";
  const location = searchParams?.location || "";
  const priceRange = searchParams?.priceRange || "";

  const countsData = await getVacationRentalsFilterCount();

  const { data, count } = await fetchHouses( page, limit, sortBy, type, propertyType, location, amenities, priceRange );

  const totalPages = Math.ceil(count / limit);
  
  return (
    <main>
      <Hero />
      <Houses data={data} totalPages={totalPages} countsData={countsData} page={page} limit={limit} sortBy={sortBy} count={count} />
    </main>
  );
}