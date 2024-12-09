import { Logo } from "@/components/Logo";
import Link from "next/link";
import { NavMobile } from "./NavMobile";
import menu from "@/config/menu.json";
import { Button } from "@/components/ui/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { HiChevronDown } from "@/icons/index";

export function Nav() {
  return (
    <nav className="py-3 font-medium text-sm">
      <div className="hidden items-center justify-center gap-20 xl:flex">
        <ul className="flex items-center">
          {menu.main.slice(0, 4).map((item) => {
            return (
              <li key={item.name}>
                <Button
                  as={Link}
                  href={item.url}
                  variant="ghost"
                  className="px-7 py-3 text-sm"
                >
                  {item.name}
                </Button>
              </li>
            );
          })}
        </ul>

        <Logo />

        <ul className="flex items-center">
          {menu.main.slice(4).map((item) => {
            return (
              <li key={item.name}>
                {item.hasChildren ? (
                  <Popover hover className="justify-end 3xl:justify-start">
                    <PopoverTrigger as="div">
                      <Button variant="ghost" className="px-7 py-3 text-sm">
                        {item.name} <HiChevronDown className="size-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 mt-4">
                      <ul className="grid gap-3 grid-cols-2 ">
                        {item.children.map((item) => {
                          return (
                            <li key={item.name}>
                              {item.name === "Shared" ||
                              item.name === "Privates" ? (
                                <div>
                                  <span className="inline-block mb-1 font-bold">{item.name}</span>
                                  <ul>
                                    {item.children.map((item) => {
                                      return (
                                        <li key={item.name}>
                                          <Link href={item.url} className="bg-hover-secondary flex flex-col h-full p-2 rounded text-text" >{item.name}</Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ) : (
                                <Link href={item.url} className="bg-hover-secondary flex flex-col h-full p-2 rounded">
                                  <span className="inline-block mb-1 font-bold">{item.name}</span>
                                  {item.description}
                                </Link>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Button
                    as={Link}
                    href={item.url}
                    variant="ghost"
                    className="px-8 py-3 text-sm"
                  >
                    {item.name}
                  </Button>
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
