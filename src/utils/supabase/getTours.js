export async function getTours() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Tours?select=name`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch tours", await res.text());
    return [];
  }

  const data = await res.json();

  return data;
}
