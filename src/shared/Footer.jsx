import {
  MdLocationPin,
  MdOutlineMail,
  HiOutlineClock,
  MdFacebook,
  MdWhatsapp,
} from "@/icons/index";
import { Logo } from "@/components/Stateless/Logo";
import Link from "next/link";
import menu from "@/config/menu.json";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="p-10 mt-32 text-white bg-primary">
      <div className="container">
        
        <div className="flex flex-col items-center justify-between gap-3 pb-10 border-b border-border/20 mb-12 md:flex-row">
          <Logo color="white" />
          <div className="flex flex-col items-center gap-3 text-center min-[510px]:flex-row">
            <div className="flex items-center gap-3">
              <Button as="div" isIconOnly="sm" variant="outline" className="border-text text-text hover:!text-text" >
                <MdWhatsapp className="size-5" />
              </Button>
              <span className="text-md-medium">Need help? Whatsapp us</span>
            </div>
            <Link href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank" className="heading-6">+506 8601 2266</Link>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
            <div className="p-4">
              <span className="text-lg-medium">Contact Us</span>
              <div className="my-5">
                <div className="space-y-4 text-text">
                  <p className="flex items-center gap-2">
                    <MdLocationPin className="size-5" /> Guiones, Nosara, Costa
                    Rica
                  </p>
                  <p className="flex items-center gap-2">
                    <HiOutlineClock className="size-5" /> Mon - Sun: 9:00 am -
                    5:00 pm
                  </p>
                  <p className="flex items-center gap-2">
                    <MdOutlineMail className="!w-5 size-5" />
                    <span className="break-all">
                      nbc@nosarabookingcenter.com
                    </span>
                  </p>
                </div>
                <span className="inline-block mt-7 mb-3 text-lg-bold">
                Quick Links
                </span>
                <div className="flex flex-wrap gap-2">
                  <Button as={Link} variant="outline" href="https://www.facebook.com/profile.php?id=61557653082047" target="_blank" isIconOnly className="hover:-translate-y-1" >
                    <MdFacebook className="size-5" />
                  </Button>
                  <Button as={Link} variant="outline" href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank" isIconOnly className="hover:-translate-y-1" >
                    <MdWhatsapp className="size-5" />
                  </Button>
                  <Button as={Link} variant="outline" href="mailto:nbc@nosarabookingcenter.com" target="_blank" isIconOnly className="hover:-translate-y-1" >
                    <MdOutlineMail className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {menu.footer.map((item) => {
            return (
              <div key={item.title} className="w-full sm:w-1/2 lg:w-1/5 px-2">
                <div className="p-4">
                  <span className="text-lg-medium">{item.title}</span>
                  <ul className="space-y-4 my-5">
                    {item.children.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.url}
                          className="text-text transition duration-300 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-10 border-t border-border/20 mt-12">
          <p className="text-center text-sm color-white">
            Copyright © 2024 Nosara Booking Center. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}