import { createClient } from "@/utils/supabase/server";
import { StayCarousel } from "./StaysCarousel";
import { Heading } from "@/components/Stateless/Heading";
import content from "@/content/home.json";
import { Button } from "../ui/Button";
import Link from "next/link";

export async function Stays() {

  const supabase = await createClient();

  let { data: houses, error } = await supabase.from("House").select("*");

  return (
    <section className="section-space py-24 bg-sectionBg">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Heading
            as="h2"
            title={content.stays.title}
            desc={content.stays.desc}
            classNameTitle="heading-2"
          />
          <Button as={Link} href="Vacation_rentals" >
            View More <i className="icon-[ion--arrow-forward] size-5" />
          </Button>
        </div>

        <div className="mt-10">
          { 
            error ? <div className="text-md-bold text-center">There was an error in fetching the information</div> : houses.length === 0 ? <div className="font-bold text-center">No houses found</div> : <StayCarousel stays={houses} />
          }
        </div>
        
      </div>
    </section>
  );
}
