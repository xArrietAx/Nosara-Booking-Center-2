import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Tags/Hero";
import metadataBlogTags from "@/SEO/blog/tags";

export const metadata = metadataBlogTags

export default function Tags({ searchParams }) {
  return (
    <main>
      <Breadcrumb />
      <Hero searchParams={searchParams} />
    </main>
  );
}