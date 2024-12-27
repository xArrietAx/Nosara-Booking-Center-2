import { HiOutlineClock, MdCalendarMonth } from "@/icons/index";
import { BtnInfo } from "@/components/Stateless/BtnInfo";
import { Button } from "../Button";
import Link from "next/link";

export function BlogCard({ src, type }) {
  return (
    <div className="border border-border rounded-[2rem] overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <div className="relative h-80">
        <BtnInfo size="sm" variant="secondary" className="absolute top-5 left-5" >{type}</BtnInfo>
       <img src={src} alt="" />
      </div>
      <div className="relative py-5 px-4 rounded-tr-[2rem] rounded-tl-[2rem] -mt-10 bg-white 2xl:py-9 2xl:px-7">
        <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-md-medium text-text">
        <span className="flex items-center gap-1">
            <MdCalendarMonth /> 18 Sep 2024
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock /> 6 mins
          </span>
        </div>
        <span className="text-xl-bold">Ultimate Travel Planning Guide: 10 Tips for a Seamless Journey</span>
        </div>


        <div className="flex items-center justify-between mt-8">

          <div className="flex items-center gap-3" >
          <div className="w-8 h-8 rounded-full bg-secondary" />
          <span className="text-sm-bold">Carlos Caravaca</span>  
          </div>          

          <div className="card-button">
            <Button as={Link} href={`/blog`} size="sm"  variant="secondary" hover="primary" className="border border-border">Keep Reading</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
