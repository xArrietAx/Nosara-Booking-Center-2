import { FollowUs } from "@/components/Stateless/FollowUs";
import { Logo } from "@/components/Stateless/Logo";
import menu from "@/config/menu.json";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="p-10 mt-32 text-white bg-primary">
      <div className="container">
        
        <div className="flex flex-col items-center justify-between gap-3 pb-10 border-b border-border/20 mb-12 md:flex-row">
          <Logo color="white" />
          <div className="flex flex-col items-center gap-3 text-center min-[510px]:flex-row">
            <div className="flex items-center gap-3">
              <i className="icon-[famicons--logo-whatsapp] size-7" />
              <p className="text-md-medium">Need help? Whatsapp us</p>
            </div>
            <Link href="https://wa.me/50686012266?text=Hello Nosara Booking Center." target="_blank" rel="noopener noreferrer" className="heading-6">+506 8601 2266</Link>
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2">
            <div className="p-4">
              <p className="text-lg-medium">Contact Us</p>
              <div className="my-5">
                <div className="space-y-4 text-text">
                  <p className="flex items-center gap-2">
                  <i className="icon-[bi--geo-alt-fill] size-[18px]" /> Guiones, Nosara, Costa
                    Rica
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="icon-[fluent--clock-28-filled] size-[18px]" /> Mon - Sun: 9:00 am -
                    5:00 pm
                  </p>
                  <p className="flex items-center gap-2">
                    <i className="icon-[tabler--mail-filled] size-[18px]" />
                    <span className="break-all">
                     nbc@nosarabookingcenter.com
                    </span>
                  </p>
                </div>
                <FollowUs wrapClassName="mt-7" btnVariant="outline" />
              </div>
            </div>
          </div>

          {menu.footer.map((item) => {
            return (
              <div key={item.title} className="w-full sm:w-1/2 lg:w-1/5 px-2">
                <div className="p-4">
                  <p className="text-lg-medium">{item.title}</p>
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

        <div className="text-sm-medium flex flex-col items-center justify-between gap-5 pt-10 border-t border-border/20 mt-12 lg:flex-row">
          <p className="text-center">
            Copyright © 2024 Nosara Booking Center. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4">
          {menu.footerCopyright.map(item => {
              return <li key={item.name}>
                  <Link href={item.url} className="text-text transition duration-300 hover:text-white" >
                    {item.name}
                  </Link>
                </li>
          })}
          </ul>
        </div>

      </div>
    </footer>
  );
}