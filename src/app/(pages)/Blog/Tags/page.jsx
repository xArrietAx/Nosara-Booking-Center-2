import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Tags/Hero";

export default function Tags({ searchParams }) {
  return (
    <main>
      <Breadcrumb />
      <Hero searchParams={searchParams} />
    </main>
  );
}