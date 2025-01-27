"use client";

import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useState } from "react";

export function Gallery({ gallery }) {
    
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1,
    });

    function openLightboxOnSlide(number) {
        setLightboxController((prevState) => ({
            toggler: !prevState.toggler,
            slide: number,
        }));
    }
  return (
    <div className="p-7 border border-border rounded-lg">
      <span className="text-xl-bold inline-block w-full pb-5 border-b border-border mb-8">
        Gallery
      </span>
          
           <ul className="flex flex-wrap items-center -mx-2">
            {gallery.slice(0, 9).map((item, i) => {
              return (
                <li key={i} className="relative w-2/6 h-0 p-[16%]">
                  <div className="absolute top-0 left-0 w-full h-full p-2">
                    <div className="relative w-full h-full rounded-md overflow-hidden cursor-pointer"  onClick={() => openLightboxOnSlide(i + 1)} >
                      <Image src={item} alt="" width={200} height={200} className="w-full h-full object-cover" />
                      <div className="absolute top-0 left-0 w-full h-full transition-colors duration-300 hover:bg-black/45" />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <FsLightbox toggler={lightboxController.toggler} onOpen={() =>document.documentElement.style.overflow = "hidden" } onClose={() => document.documentElement.style.overflow = "auto" } sources={gallery.slice(0, 9)} exitFullscreenOnClose={true} slide={lightboxController.slide} />

    </div>
  );
}
