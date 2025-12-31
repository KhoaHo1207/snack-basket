"use client";

import { useRef } from "react";

import Hero1 from "@/public/hero-img1.png";
import Hero2 from "@/public/hero-img2.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function Hero() {
  const prevref = useRef<HTMLButtonElement>(null);
  const nextref = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="relative p-10 px-20 Hero flex items-center gap-5">
        <Swiper
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // Attach navigation refs before init so Swiper can find them
            if (
              typeof swiper.params.navigation === "object" &&
              swiper.params.navigation !== null
            ) {
              swiper.params.navigation.prevEl = prevref.current;
              swiper.params.navigation.nextEl = nextref.current;
            }
          }}
          navigation={true}
          onInit={(swiper) => {
            if (
              typeof swiper.params.navigation === "object" &&
              swiper.params.navigation !== null
            ) {
              swiper.params.navigation.prevEl = prevref.current;
              swiper.params.navigation.nextEl = nextref.current;
            }
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between ">
              <div className="w-full lg:w-1/2">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Daily Grocery Order and Get Express Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Order your daily groceries online and enjoy express delivery
                  straight to your doorstep. Fresh produce, essentials, and
                  more—fast, convenient, and reliable service for your everyday
                  needs.
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] border border-transparent hover:border-[var(--prim-color)] transition-all duration-300 cursor-pointer">
                  Shop Now <i className="bi bi-cart3 ps-3"></i>
                </button>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero1} alt="Hero 1" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="hero-wrap w-full flex flex-col lg:flex-row items-center justify-between ">
              <div className="w-full lg:w-1/2">
                <h1 className="Merienda text-2xl lg:text-[3.6rem] font-bold">
                  Daily Grocery Order and Get Express Delivery
                </h1>
                <p className="w-[80%] my-3">
                  Order your daily groceries online and enjoy express delivery
                  straight to your doorstep. Fresh produce, essentials, and
                  more—fast, convenient, and reliable service for your everyday
                  needs.
                </p>
                <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] border border-transparent hover:border-[var(--prim-color)] transition-all duration-300 cursor-pointer">
                  Shop Now <i className="bi bi-cart3 ps-3"></i>
                </button>
              </div>
              <div className="hero-image w-full lg:w-1/2">
                <Image src={Hero2} alt="Hero 2" className="Hero-image" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
