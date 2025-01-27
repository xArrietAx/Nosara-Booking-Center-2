"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { PostCard } from "../ui/Cards/PostCard";
import { Navigation, Autoplay } from "swiper/modules";

export function BlogCarousel({ posts }) {
  return (
    <Swiper
    modules={[Navigation, Autoplay ]}
      spaceBetween={24}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{nextEl: ".blog-btn-next", prevEl:".blog-btn-prev" }}
      loop={true}
      className="pb-5"
      breakpoints={{
        1200: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
      }}
    >
      {posts.slice(0, 8).map(item => {
        return <SwiperSlide key={item.slug}>
        <PostCard data={item} />
      </SwiperSlide>
      })}
    </Swiper>
  );
}
