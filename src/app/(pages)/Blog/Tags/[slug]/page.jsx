import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Tags/Singles/Hero";
import { getTag } from "@/utils/blog/getTag";
import { Posts } from "@/components/Blog/Tags/Singles/Posts";
import { notFound } from "next/navigation";
import { getPostsByTag } from "@/utils/blog/getPostsByTag";

export default async function Tag({ params, searchParams }) {

  let { slug } = await params;
  let queries = await searchParams;

  const page = parseInt(queries.page) || 1;
  const postsPerPage = 6;

  slug = decodeURIComponent(slug.replace(/\+/g, ' '));

  const tag = await getTag(slug);

  if (!tag) {
    return notFound();
  }

  const { posts, totalPages } = await getPostsByTag(slug, page, postsPerPage);

  return (
    <main>
      <Breadcrumb />
      <Hero data={tag} /> 
      <Posts data={posts} page={page} totalPages={totalPages} /> 
    </main>
  );
}
