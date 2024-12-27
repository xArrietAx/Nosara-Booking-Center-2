import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { HiChevronDown } from "@/icons/index";
import { Logo } from "@/components/Stateless/Logo";
import { NavMobile } from "./NavMobile";
import menu from "@/config/menu.json";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="py-3 font-medium text-sm">
      <div className="hidden items-center justify-center gap-12 min-[1250px]:gap-20 xl:flex">

        <ul className="flex items-center gap-10">
          {menu.main.slice(0, 4).map((item) => {
            return (
              <li key={item.name} className="link">
                <Link href={item.url} >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <Logo />

        <ul className="flex items-center gap-10">
          {menu.main.slice(4).map((item) => {
            return (
              <li key={item.name}>
                {item.hasChildren ? (
                  <Popover hover className="justify-end 3xl:justify-start">
                    <PopoverTrigger as="div" className="flex gap-2 cursor-pointer">
                        {item.name} <HiChevronDown className="size-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-96 mt-6">
                      <ul className="grid gap-2 grid-cols-2 ">
                        {item.children.map((item) => {
                          return (
                            <li key={item.name}>
                              {item.name === "Shared" ||
                              item.name === "Privates" ? (
                                <div>
                                  <span className="inline-block mb-1 font-bold">
                                    {item.name}
                                  </span>
                                  <ul className="flex flex-col gap-3 mt-2">
                                    {item.children.map((item) => {
                                      return (
                                        <li key={item.name}>
                                          <Link href={item.url} className="link inline-block transition-all duration-300 hover:translate-x-1" >
                                            {item.name}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ) : (
                                <Link href={item.url} className="bg-hover-secondary flex flex-col h-full p-2 rounded" >
                                  <span className="inline-block mb-1 font-bold">
                                    {item.name}
                                  </span>
                                  <p>{item.description}</p>
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link href={item.url} className="link" >
                  {item.name}
                </Link>
                )}
              </li>
            );
          })}
        </ul>

      </div>
      <NavMobile />
    </nav>
  );
}
