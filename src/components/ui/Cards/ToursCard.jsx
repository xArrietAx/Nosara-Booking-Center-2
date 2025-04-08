import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";

export function ToursCard({ data }) {
  const {
    name,
    title,
    duration,
    activity,
    location,
    images, price
  } = data;

  return (
    <div className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <div className="relative h-80">
        <BtnInfo
          size="sm"
          variant="secondary"
          className="absolute top-5 left-5 font-bold!"
        >
          {activity}
        </BtnInfo>
        <Image
          src={images[0]}
          width={600}
          height={600}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative py-5 px-4 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white 2xl:py-9 2xl:px-7">
        <div className="flex flex-col gap-3">
          <Link href={`/Tours/${name.replace(/ /g, "-")}`} className="link text-lg-bold line-clamp-2">{name}: {title}</Link>
          <div className="flex items-center gap-3 text-md-medium text-text/90">
            <p className="flex items-center gap-1.5">
              <i className={`icon-[bi--geo-alt] size-[17px]`} />
              <span>{location.place.split(",")[0]}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <i className="icon-[bi--clock] size-[17px]" />
              <span>{duration} hours</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-1">
            <p className="heading-6">${price.from}</p>
            <p className="text-md-medium text-text">/ person</p>
          </div>
          <div className="card-button">
            <Button
              as={Link}
              href={`/Tours/${name.replace(/ /g, "-")}`}
              size="sm"
              variant="secondary"
              hover="primary"
              className="border border-border"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
