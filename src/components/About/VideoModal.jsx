"use client";

import { BsFillPlayFill, HiOutlineX } from "@/icons/index";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    setIsOpen(false);
    document.documentElement.style.overflow = "scroll";
  }

  return (
    <>
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/45 cursor-pointer"
        onClick={open}
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white lg:w-16 lg:h-16">
          <BsFillPlayFill className="translate-x-0.5 size-10 lg:size-12" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 z-40 flex items-center justify-center w-screen h-screen bg-black/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          >
            <motion.div
              className="container w-full max-w-4xl rounded-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative flex flex-col gap-2 w-full h-0 pb-[60%] xl:flex-row-reverse">
                <button className="absolute -top-10 right-0 z-10 text-white  lg:top-0 lg:-right-10" onClick={close}>
                <HiOutlineX className="size-9"  />
                </button>
                <iframe
                  src="https://www.youtube.com/embed/Y3-JqSWlS2U?si=_Hv5HUTnIj5X1KGo"
                  title="Playa Guiones, Nosara, Guanacaste. Costa Rica (4K)"
                  frameBorder="0"
                  className="absolute top-0 left-0 w-full h-full bg-black"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
