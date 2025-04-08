import { createClient } from "@/utils/supabase/server";

export async function getPopularRoutes() {
  const supabase = await createClient();

  let { data, error } = await supabase.from("Shuttles").select("*").eq("demand", "High")

  if (error) {
    console.error(error);
    throw error;
  }

  return { data }

}