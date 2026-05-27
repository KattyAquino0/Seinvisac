"use client"; // si usas Next.js 13+ con app router

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const aliados = [
  { src: "/Images/lg1.png", alt: "3M" },
  { src: "/Images/lg2.png", alt: "MSA" },
  { src: "/Images/lg4.png", alt: "STEELPRO SAFETY" },
  { src: "/Images/lg5-.png", alt: "3M" },
  { src: "/Images/lg6.png", alt: "SHOWA" },
  { src: "/Images/lg7.png", alt: "SHOWA" },
  { src: "/Images/lg8.png", alt: "SHOWA" },
  { src: "/Images/lg9.png", alt: "SHOWA" },
  { src: "/Images/lg10.png", alt: "SHOWA" },
];

export default function AliadosCarousel() {
  return (
    <section className="bg-white w-full ">
      <div className="container mx-auto px-2 py-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          loop
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {aliados.map((aliado, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="border border-gray-300 bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center w-40 h-20 hover:shadow-md transition">
                <Image
                  src={aliado.src}
                  alt={aliado.alt}
                  width={100}
                  height={60}
                  className="object-contain  transition duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
