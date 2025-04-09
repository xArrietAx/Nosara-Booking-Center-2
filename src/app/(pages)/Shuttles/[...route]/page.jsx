import CarouselShuttle from "@/components/Shuttle/Single/CarouselShuttle";
import { splitTextIntoParagraphs } from "@/utils/formatTextToHtml";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { Aside } from "@/components/Shuttle/Single/Aside";
import { createClient } from "@/utils/supabase/server";
import { Share } from "@/components/Rentals/Share";
import content from "@/content/shuttles.json";
import {notFound} from "next/navigation";
import Link from "next/link";
import { getShuttles } from "@/utils/supabase/getShuttles";

export async function generateStaticParams() {

 const data = await getShuttles()

  return data.map(({ route, type }) => ({
    route: [type, route]
  }));
}

export async function generateMetadata({ params }) {
  
  const { route: [shuttleType, shuttleRoute] } = await params

  const supabase = await createClient();

  const { data } = await supabase.from("Shuttles").select("*").eq("type", shuttleType).eq("route", shuttleRoute).maybeSingle();

  return {
    title: data?.name || "The page doesn't exist",
    description: data?.overview || "The page you are looking for doesn't exist",
    alternates: {
      canonical: `/Shuttles/${shuttleType}/${shuttleRoute}`,
    },
  };
}

async function fetchShuttle(type, route) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("Shuttles").select("*").eq("type", type).eq("route", route).maybeSingle();

  if (error) {
    console.error(error);
    return { data: null, error };
  }

  return { data };
}

export default async function ShuttleRoute({ params }) {

  const usageLevels = {
    High: "Popular",  
    Medium: "Moderate", 
    Low: "Rare"
  };

  const { route: [shuttleType, shuttleRoute] } = await params;

  const { data } = await fetchShuttle(shuttleType, shuttleRoute);

  if (!data) {
    return notFound();
  }

  const {
    name,
    route,
    gallery,
    duration,
    distance,
    price,
    type,
    demand,
    overview,
    highlight,
  } = data;

  const match = name.match(/^(.+?)\s+to\s+([^:]+)/);
  const origin = match ? match[1] : "";
  const destination = match ? match[2] : "";

  const mapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
    origin
  )}/${encodeURIComponent(destination)}`;

  const infoItems = [
    {
      label: "Duration",
      value: `${duration} Hours`,
      icon: "icon-[mage--clock]",
    },
    {
      label: "Distance",
      value: `${distance.value} Km`,
      icon: "icon-[mage--map-marker]",
    },
    {
      label: "Type",
      value: type,
      icon: "icon-[la--shuttle-van]",
    },
    {
      label: "Demand",
      value: usageLevels[demand],
      icon: "icon-[mage--star]",
    },
  ];

  return (
    <main>
      <Breadcrumb noLink={{ number: 1, names: ["Shared", "Private"] }} />
      <section className="mt-10">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="lg:w-2/3">
              <div className="mb-9">
                <h1 className="heading-4 inline-block mb-5">{name}</h1>
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="flex items-center gap-1 text-text">
                      <i className="icon-[bi--geo-alt-fill]" />
                      <p className="text-md-medium">
                        {route.replace(/-/g, " to ")}
                      </p>
                    </div>
                    <Link
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md-bold underline text-black"
                    >
                      Show on map
                    </Link>
                  </div>
              </div>

              <CarouselShuttle images={gallery} />

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
                          <i className={`${item.icon} size-6`} />
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
                  <h2 className="heading-6 inline-block mb-5">Highlight</h2>
                  <div className="space-y-4 text-sm-medium text-text">
                  {splitTextIntoParagraphs(highlight)}
                  </div>
                </div>

                {type === "Shared" ? (
                  <div className="p-8 border border-border rounded-lg">
                    <h2 className="heading-6 inline-block mb-5">Schedules Availables</h2>
                    <ul className="grid gap-8 md:grid-cols-2">

                      {
                        price.options.map((item, index) => {
                          return <li className="flex flex-col gap-4" key={index} >
                          <h3 className="text-sm-bold">Option {index + 1}</h3>
                          <ul className="space-y-3 text-sm text-text">
                            <li className="list-inside list-disc">
                              Departure time: {item.time}
                            </li>
                            <li className="list-inside list-disc">
                              Minimum pax: {item.minPax}
                            </li>
                            <li className="list-inside list-disc">
                              Price: ${item.price} / person
                            </li>
                            { item.note && <li className="list-inside list-disc">
                              Note: {item.note}
                            </li> }
                          </ul>
                        </li>
                        })
                      }
                       
                    </ul>
                  </div>
                ) : ( <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Prices</h2>
                  <div className="space-y-4 text-sm-medium text-text">
                  <p>Prices range from <span className="text-sm-bold">${price.from}</span> to <span className="text-sm-bold">${price.to}</span>, depending on the provider and availability.</p>
        <p>The final price may vary based on factors such as the number of passengers, time of travel, and specific service conditions set by each provider.</p>
        <p>For an exact quote and availability, please contact us via the booking form.</p>
                  </div>
                </div>)}

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">
                    Question Answers
                  </h2>
                  <ul className="space-y-4 text-text">
                    {content.FAQs.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="space-y-2 py-3.5 px-5 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <i className="icon-[bi--question-circle] flex-none" />
                            <h3 className="text-sm-bold text-black">
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm mb-3">{item.content}</p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <Aside type={type} route={route} price={price} />
          </div>
        </div>
      </section>
    </main>
  );
}
