import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Categories } from "@/components/Blog/Categories";
import { Hero } from "@/components/Blog/Hero";
import { SomeBlogs } from "@/components/Blog/SomeBlogs";
import { Blogs } from "@/components/Blog/Blogs";
import metadataBlog from "@/SEO/blog/blog";

export const metadata = metadataBlog

export default function Blog({ searchParams }) {
  return (
    <main>
      <Breadcrumb />
      <Hero />
      <SomeBlogs />
      <Categories />
      <Blogs searchParams={searchParams} />
    </main>
  );
}