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
       <MenuList items={menu.main.slice(0, 4)} />
        <Logo />
       <MenuList items={menu.main.slice(4)} />
      </div>
      <NavMobile />
    </nav>
  );
}

const MenuList = ({ items }) => {
  return (
    <ul className="flex items-center gap-10">
      {items.map((item, i) => (
        <li key={item.name}>
          {item.hasChildren ? (
            <Popover hover className={item.name === "Shuttles" ? "justify-end min-[1460px]:justify-start" : "justify-end min-[1400px]:justify-start" }>
              <PopoverTrigger as="div" className="flex gap-2 cursor-pointer">
                {item.name} <HiChevronDown className="size-5" />
              </PopoverTrigger>
              <PopoverContent className={`p-4 mt-6 ${item.columns === 1 ? "w-56" : "w-96"}`}>
                <ul className={`grid gap-2 grid-cols-${item.columns}`}>
                  {item.children.map((childItem) => (
                    <li key={childItem.name}>
                      {childItem.name === "Shared" || childItem.name === "Privates" ? (
                        <div>
                          <span className="inline-block mb-1 font-bold">{childItem.name}</span>
                          <ul className="flex flex-col gap-3 mt-2">
                            {childItem.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Link href={subItem.url} className="link inline-block transition-all duration-300 hover:translate-x-1">
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <Link href={childItem.url} className="bg-hover-secondary flex flex-col h-full p-2 rounded">
                          <span className="inline-block mb-1 font-bold">{childItem.name}</span>
                          <p>{childItem.description}</p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <Link href={item.url} className="link">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};