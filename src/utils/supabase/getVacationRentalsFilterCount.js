import { createClient } from "@/utils/supabase/server";

export async function getVacationRentalsFilterCount() {
  const supabase = await createClient();

  let { data } = await supabase.from("Houses").select("*");

  if (!data) return { type: [], propertyType: [], location: [], amenities: [] };

  const types = ["Short term", "Long term"];
  const type = types.map((act) => ({
    type: act,
    quantity: data.filter((house) => house.type === act).length,
  }));

  const possiblepropertyTypes = ["Villa", "Department", "Condos"];
  const propertytypeMap = data.reduce((acc, house) => {
    acc[house.property_type] = (acc[house.property_type] || 0) + 1;
    return acc;
  }, {});

  const propertyType = possiblepropertyTypes.map((t) => ({
    propertyType: t,
    quantity: propertytypeMap[t] || 0,
  }));

  const base = ["Playa pelada", "Garza", "Guiones"];

  const location = [
    ...base,
    ...[...new Set(
      data
        .map(t => t.location?.place?.split(",")[0]?.trim())
        .filter(l => l && !base.includes(l))
    )]
  ]
  .map(loc => ({
    location: loc,
    quantity: data.filter(t => t.location?.place?.startsWith(loc)).length,
  }))
  .slice(0, 5);

  const possibleAmenities = ["WIFI", "Pool", "Air conditioning", "TV", "Kitchen", "Parking"];

const amenitiesMap = data.reduce((acc, house) => {
  if (house.amenities && Array.isArray(house.amenities.included)) {
    house.amenities.included.forEach((amenity) => {
      acc[amenity] = (acc[amenity] || 0) + 1;
    });
  }
  return acc;
}, {});

const amenities = possibleAmenities.map((amenity) => ({
  amenity,
  quantity: amenitiesMap[amenity] || 0,
}));


  return { type, propertyType, location, amenities };
}