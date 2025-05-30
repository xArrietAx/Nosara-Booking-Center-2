import { metadataAtv, metadataGolfCart, metadataSideBySide } from "@/SEO/rentals";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Gallery } from "@/components/Rentals/Gallery";
import { Aside } from "@/components/Rentals/Aside";
import { Share } from "@/components/Rentals/Share";
import content from "@/content/rentals.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export function generateStaticParams() {
  return [{ rent: 'ATV' }, { rent: 'Golf-cart' }, { rent: 'Side-by-side' }]
}

export async function generateMetadata({ params }) {

  const { rent } = await params;

  switch (rent) {

    case 'ATV': return metadataAtv
    case 'Golf-cart': return metadataGolfCart
    case 'Side-by-side': return metadataSideBySide

    default:
      notFound()
  }
}

export default async function Rentals({ params }) {

  const { rent } = await params;

  const page = content[rent]

  if (!page) {
    notFound()
  }

  const { title, images, overview: { one, two }, models } = page

  return (
    <main>
      <Breadcrumb noLink={{ number: 0, names:"Rentals" }} />
      <Gallery images={images}/>
      <section className="mt-10">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="lg:w-2/3">

              <div className="mb-9">
                <h1 className="heading-4 inline-block mb-5">
                  {title}
                </h1>
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1 text-text">
                      <i className="icon-[bi--geo-alt-fill]" />
                      <span className="text-md-medium">Guiones, Nosara</span>
                    </div>
                    <Link href="https://maps.app.goo.gl/1B4tWHyCnFmt4Nya7" target="_blank"  rel="noopener noreferrer" className="text-md-bold underline text-black">
                      Show on map
                    </Link>
                  </div>
                 <Share />
                </div>
              </div>

              <div className="space-y-8">

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Overview</h2>
                  <div className="space-y-4 text-sm-medium text-text">
                    <p>
                    {one}
                    </p>

                    <p>
                    {two}
                    </p>
                  </div>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Availables Models</h2>
                  <ul className="grid gap-8 md:grid-cols-2">
                    {models.map((item, i) => {
                      return <li key={i} className="flex flex-col gap-4">
                        <h3 className="text-sm-bold">{item.model}</h3>
                        <ul className="space-y-3 text-sm text-text">
                          {item.details.map((item,i) => {
                            return <li key={i} className="list-inside list-disc">
                              {item}
                            </li>
                          })}
                        </ul>
                      </li>
                    })}
                  </ul>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">
                    Question Answers
                  </h2>
                  <ul className="space-y-4 text-text">
                    {content.FAQs.map((item, i) => {
                      return <li key={i} className="space-y-2 py-3.5 px-5 border border-border rounded-lg">
                        <div className="flex items-center gap-2">
                          <i className="icon-[bi--question-circle] flex-none" />
                          <h3 className="text-sm-bold text-black">
                          {item.title}
                          </h3>
                        </div>
                         <p className="text-sm mb-3">
                          {item.desc}
                          </p>
                      </li>
                    })}
                  </ul>
                </div>

              </div>

            </div>
            
            <Aside rent={rent} />
          
          </div>
        </div>
      </section>
    </main>
  );
}