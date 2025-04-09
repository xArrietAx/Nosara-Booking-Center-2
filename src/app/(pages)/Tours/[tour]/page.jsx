import { splitTextIntoParagraphs } from "@/utils/formatTextToHtml";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Gallery } from "@/components/Tours/Single/Gallery";
import { Aside } from "@/components/Tours/Single/Aside";
import { createClient } from "@/utils/supabase/server";
import { Share } from "@/components/Rentals/Share";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTours } from "@/utils/supabase/getTours";

export async function generateStaticParams() {
  const data = await getTours();

  return data.map((tour) => ({
    tour: tour.name.replace(/ /g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const { tour } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("Tours")
    .select("*")
    .eq("name", tour.replace(/-/g, " "))
    .maybeSingle();

  return {
    title: `${data?.name}: ${data?.title}`,
    description: data.overview,
    alternates: {
      canonical: `/Tours/${tour}`,
    },
  };
}

async function fetchTour(tour) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Tours")
    .select("*")
    .eq("name", tour.replace(/-/g, " "))
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }

  return { data };
}

export default async function TourPage({ params }) {
  const { tour } = await params;

  const { data } = await fetchTour(tour);

  if (!data) {
    return notFound();
  }

  const { name, location, title, overview, included, images, price, duration } = data;

  const infoItems = [
    {
      label: "Duration",
      value: `${duration} Hours`,
      icon: "icon-[ion--clock]",
    },
    {
      label: "Tour Type",
      value: `Guided`,
      icon: "icon-[bi--person]",
    },
    {
      label: "Language",
      value: `English`,
      icon: "icon-[ion--language-outline]",
    },
    {
      label: "From",
      value: `$${price.from}`,
      icon: "icon-[solar--tag-price-linear]",
    }
  ];

  return (
    <main>
      <Breadcrumb />
      <Gallery images={images} />
      <section className="mt-10">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="lg:w-2/3">
            <div className="mb-9">
                <h1 className="heading-4 inline-block mb-5">{name}: {title}</h1>
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1 text-text">
                      <i className="icon-[bi--geo-alt-fill]" />
                      <p className="text-md-medium">
                        {location.place}
                      </p>
                    </div>
                    <Link
                      href={location.map}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md-bold underline text-black"
                    >
                      Show on map
                    </Link>
                  </div>
              </div>

              <div className="space-y-8">

              <div className="grid items-center gap-3 py-4 px-5 border border-border rounded-lg shadow-md shadow-gray-200/60 md:grid-cols-4 xs:grid-cols-2">
                  {infoItems.map((item, index) => {
                    const bgStyles = {
                      0: "bg-green-500/5",
                      1: "bg-orange-500/5",
                      2: "bg-purple-500/5",
                      3: "bg-blue-500/5",
                    };

                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center w-11 h-11 border border-border rounded-lg bg- ${bgStyles[index]}`}
                        >
                          <i className={`${item.icon} size-[25px]`} />
                        </div>
                        <div className="info-item">
                          <p className="text-sm-medium">{item.label}</p>
                          <p className="text-lg-bold">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Overview</h2>
                  <div className="space-y-4 text-sm-medium text-text">
                    {splitTextIntoParagraphs(overview)}
                  </div>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">
                    What this tour offers
                  </h2>
                  <ul className="space-y-4 ml-4 text-sm-medium text-text list-disc">
                    {included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Prices</h2>
                  <div className="space-y-4 text-sm-medium">
                    {splitTextIntoParagraphs(price.info)}
                  </div>
                </div>
              </div>
            </div>

            <Aside tour={tour} />
          </div>
        </div>
      </section>
    </main>
  );
}
