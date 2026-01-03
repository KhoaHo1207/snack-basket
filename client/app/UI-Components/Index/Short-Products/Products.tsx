"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import products from "@/app/JsonData/ShortProducts.json";
type Product = {
  Id: number | string;
  image: string | StaticImageData;
  title: string;
  lessprice: string;
  price: string;
  review: string;
};

export default function ShortProducts() {
  const ensureLoopable = (items: Product[]) =>
    items.length === 1 ? [...items, ...items] : items;

  const sections: { title: string; items: Product[] }[] = [
    { title: "Featured Product", items: ensureLoopable(products.Featured) },
    { title: "Top Selling", items: ensureLoopable(products.TopSelling) },
    { title: "On Sale", items: ensureLoopable(products.OnSale) },
    { title: "Top Rated", items: ensureLoopable(products.TopRated) },
  ];
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col rounded-2xl gap-2 p-3 border border-gray-300 transition-all duration-300 cursor-pointer"
          >
            <div className="short-product-title bg-(--prim-light) py-2 px-4 rounded-full">
              <h2 className="Unbounded text-xl inline-block pb-2">
                {section.title}
              </h2>
            </div>
            <div className="w-full mt-5">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                speed={1200}
              >
                <SwiperSlide>
                  {section.items.map((item, index) => (
                    <Link
                      key={item.Id ?? index}
                      href={{
                        pathname: "/UI-Components/Shop",
                        query: { id: item.Id },
                      }}
                    >
                      <div className="short-product w-full flex justify-between items-center gap-3 mb-3">
                        <div className="w-1/3">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={200}
                            height={200}
                            className="object-contain border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="w-full short-product-info flex flex-col">
                          <h5 className="flex gap-1 text-gray-400 text-[12px]">
                            4.8
                            <i className="bi bi-star-fill text-yellow-500"></i>{" "}
                            {item.review}
                          </h5>
                          <h2 className="Unbounded hover:text-(--prim-color) transition-all duration-300">
                            {item.title}
                          </h2>
                          <div className="flex gap-2">
                            <h3 className="font-semibold">{item.price}</h3>
                            <del className="text-gray-400 text-sm">
                              {item.lessprice}
                            </del>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
