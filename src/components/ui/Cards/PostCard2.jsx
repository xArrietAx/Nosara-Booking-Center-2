import { HiOutlineClock, MdCalendarMonth } from "@/icons/index";
import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";

export function PostCard2({ data }) {

  const { title, desc, category, date, author, duration, image } = data.metadata;

  const btnInfoStyles = {
    Adventure: "!bg-red-500/10",    
  Discover: "!bg-blue-500/10",   
  Cultural: "!bg-purple-500/10",  
  Travel: "!bg-orange-500/10",     
  Wildlife: "!bg-green-500/10", 
  Nature: "!bg-teal-500/10",      
  Gastronomy: "!bg-yellow-500/10",
  Wellness: "!bg-pink-500/10",
  }

  return (
    <div className="flex flex-wrap border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card md:flex-nowrap">
      <div className="relative w-full h-80 md:w-[500px] md:h-[360px]">
      <BtnInfo size="sm" variant="secondary" className="absolute top-5 left-5 md:hidden">{category}</BtnInfo>
        <Image
          src={image}
          width={500}
          height={500}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 p-7 rounded-[2rem] -mt-10 bg-white md:w-[750px] md:h-[360px] md:-ml-8 md:mt-0">
        <BtnInfo size="xs" variant="secondary" className={`hidden md:inline ${btnInfoStyles[category]} `}>
          {category}
        </BtnInfo>

        <Link href={`/Blog/${data.slug}`} className="link heading-6 block mb-4 md:mt-4">
          {title}
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-3 text-text lg:font-medium lg:text-sm">
          <span className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
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
          <span className="flex items-center gap-1">
            <MdCalendarMonth /> {date}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock /> {duration} mins
          </span>
        </div>

        <p className="max-w-[30rem] mb-7 text-md-medium text-text line-clamp-2">
          {desc}
        </p>

        <Button
          as={Link}
          href={`/Blog/${data.slug}`}
          size="sm"
          variant="secondary"
          hover="primary"
          className="w-fit border border-border"
        >
          Keep Reading
        </Button>
      </div>
    </div>
  );
}
