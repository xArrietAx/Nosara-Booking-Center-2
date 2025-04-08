import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function ShuttleCard({data}) {

    const { name, gallery, price, type, demand, duration, route } = data

    const usageLevels = {
      High: "Popular",  
      Medium: "Moderate", 
      Low: "Rare"
    };
    
    return <div key={name} className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
    <div className="relative h-80">
      <BtnInfo
        size="sm"
        variant="secondary"
        className="absolute top-5 left-5 font-bold!"
      >
        {usageLevels[demand]}
      </BtnInfo>
      <Image
        src={gallery[0]}
        width={500}
        height={500}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
    <div className="relative flex flex-col gap-3 p-7 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white">
      <Link href={`/Shuttles/${type}/${route}`} className="link text-lg-bold line-clamp-2" >
        {name}
      </Link>
      <div className="flex flex-wrap items-center gap-3 text-text">
        <p className="flex items-center gap-1">
          <i className="icon-[la--shuttle-van] text-text size-5" />
          <span>{type}</span>
        </p>
        <p className="flex items-center gap-1">
          <i className="icon-[mage--clock] text-text size-5" />
          <span>{duration} hours</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-1">
      <p className="heading-6">${price?.from}</p>
      <p className="text-md-medium text-text">/ { type === "Shared" ? "person" : "ride" }</p>
    </div>
        <Button
          size="sm"
          variant="secondary"
          hover="primary"
          as={Link}
          href={`/Shuttles/${type}/${route}`}
          className="w-full border border-border !font-bold min-[358px]:w-fit"
        >
          Book Now
        </Button>
      </div>
    </div>
  </div>
}