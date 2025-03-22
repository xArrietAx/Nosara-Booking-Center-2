import { Button } from "../Button";
import Link from "next/link";
import Image from "next/image";

export function ToursCard({ data }) {

    const { id, location, name, info, category, from_price, image:{src, width, height} } = data;

  return (
    <div className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <div className="relative h-80">
        <Image src={src} width={width} height={height} alt={name} className="w-full h-full object-cover"/>
      </div>
      <div className="relative py-5 px-4 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white 2xl:py-9 2xl:px-7">
        <div className="flex flex-col gap-3">
        <Link href="/" className="heading-6 line-clamp-1">{name}</Link>
        <div className="flex items-center gap-3 text-md-medium text-text">
        <span className="flex items-center gap-1">
          </span>
          <span className="flex items-center gap-1">
          </span>
        </div>
        <p className="font-medium text-text line-clamp-2">{info}</p>
        </div>


        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-1">
          <p className="text-md-medium text-text">from /</p>
          <p className="heading-6">${from_price}</p>
          </div>
          <div className="card-button">
            <Button as={Link} href={`/Tours/${name.replace(/ /g, "-")}/${id}`} size="sm" variant="secondary" hover="primary" className="border border-border" >Book now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
