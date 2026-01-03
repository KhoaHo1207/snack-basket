"use client";

import newsletter from "@/public/newsletter-img.png";
import Image from "next/image";

export default function Newsletter() {
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="p-10 newsletter-wrap text-white rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-5">
        <div className="w-full lg:w-1/2">
          <h1 className="Unbounded text-4xl lg:text-6xl">
            Don't Miss Out on Grocery Deals
          </h1>
          <h3 className="text-base lg:text-2xl my-4 Unbounded">
            SING UP FOR THE UPDATE NEWSLETTER
          </h3>

          <div className="mt-7 border border-gray-300 rounded-2xl p-2 flex justify-between items-center">
            <input
              type="text"
              className="w-full h-10 outline-none"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 my-2 text-lg font-semibold text-white bg-[var(--prim-color)] rounded-2xl cursor-pointer hover:opacity-90">
              Subscribe
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src={newsletter}
            alt="newsletter"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
