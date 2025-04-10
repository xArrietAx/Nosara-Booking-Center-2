import { metadataCookiesPolicy, metadataPrivacyAndPolicy, metadataTermsAndConditions } from "@/SEO/legal";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { getMDXData } from "@/utils/MDX/getMDXData";
import { Header } from "@/components/Legal/Header";
import { Footer } from "@/components/Legal/Footer";
import { notFound } from "next/navigation";
import { CustomMDX } from "@/utils/MDX/mdx";
import path from "path";

export default async function Legal({ params }) {
  const { legal } = await params;

  const pages = getMDXData(path.join(process.cwd(), "src/app/(pages)/[legal]"));

  const page = await pages.find((item) => item.slug === legal);

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