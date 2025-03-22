"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
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
            <Popover
            hover
              className={
                item.name === "Shuttles" || item.name === "Rentals"
                  ? "justify-end min-[1460px]:justify-start"
                  : null
              }
            >
              <PopoverTrigger
                as="div"
                className="flex items-center gap-2 cursor-pointer"
              >
                {item.name} <i className="icon-[ion--chevron-down]" />
              </PopoverTrigger>
              <PopoverContent
                className={`mt-6 ${item.columns === 1 ? "w-56" : "w-96"}`}
              >
                {({close}) => {
                  return <ul className={`grid gap-2 grid-cols-${item.columns}`}>
                  {item.children.map((childItem) => (
                    <li key={childItem.name} onClick={close}>
                      {childItem.name === "Shared" ||
                      childItem.name === "Privates" ? (
                        <>
                          {" "}
                          <span className="inline-block mb-1 font-bold">
                            {childItem.name}
                          </span>
                          <ul className="flex flex-col gap-3 mt-2">
                            {childItem.children.map((subItem) => (
                              <li
                                key={subItem.name}
                                className="link transition-transform! duration-300 hover:translate-x-1"
                              >
                                <Link href={subItem.url}>{subItem.name}</Link>
                              </li>
                            ))}
                            {childItem.name === "Privates" && (
                              <li>
                                <Link href="/Shuttles" className="bg-hover-secondary flex flex-col !p-2 rounded-sm">
                                <span className="inline-block mb-1 font-bold">
                                  Discover more routes!
                                </span>
                                <div className="flex items-center gap-1">
                                <p>Let's explore!</p>
                                <i className="icon-[ion--arrow-forward]" />
                                </div>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </>
                      ) : (
                        <Link href={childItem.url} className="bg-hover-secondary flex flex-col h-full !p-2 rounded-sm" >
                          <span className="inline-block mb-1 font-bold">
                            {childItem.name}
                          </span>
                          <p>{childItem.description}</p>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                }}
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
