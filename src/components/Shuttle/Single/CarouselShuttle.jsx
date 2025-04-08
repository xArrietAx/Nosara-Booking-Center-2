"use client";

import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/Button";
import FsLightbox from "fslightbox-react";
import { useState } from "react";
import Image from "next/image";

export default function CarouselShuttle({ images }) {

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

  images = [...images, ...images]

  return (
    <>
      <div className="relative my-12">
        <Swiper
          spaceBetween={24}
          navigation={{
            nextEl: ".rental-btn-next",
            prevEl: ".rental-btn-prev",
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Thumbs, Autoplay]}
        >
          {images.map((item, i) => {
            return (
              <SwiperSlide
                className="relative w-full h-0 p-[35%] rounded-lg overflow-hidden md:p-[30%]"
                onClick={() => openLightboxOnSlide(i + 1)}
                key={item + Math.random()}
              >
                <Image
                  src={item}
                  alt=""
                  width={700}
                  height={700}
                  priority
                  className="absolute top-0 left-0 w-full h-full bg-secondary object-cover"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Button
          isIconOnly="sm"
          className="rental-btn-prev absolute top-[50%] left-5 z-10"
          variant="secondary"
        >
          <i className="icon-[ion--chevron-back]" />
        </Button>
        <Button
          isIconOnly="sm"
          className="rental-btn-next absolute top-[50%] right-5 z-10"
          variant="secondary"
        >
          <i className="icon-[ion--chevron-forward]" />
        </Button>
      </div>
      <FsLightbox toggler={lightboxController.toggler} onOpen={() => (document.documentElement.style.overflow = "hidden")} onClose={() => (document.documentElement.style.overflow = "auto")} sources={images} exitFullscreenOnClose={true} slide={lightboxController.slide} />
    </>
  );
}