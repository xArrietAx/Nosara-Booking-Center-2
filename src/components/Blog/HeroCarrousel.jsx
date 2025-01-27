"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

export function HeroCarousel({ categories = [] }) {
  return (
    <Swiper 
    modules={[Navigation, Autoplay]} 
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      slidesPerView={1}
      loop={true}
      breakpoints={{
        1400: {
          slidesPerView: 5
        },
        1200: {
          slidesPerView: 4
        },
        768: {
          slidesPerView: 3
        },
        375: {
            slidesPerView: 2
        }
      }}
      
      >
      {categories.map(item => {
        return <SwiperSlide key={item.name}>
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="w-[6.3rem] h-[6.3rem] rounded-full bg-secondary overflow-hidden">
            <Image src={item.img} alt={item.name} width={400} height={400} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
            <Link href={item.url} className="link text-sm-bold">{item.name}</Link>
            <p className="text-xs text-text">{item.count} {item.label}</p>
            </div>
        </div>
      </SwiperSlide>
      })}
    </Swiper>
  );
}
