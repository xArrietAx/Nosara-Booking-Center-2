import { createClient } from "@/utils/supabase/server";

export async function getShuttlesFilterCount() {
  const supabase = await createClient();

  let { data } = await supabase.from("Shuttles").select("*");

  if (!data) return { type: [], duration: [], distance: [], demand: [] };
  
  const typeMap = data.reduce((acc, shuttle) => {
    acc[shuttle.type] = (acc[shuttle.type] || 0) + 1;
    return acc;
  }, {});

  const type = Object.keys(typeMap).map((key) => ({
    type: key,
    quantity: typeMap[key],
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


  const demandLevels = [
    { label: "High", condition: (d) => d === 'High' },
    { label: "Medium", condition: (d) => d === 'Medium' },
    { label: "Low", condition: (d) => d === 'Low' },
  ];

  const demand = demandLevels.map(({ label, condition }) => ({
    demand: label,
    quantity: data.filter((shuttle) => condition(shuttle.demand)).length,
  }));


  const distanceRanges = [
    { label: "Short", condition: (d) => d.value < 30 },
    { label: "Medium", condition: (d) => d.value >= 30 && d.value <= 100 }, 
    { label: "Long", condition: (d) => d.value > 100 && d.value <= 200 },
    { label: "Very Long", condition: (d) => d.value > 200 }, 
  ];

  const distance = distanceRanges.map(({ label, condition }) => ({
    distance: label,
    quantity: data.filter((shuttle) => condition(shuttle.distance)).length,
  }));

  return { type, duration, demand, distance };
}