import Image from "next/image";
import Link from "next/link";
import { Button } from "../Button";

export function SmallCard({ data }) {
  const { name, label, count, img, url, icon } = data;

  return (
    <div className="flex gap-2.5 p-[.9rem] border border-border rounded-xl transition-shadow duration-300 hover:shadow-card md:gap-4 lg:gap-2.5 xl:gap-4">
      <div className="flex-none w-16 h-16 rounded-full bg-secondary overflow-hidden md:w-20 md:h-20 lg:w-[4.5rem] lg:h-[4.5rem] xl:w-20 xl:h-20">
        <Image
          src={img}
          width={300}
          height={300}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 flex-1 mt-2">
        <Link className="link text-lg-bold" href={url}>
          {name}
        </Link>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-0.5 -mt-5 text-text">
            <i className={icon} />
            <span className="text-sm-medium">
            {count} {label}
            </span>
          </div>
          <Button
            as={Link}
            href={url}
            isIconOnly="xs"
            variant="secondary"
            hover="primary"
            aria-label="Go to details"
          ><i className="icon-[ion--arrow-forward]" /></Button>
        </div>
      </div>
    </div>
  );
}
