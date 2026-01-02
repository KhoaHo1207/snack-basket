"use client";

import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import products from "@/app/JsonData/HotDeals.json";
import hotDealBanner from "@/public/hot-deals-img.png";
import toast from "react-hot-toast";
import Link from "next/link";

export default function HotDeals() {
  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item.Id === product.Id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Product added to cart");
  };

  const handleAddToWishlist = (product: any) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingWishlist = wishlist.find(
      (item: any) => item.Id === product.Id
    );

    if (existingWishlist) {
      existingWishlist.quantity += 1;
    } else {
      wishlist.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist"));
    toast.success("Product added to wishlist");
  };
  return (
    <>
      <div className="px-[8%] lg:px-[12%] pb-10">
        <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-center">
          <div className="text-5xl Unbounded">Today's Hot Deals.</div>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-5">
          <div className="w-full lg:w-1/3 p-10 rounded-2xl hot-deal-banner flex flex-col justify-center items-center">
            <Image src={hotDealBanner} alt="hotDealBanner" />
            <h1 className="text-4xl text-white Merienda my-5">
              Fresh Vegetables
            </h1>
            <p className="text-center text-white font-semibold mb-3">
              Get the freshest vegetables delivered to your doorstep. Healthy,
              organic, and full of flavor!
            </p>

            <button className="px-5 py-3 rounded-full text-[var(--prim-color)] font-bold mt-5 bg-white hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300 cursor-pointer">
              Shop Now <i className="bi bi-arrow-right p-2"></i>
            </button>
          </div>
          <div className="w-full lg:w-2/3">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              modules={[Autoplay]}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                1200: { slidesPerView: 3 },
                991: { slidesPerView: 2.5 },
                768: { slidesPerView: 2 },
                576: { slidesPerView: 2 },
                480: { slidesPerView: 2 },
                320: { slidesPerView: 2 },
              }}
            >
              {products.map((product, index) => (
                <SwiperSlide key={index}>
                  <div className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300">
                    <div className="relative flex justify-center items-center w-full h-52">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={180}
                        height={180}
                        className="object-contain mt-10"
                      />

                      <div
                        className="absolute top-0 right-0 w-[50px] h-[50px] rounded-full bg-[var(--prim-light)] text-[var(--prim-color)] flex items-center justify-center hover:bg-[var(--prim-color)] hover:text-[var(--prim-light)] transition-all duration-300 cursor-pointer"
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <i className="bi bi-balloon-heart text-xl"></i>
                      </div>
                      <span
                        className={`absolute off-product top-0 left-0 px-4 py-2 Merienda text-xs font-bold text-white rounded ${
                          product.sale === "New"
                            ? "bg-yellow-400"
                            : product.sale.includes("%")
                            ? "bg-red-500"
                            : "opacity-0"
                        } `}
                      >
                        {product.sale}
                      </span>
                    </div>

                    <Link
                      href={{
                        pathname: "/UI-Components/Shop",
                        query: { id: product.Id },
                      }}
                    >
                      <div className="space-y-1 mt-5 product-info">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 text-sm line-through">
                            {product.lessprice}
                          </span>
                          <span className="text-xl font-semibold">
                            {product.price}
                          </span>
                          <span className="text-gray-500 text-sm">/Qty</span>
                        </div>
                        <h6 className="text-sm text-gray-500 flex items-center gap-1">
                          <i className="bi bi-shop text-[var(--prim-color)]"></i>
                          By Lucky Supermarket
                        </h6>
                        <h2 className="text-sm font-normal Unbounded my-2 hover:text-[var(--prim-color)] transition-all duration-300">
                          {product.title}
                        </h2>
                        <span className="flex items-center text-yellow-500 text-base">
                          <i className="bi bi-star-fill me-1"></i>
                          {product.review}
                        </span>

                        <h3 className="mt-2 Unbounded text-base text-gray-600">
                          Sold: {product.sold}
                        </h3>
                      </div>
                    </Link>

                    <div
                      className="flex justify-between items-center mt-4"
                      onClick={() => handleAddToCart(product)}
                    >
                      <button className="px-4 py-2 font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-lg text-base hover:bg-[var(--prim-color)] hover:text-white cursor-pointer transition-all w-full">
                        Add <i className="bi bi-cart"></i>
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
