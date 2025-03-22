import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Gallery } from "@/components/Rentals/Gallery";
import { Aside } from "@/components/Rentals/Aside";
import { Share } from "@/components/Rentals/Share";
import content from "@/content/rentals.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Rentals({ params }) {

  const { slug } = await params;

  const page = content[slug]

  if (!page) {
    return notFound()
  }

  const { title, images, overview: { one, two }, models } = page

  const FAQs = [
    {
      title:"Do I need a valid driver's license to rent a vehicle?",
      desc:"Yes, a valid driver's license is required to rent an ATV. You will need to present it for verification before your rental is confirmed."
    },
    {
      title:"Will I receive exactly the vehicle I expect, or could it be a different one?",
      desc:"If no specific model is requested, you may receive any available vehicle of the same type. Vehicle models and sizes may vary based on availability at the time of rental."
    },
    {
      title:"Is a security deposit required for rentals?",
      desc:"A security deposit may be required depending on the vehicle and rental conditions."
    }
  ]

  return (
    <main>
      <Breadcrumb />

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

              <div className="space-y-6">

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
                    {FAQs.map((item, i) => {
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
            
            <Aside slug={slug} />
          
          </div>
        </div>
      </section>

    </main>
  );
}
