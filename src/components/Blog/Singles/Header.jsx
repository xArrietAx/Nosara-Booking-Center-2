import { MdCalendarMonth, HiOutlineClock } from "@/icons/index"
import Image from "next/image";

export function Header({ post }) {
  return (
    <div className="space-y-8 mb-14">
      <h1 className="heading-4">
       {post.title}
      </h1>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden" >
            <Image src="/blog/user.webp" alt="" width={150} height={150} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm-bold ">{post.author}</p>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1"><MdCalendarMonth /> <span>{post.date}</span></div>
            <div className="flex items-center gap-1"> <HiOutlineClock /> <span>{post.duration} mins</span></div>
          </div>
        </div>
    </div>
  );
}
