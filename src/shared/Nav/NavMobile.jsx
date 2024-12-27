"use client";

import { HiOutlineMenuAlt1, HiOutlineX } from "@/icons/index";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Stateless/Logo";
import menu from "@/config/menu.json";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { HiChevronDown } from "@/icons/index";

export function NavMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    close()
  }, [pathname]);

  function open() {
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    setIsOpen(false);
    document.documentElement.style.overflow = "scroll";
  }

  return (
    <div className="flex items-center justify-between px-3 sm:px-12 xl:hidden">
      <Logo />
      <Button isIconOnly variant="secondary" onClick={open}>
        <HiOutlineMenuAlt1 className="size-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 z-50 bg-black" />
            <motion.div key="menu" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="no-scrollbar fixed top-0 right-0 z-50 w-full h-screen text-base bg-white shadow-lg overflow-y-auto sm:w-96" >
              <div className="space-y-3 p-5">
                <div className="sticky top-0 z-50 flex items-center justify-between py-3 bg-white">
                  <Logo className="w-28" />
                  <Button isIconOnly variant="secondary" onClick={close}>
                    <HiOutlineX className="size-6" />
                  </Button>
                </div>

                <Accordion as="ul" type="multiple" className="space-y-2">
                  {renderMenuItems(menu.main)}
                </Accordion>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const renderMenuItems = (menu) => {
  return menu.map((item) => {
    console.log(item.hasChildren);
    return (
      <AccordionItem as="li" key={item.name} value={item.name} className="flex flex-col">
        {item.url ? (
          <Link href={item.url} className="px-3 py-2 rounded transition-colors duration-300 hover:bg-secondary">
            {item.name}
          </Link>
        ) : (
          <AccordionTrigger icon={(isOpen) => { return <HiChevronDown className={`size-5 transition-transform duration-300 hover:bg-secondary ${ isOpen ? "rotate-180" : "" }`} /> }} className="px-3 py-2 rounded transition-colors duration-300 hover:bg-secondary">
            {item.name}
          </AccordionTrigger>
        )}
        {item.hasChildren && item.children ? (
            <AccordionContent>
              <ul className="ml-2">
              {renderMenuItems(item.children)}  
              </ul>            
            </AccordionContent>
          ) : <></>}
      </AccordionItem>
    );
  });
};