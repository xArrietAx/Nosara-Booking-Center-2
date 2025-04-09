import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Hero } from "@/components/Blog/Categories/Singles/Hero";
import { getCategory } from "@/utils/blog/getCategory";
import { Posts } from "@/components/Blog/Categories/Singles/Posts";
import { notFound } from "next/navigation";
import { getPostsByCategory } from "@/utils/blog/getPostsByCategory";
import { getCategories } from "@/utils/blog/getCategories";

export async function generateStaticParams() {

  const categories = await getCategories();

  return categories.map(category => ({
    slug: category.name,
  }))
}

export async function generateMetadata({ params }) {
  let { slug } = await params;

  return {
    title: `${slug} | Articles & Guides`,
    description: `Explore blog posts and articles under the "${slug}" category at Nosara Booking Center.`,
    alternates: {
      canonical: `/Blog/Categories/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }) {

  let { slug } = await params;
  let queries = await searchParams;

  const page = parseInt(queries.page) || 1;
  const postsPerPage = 6;

  const category = await getCategory(slug);
  
  if (!category) {
    notFound();
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