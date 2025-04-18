import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";

export function PostCard({ data }) {
  const { title, category, date, author, duration, image } = data.metadata;

  return (
    <div className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <div className="relative h-80">
        <BtnInfo
          size="sm"
          variant="secondary"
          className="absolute top-5 left-5 font-bold!"
        >
          {category}
        </BtnInfo>
        <Image
          src={image}
          width={500}
          height={500}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative p-7 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white">
        <div className="flex flex-wrap items-center gap-3 mb-3 text-text">
          <p className="flex items-center gap-1">
            <i className="icon-[mage--calendar-2] text-text size-4" />
            <span>{date}</span>
          </p>
          <p className="flex items-center gap-1">
            <i className="icon-[mage--clock] text-text size-4" />
            <span>{duration} mins</span>
          </p>
        </div>
        <Link href={`/Blog/${data.slug}`} className="link text-xl-bold inline-block mb-8" >
          {title}
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={"/blog/user.webp"}
                width={50}
                height={50}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
           {author}
          </span>
          <Button
            as={Link}
            href={`/Blog/${data.slug}`}
            size="sm"
            variant="secondary"
            hover="primary"
            className="w-full border border-border !font-bold min-[358px]:w-fit"
          >
            Keep Reading
          </Button>
        </div>
      </div>
    </div>
  );
}
