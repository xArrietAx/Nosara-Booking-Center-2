import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "@/icons/index";

export function TopBar() {
    return <div className="hidden md:flex justify-center w-screen py-3 px-40 text-sm bg-primary [&_svg]:size-5 text-white">
        <div className="flex gap-10 whitespace-nowrap">
        <div className="flex items-center gap-3">
            <HiOutlinePhone />
            <span>+506 8601 2266</span>
        </div>

        <div className="flex items-center gap-3">
            <HiOutlineMail />
            <span>nbc@nosarabookingcenter.com</span>
        </div>

        <div className="flex items-center gap-3">
            <HiOutlineClock />
            <span>Mon - Sun: 9:00 am - 5:00 pm</span>
        </div>
        </div>
    </div>
}
