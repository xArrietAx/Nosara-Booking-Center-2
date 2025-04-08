import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Image from "next/image";

export function CarouselHouse({ images, openLightboxOnSlide }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  images = [...images, ...images]

  return (
    <div className="space-y-6 lg:hidden">

      <div className="relative">
      <Swiper
        spaceBetween={24}
        navigation={{ nextEl: ".rental-btn-next", prevEl:".rental-btn-prev" }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
      >
        {images.map((item, i) => {
          return (
            <SwiperSlide
              className="relative w-full h-0 p-[40%] rounded-lg overflow-hidden md:p-[35%]"
              onClick={() => openLightboxOnSlide(i + 1)}
              key={item + Math.random()}
            >
              <Image
                src={item}
                alt=""
                width={500}
                height={500}
                priority
                className="absolute top-0 left-0 w-full h-full bg-secondary object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
        <Button isIconOnly="sm" className="rental-btn-prev absolute top-[50%] left-5 z-10" variant="secondary" ><i className="icon-[ion--chevron-back]" /></Button>
        <Button isIconOnly="sm" className="rental-btn-next absolute top-[50%] right-5 z-10" variant="secondary" ><i className="icon-[ion--chevron-forward]" /></Button>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={24}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slidesPerView={2}
        modules={[Navigation, Thumbs, Autoplay]}
        breakpoints={{
          992: {
            loop: false
          },
          768: {
            slidesPerView: 4
          },
          575: {
            slidesPerView: 3
          }
        }}
      >
        {images.map((item, i) => {
          return (
            <SwiperSlide
              className="relative w-full h-0 p-[20%] rounded-lg overflow-hidden sm:p-[15%] md:p-[10%]"
              key={item + Math.random()}
            >
              <Image
                src={item}
                alt=""
                width={350}
                height={350}
                className="absolute top-0 left-0 w-full h-full bg-secondary object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

    </div>
  );
}
