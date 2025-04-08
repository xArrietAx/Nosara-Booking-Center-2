import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";

export function HouseCard({ data }) {

  const { name, gallery, title, price, rooms, beds, bathrooms, guests, location, type } = data;

  return (
    <div className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <div className="relative h-80">
         <BtnInfo
                  size="sm"
                  variant="secondary"
                  className="absolute top-5 left-5 font-bold!"
                >
                  {type}
                </BtnInfo>
        <Image
        width={600} 
        height={600}
          className="w-full h-full object-cover"
          src={gallery[0]}
          alt=""
        />
      </div>

      <div className="relative py-5 px-4 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white 2xl:py-9 2xl:px-7">

        <div className="flex flex-col gap-2 pb-7 border-b border-border">
          <Link href={`/Vacation-rentals/${name.replace(" ", "-")}`} className="link text-lg-bold line-clamp-2">
            {name}: {title}
          </Link>
          <div className="flex items-center gap-1.5">
            <i className="icon-[bi--geo-alt-fill] text-text/35" />
            <p className="text-md-medium text-text">{location.place}</p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-4 my-6">
            <div className="flex items-center gap-1.5">
              <i className="icon-[cbi--roomsother] text-text/35 size-6" />
              <p className="text-md-medium">{rooms} Rooms</p>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="icon-[cbi--roomsbedroom] text-text/35 size-6" />
              <p className="text-md-medium">{beds} Beds</p>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="icon-[bi--person-fill] text-text/35 size-[1.4rem]" />
              <p className="text-md-medium">{guests} Guests</p>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="icon-[cbi--roomsbathroom] text-text/35 size-6" />
              <p className="text-md-medium">{bathrooms} Bathrooms</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2 xs:flex-row xs:items-center">
            <div className="flex items-end gap-1">
              <p className="heading-6">${price.from}</p>
              <p className="text-md-medium text-text">/ night</p>
            </div>
            <Button
              size="sm"
              variant="secondary"
              hover="primary"
              as={Link}
              href={`/Vacation-rentals/${name.replace(" ", "-")}`}
              className="w-full border border-border !font-bold xs:w-fit"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
