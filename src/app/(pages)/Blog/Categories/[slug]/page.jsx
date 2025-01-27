import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Categories/Singles/Hero";
import { getCategory } from "@/utils/blog/getCategory";
import { Posts } from "@/components/Blog/Categories/Singles/Posts";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/utils/blog/getPostsByCategory";

export default async function Category({ params, searchParams }) {

  let { slug } = await params;
  let queries = await searchParams;

  const page = parseInt(queries.page) || 1;
  const postsPerPage = 6;

  slug = decodeURIComponent(slug.replace(/\+/g, ' '));

  const category = await getCategory(slug);
  
  if (!category) {
    return notFound();
  }

  const { posts, totalPages } = await getPostsByCategory(slug, page, postsPerPage);

  return (
    <main>
      <Breadcrumb />
      <Hero data={category} /> 
      <Posts data={posts} page={page} totalPages={totalPages} /> 
    </main>
  );
}
