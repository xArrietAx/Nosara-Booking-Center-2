import { Aside } from "@/components/Blog/Aside";
import { Footer } from "@/components/Blog/Singles/Footer";
import { Header } from "@/components/Blog/Singles/Header";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { getPost } from "@/utils/blog/getPost";
import { CustomMDX } from "@/utils/MDX/mdx";
import { notFound } from "next/navigation";

export default async function BlogPost(params) {
  const { slug } = await params.params;

  const post = await getPost(slug);
  
  if (!post) {
    return notFound();
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
