import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Categories/Hero";
import metadataBlogCategories from "@/SEO/blog/categories";

export const metadata = metadataBlogCategories

export default function Categories() {
  return (
    <main>
      <Breadcrumb />
      <Hero />
    </main>
  );
}