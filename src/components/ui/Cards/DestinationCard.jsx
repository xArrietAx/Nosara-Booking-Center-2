import { HiOutlineClock, HiArrowNarrowLeft } from "@/icons/index";
import Image from "next/image"
import Link from "next/link";
import { Button } from "../Button";

export function DestinationCard({ data }) {

    const { name, duration, img, url } = data

    return <div className="flex gap-4 p-[.9rem] border border-border rounded-xl transition-shadow duration-300 hover:shadow-card">
    <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden md:w-20 md:h-20">
      <Image src={img} width={500} height={500} alt={name} className="w-full h-full" />
    </div>
    <div className="space-y-3 flex-1 mt-2">
      <span className="text-lg-medium">{name}</span>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-0.5 text-sm text-text">
          <HiOutlineClock className="size-4" />
          {duration}{" "}
          <span className="hidden lg:inline xl:hidden">hrs</span>{" "}
          <span className="lg:hidden xl:inline">hours</span>
        </span>
        <Button as={Link} href={url} isIconOnly variant="secondary" hover="primary" className="w-6 h-6" >
          <HiArrowNarrowLeft className="rotate-180 size-4" />
        </Button>
      </div>
    </div>
  </div>
}