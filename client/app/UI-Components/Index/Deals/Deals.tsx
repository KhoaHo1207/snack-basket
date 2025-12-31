"use client";

import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import Deal1 from "@/public/Deals-bg1.png";
import Deal2 from "@/public/Deals-bg2.png";

type DealItem = {
  image: StaticImageData;
  title: string;
  description: string;
  className?: string;
};

type CartItem = {
  Id: number;
  quantity: number;
};

const deals: DealItem[] = [
  {
    image: Deal1,
    title: "Fresh Vegetables",
    description:
      "Shop fresh, healthy vegetables delivered daily. Taste the garden in every bite!",
  },
  {
    image: Deal2,
    title: "Daily Snacks",
    description:
      "Tasty daily snacks for every craving — fresh, fun, and ready to munch!",
    className: "deals-wrap2",
  },
  {
    image: Deal1,
    title: "Fresh Vegetables",
    description:
      "Shop fresh, healthy vegetables delivered daily. Taste the garden in every bite!",
  },
];

import products from "@/app/JsonData/BestDeals.json";

import toast from "react-hot-toast";

export default function Deals() {
  const hanldeAddToCart = (product: CartItem) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find(
      (item: CartItem) => item.Id === product.Id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Product added to cart");
  };
  return <div>Deals</div>;
}
