import { Hero } from "@/components/NotFound/Hero";
import { Grid } from "@/components/NotFound/Grid";

export const metadata = {
  title: "The page doesn't exist",
  description: "The page you are looking for doesn't exist",
};

export default function notFound() {

  return (
    <main>
      <Hero />
      <Grid />
    </main>
  );
}