"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { BlogCard } from "../ui/Cards/BlogCard";
import { Navigation, Autoplay } from "swiper/modules";

export function BlogCarousel({ Blogs }) {
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
      pagination={{ clickable: true }}
      className="pb-5"
      breakpoints={{
        992: {
          slidesPerView: 3
        },
        768: {
          slidesPerView: 2
        },
      }}
    >
      <SwiperSlide>
        <BlogCard type="Cultural" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news3.png" />
      </SwiperSlide>
      <SwiperSlide>
        <BlogCard type="Travel" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news.png" />
      </SwiperSlide>
      <SwiperSlide>
        <BlogCard type="Discovery" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news2.png" />
      </SwiperSlide>
      <SwiperSlide>
        <BlogCard type="Travel" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news.png" />
      </SwiperSlide>
      <SwiperSlide>
        <BlogCard type="Discovery" src="https://travila-nextjs.vercel.app/assets/imgs/page/homepage1/news2.png" />
      </SwiperSlide>
    </Swiper>
  );
}
