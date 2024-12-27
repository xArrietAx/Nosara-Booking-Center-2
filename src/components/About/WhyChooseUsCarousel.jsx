"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

export function WhyChooseUsCarousel({ data }) {
  return (
    <Swiper
      modules={[Autoplay]}
      className="max-w-[475px] mt-7"
      spaceBetween={5}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={2}
      loop={true}
      breakpoints={{ 500: { slidesPerView: 4 }, 350: { slidesPerView: 3 } }}
    >
      {[...data, ...data].map((item, i) => {

        return (
          <SwiperSlide key={i}>
            <div className="relative flex items-center justify-center h-16">
              <span className="z-40 font-bold text-white text-sm uppercase">{item.title}</span>
              <Image src={item.img} alt="" width={250} height={150} className="absolute top-0 left-0 w-full h-full object-cover" />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
