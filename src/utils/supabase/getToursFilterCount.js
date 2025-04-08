import { createClient } from "@/utils/supabase/server";

export async function getToursFilterCount() {
  const supabase = await createClient();

  let { data } = await supabase.from("Tours").select("*");

  if (!data) return { duration: [], location: [], activity: [] };

  const base = ["Nosara", "Garza", "Camaronal"];

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

  const activities = ["Off road", "Sea adventure", "Canopy"];
  const activity = activities.map((act) => ({
    activity: act,
    quantity: data.filter((tour) => tour.activity === act).length,
  }));

  const durationRanges = [
    { label: "1 hour", value:1, condition: (d) => d === 1 },
    { label: "2 hours", value:2, condition: (d) => d === 2 },
    { label: "3 hours", value:3, condition: (d) => d === 3 },
    { label: "4 hours", value:4, condition: (d) => d === 4 },
    { label: "+5 hours", value:5, condition: (d) => d >= 5 },
  ];

  const duration = durationRanges.map(({ label, value, condition }) => ({
    duration: label,
    value,
    quantity: data.filter((shuttle) => condition(shuttle.duration)).length,
  }));

  return { duration, location, activity };
}
