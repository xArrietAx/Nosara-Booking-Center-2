"use client";

import {
  HiOutlineMenuAlt1,
  HiOutlineX,
  MdFacebook,
  MdWhatsapp,
  MdOutlineMail,
} from "@/icons/index";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import menu from "@/config/menu.json";
import Link from "next/link";
import {
  Collapse,
  CollapseItem,
  CollapseTrigger,
  CollapseContent,
} from "@/components/ui/Collapse";
import { Button } from "@/components/ui/Button";

export function NavMobile() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="flex items-center justify-between px-3 sm:px-12 xl:hidden">
      <Logo />
      <Button isIconOnly color="secondary" onClick={() => setIsOpen(!isOpen)}>
        <HiOutlineMenuAlt1 className="size-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />

            <motion.div
              key="menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="no-scrollbar fixed top-0 right-0 z-50 w-full h-screen text-base bg-white shadow-lg overflow-y-auto sm:w-96"
            >
              <div className="space-y-3 p-5">
                <div className="sticky top-0 z-50 flex items-center justify-between py-3 bg-white">
                  <Logo className="w-28" />
                  <Button
                    isIconOnly
                    color="secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    <HiOutlineX className="size-6" />
                  </Button>
                </div>

                <ul className="space-y-2">
                  {menu.main.map((item) => {
                    return <li key={item.name}>
                      {item.hasChildren ? (
                      <Collapse type="multiple">

                        <CollapseItem>

                          <CollapseTrigger className="block w-full px-3 py-2 rounded text-left duration-300 hover:bg-neutral-100">
                            {item.name}
                          </CollapseTrigger>

                          <CollapseContent>
                            {item.children.map((item) => {
                              return item.hasChildren ? (
                                <Collapse type="multiple" key={item.name}>

                                  <CollapseItem>
                                  
                                    <CollapseTrigger className="block w-full px-3 py-2 rounded text-left duration-300 hover:bg-neutral-100">
                                      {item.name}
                                    </CollapseTrigger>

                                    <CollapseContent>
                                      {item.children.map((item) => {
                                        return (
                                          <Link
                                            key={item.name}
                                            href={item.url}
                                            className="block px-3 py-2 rounded duration-300 hover:bg-neutral-100"
                                          >
                                            {item.name}
                                          </Link>
                                        );
                                      })}
                                    </CollapseContent>

                                  </CollapseItem>

                                </Collapse>
                              ) : (
                                <Link
                                  key={item.name}
                                  href={item.url}
                                  className="block px-3 py-2 rounded duration-300 hover:bg-neutral-100"
                                >
                                  {item.name}
                                </Link>
                              );
                            })}
                          </CollapseContent>

                        </CollapseItem>

                      </Collapse>
                    ) : (
                      <Link
                       
                        href={item.url}
                        className="block px-3 py-2 rounded duration-300 hover:bg-neutral-100"
                      >
                        {item.name}
                      </Link>
                    )}
                    </li>
                  })}
                </ul>

                <div className="flex justify-center gap-5 py-3">
                  <Link
                    href="https://www.facebook.com/profile.php?id=61557653082047"
                    target="_blank"
                  >
                    <MdFacebook className="bg-hover size-8" />
                  </Link>
                  <Link
                    href="mailto:nbc@nosarabookingcenter.com"
                    target="_blank"
                  >
                    <MdOutlineMail className="bg-hover size-8" />
                  </Link>
                  <Link
                    href="https://wa.me/50686012266?text=Hello Nosara Booking Center."
                    target="_blank"
                  >
                    <MdWhatsapp className="bg-hover size-8" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
