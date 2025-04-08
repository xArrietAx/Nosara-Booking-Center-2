"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { HouseCard } from "../ui/Cards/HouseCard";

export function StayCarousel({ stays }) {

    stays = [...stays, ...stays]

  return (
    <Swiper
    modules={[ Pagination, Autoplay ]}
      spaceBetween={24}
      slidesPerView={1} 
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true} 
      pagination={{ clickable: true, el:".stay-pagination"  }}
      breakpoints={{
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        }
      }}
    >
      {stays.map((item, i) => {
        return (
          <SwiperSlide key={i}>
            <HouseCard data={item} />
          </SwiperSlide>
        );
      })}
    <div className="stay-pagination !w-fit mx-auto mt-5" />
    </Swiper>
  );
}