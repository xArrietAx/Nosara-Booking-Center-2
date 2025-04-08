"use client";

import { CarouselTour } from "./CarouselTour";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Image from "next/image";

export function Gallery({ images }) {
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
    <section className="mt-10">
      <div className="container">

        <div className="hidden justify-between gap-6 lg:flex">
          <div className="relative w-full h-0 pb-[50%] rounded-lg overflow-hidden" onClick={() => openLightboxOnSlide(1)}>
            <Image
              src={images[0]}
              alt=""
              width={800}
              height={800}
              priority
              className="absolute top-0 left-0 w-full h-full bg-secondary object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
            {images.slice(1).map((item, i) => {
              return (
                <div
                  className="relative w-full h-full rounded-lg overflow-hidden"
                  key={item + Math.random()} onClick={() => openLightboxOnSlide(i + 2)}
                >
                  <Image
                    src={item}
                    alt=""
                    width={300}
                    height={300}
                    className="absolute top-0 left-0 w-full h-full bg-secondary object-cover"
                  />
                </div>
              );
            })}
          </div>

        </div>

        <CarouselTour images={images} openLightboxOnSlide={openLightboxOnSlide} />

      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        onOpen={() => (document.documentElement.style.overflow = "hidden")}
        onClose={() => (document.documentElement.style.overflow = "auto")}
        sources={images}
        exitFullscreenOnClose={true}
        slide={lightboxController.slide}
      />
    </section>
  );
}
