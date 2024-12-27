import { MdOutlineMail, HiOutlineClock, MdWhatsapp } from "@/icons/index";
import Link from "next/link";

export function TopBar() {
    return <div className="hidden md:flex justify-center py-3 px-40 text-sm bg-primary [&_svg]:size-5 text-white">

        <div className="flex gap-10 whitespace-nowrap">
        <div className="flex items-center gap-3">
            <MdWhatsapp />
            <Link href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank">+506 8601 2266</Link>
        </div>

        <div className="flex items-center gap-3">
            <MdOutlineMail />
            <Link href="mailto:nbc@nosarabookingcenter.com" target="_blank">nbc@nosarabookingcenter.com</Link>
        </div>

        <div className="flex items-center gap-3">
            <HiOutlineClock />
            <span>Mon - Sun: 9:00 am - 5:00 pm</span>
        </div>
        </div>

    </div>
}