import { getMDXData } from "@/utils/MDX/getMDXData";
import { CustomMDX } from "@/utils/MDX/mdx";
import path from "path";
import { Header } from "@/components/Legal/Header";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Footer } from "@/components/Legal/Footer";
import { notFound } from "next/navigation";

export default async function Legal({ params }) {
  const { slug } = await params;

  const pages = getMDXData(path.join(process.cwd(), "src/app/(pages)/[slug]"));

  const page = await pages.find((item) => item.slug === slug);

  if (!page) {
    return notFound();
  }

  return (
    <main>
      <Breadcrumb />
      <section className="mt-28">
        <div className="container max-w-4xl mx-auto">
          <Header data={page.metadata} />
          <CustomMDX source={page.content} />
          <Footer data={page.metadata} />
        </div>
      </section>
    </main>
  );
}
