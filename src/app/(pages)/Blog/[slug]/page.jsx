import { Aside } from "@/components/Blog/Aside";
import { Footer } from "@/components/Blog/Singles/Footer";
import { Header } from "@/components/Blog/Singles/Header";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { getPost } from "@/utils/blog/getPost";
import { CustomMDX } from "@/utils/MDX/mdx";
import { notFound } from "next/navigation";
import { getPosts } from "@/utils/blog/getPosts";

export async function generateStaticParams() {

  const { posts } = await getPosts()
 
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }) {

  let { slug } = await params;

  const post = await getPost(slug);

  return {
    title: post.metadata.title,
    description: post.metadata.desc,
    alternates: {
      canonical: `/Blog/${slug}`,
    },
  };
}


export default async function BlogPost({ params }) {
  
  const { slug } = await params;

  const post = await getPost(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main>
      <Breadcrumb />
      <section className="mt-12">
        <div className="container">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="lg:w-2/3">
              <Header post={post.metadata} />
              <CustomMDX source={post.content} />
              <Footer tags={post.metadata.tags} />
            </div>
            <Aside />
          </div>
        </div>
      </section>
    </main>
  );
}
