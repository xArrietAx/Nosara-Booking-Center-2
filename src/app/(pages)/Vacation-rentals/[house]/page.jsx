import { Gallery } from "@/components/VacationRentals/Single/Gallery";
import { splitTextIntoParagraphs } from "@/utils/formatTextToHtml";
import { Aside } from "@/components/VacationRentals/Single/Aside";
import { Breadcrumb } from "@/components/Stateless/BreadCrumb";
import { createClient } from "@/utils/supabase/server";
import { Share } from "@/components/Rentals/Share";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVacationRentals } from "@/utils/supabase/getVacationRentals";
import { BtnInfo } from "@/components/Stateless/BtnInfo";

export async function generateStaticParams() {
  const data = await getVacationRentals();

  return data.map((house) => ({
    house: house.name.replace(/ /g, "-"),
  }));
}

export async function generateMetadata({ params }) {
  const { house } = await params;

  const supabase = await createClient();

  const { data } = await supabase
    .from("Houses")
    .select("*")
    .eq("name", house.replace(/-/g, " "))
    .maybeSingle();

  return {
    title: `${data.name}: ${data.title}`,
    description: data.overview,
    alternates: {
      canonical: `/Vacation-rentals/${house}`,
    },
  };
}

async function fetchHouse(house) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Houses")
    .select("*")
    .eq("name", house.replace(/-/g, " "))
    .maybeSingle();

  if (error) {
    return { data: null, error };
  }

  return { data };
}

export default async function HousePage({ params }) {
  const { house } = await params;

  const { data } = await fetchHouse(house);

  if (!data) {
    return notFound();
  }

  const {
    name,
    title,
    location,
    price,
    gallery,
    overview,
    rules,
    amenities,
    rooms,
    beds,
    bathrooms,
    guests,
  } = data;

  const infoItems = [
    {
      label: "Guests",
      value: `${guests} max`,
      icon: "icon-[bi--person]",
    },
    {
      label: "Rooms",
      value: `${rooms} total`,
      icon: "icon-[bi--door-open]",
    },
    {
      label: "Beds",
      value: `${beds} units`,
      icon: "icon-[hugeicons--bed-double]",
    },
    {
      label: "Bathrooms",
      value: `${bathrooms} baths`,
      icon: "icon-[cil--bath]",
    },
  ];

  return (
    <main>
      <Breadcrumb />
      <p></p>
      <Gallery images={gallery} />
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
                  <h2 className="heading-6 inline-block mb-5">
                    What this place offers
                  </h2>
                  <div className="space-y-4 text-sm-medium">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col gap-5">
                        <p className="text-sm-bold">Included:</p>
                        <ul className="flex flex-col gap-1.5 ml-4.5 text-text list-disc">
                          {amenities.included.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-3">
                        <p className="text-sm-bold">Excluded:</p>
                        <ul className="flex flex-col gap-1.5 ml-4.5 text-text list-disc">
                          {amenities.excluded.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Prices</h2>
                  <div className="space-y-4 text-sm-medium">
                    <p>
                      Prices range from{" "}
                      <span className="text-sm-bold">${price.from}</span> to{" "}
                      <span className="text-sm-bold">${price.to}</span> per
                      night, depending on the season.
                    </p>
                  </div>
                </div>

                <div className="p-8 border border-border rounded-lg">
                  <h2 className="heading-6 inline-block mb-5">Rules</h2>
                  <div className="space-y-4 text-sm-medium text-text">
                    {splitTextIntoParagraphs(rules)}
                  </div>
                </div>
              </div>
            </div>

            <Aside house={house} />
          </div>
        </div>
      </section>
    </main>
  );
}
