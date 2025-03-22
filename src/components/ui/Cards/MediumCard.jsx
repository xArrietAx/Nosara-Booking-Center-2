import { Button } from "../Button";
import Link from "next/link";
import Image from "next/image";

export function MediumCard({ data }) {

    const { name, label, count, img, url, icon } = data

  return (
    <div className="space-y-4 p-4 border border-border rounded-3xl transition-shadow duration-300 hover:shadow-card">
      <div className="relative w-full h-0 p-[25%] rounded-2xl overflow-hidden">
          <Image src={img} alt="" className="absolute top-0 left-0 w-full h-full object-cover" width={500} height={500} />
      </div>
      <div className="space-y-1">
        <Link className="link text-lg-bold" href={url}>
          {name}
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-text">
            <i className={icon} />
          <span className="text-sm-medium">{count} {label}</span>
          </div>
            <Button as={Link} href={url} isIconOnly variant="secondary" hover="primary" className="w-6 h-6" >
              <i className="icon-[ion--arrow-forward]" />
        </Button>
        </div>
      </div>
    </div>
  );
}
