"use client";

import Link from "next/link";
import { useState } from "react";

export default function MiddleNav() {
  const [cartCount, setCartCount] = useState(10);
  const [wishlistCount, setWishlistCount] = useState(9);
  return (
    <div className="w-full bg-[var(--prim-light)] border-b border-gray-300 relative">
      <div className="flex items-center justify-between py-5 px-[8%] lg:px-[12%]">
        {/* Logo */}
        <Link href={"/"} className="text-3xl font-bold Merienda text-black">
          Snack <span className="text-[var(--prim-color)]">Basket</span>
        </Link>

        {/* Serach */}
        <div className="flex flex-1 ms-6 lg:mx-0 max-w-xl relative">
          <input
            type="text"
            placeholder="Search for a Product or Brand..."
            className="flex-1 border px-3 py-2 rounded-s-lg border-gray-400 outline-none"
          />
          <button className="bg-[var(--prim-color)] text-white px-3 rounded-r cursor-pointer ">
            <i className="bi bi-search"></i>
          </button>

          {/* Location Dropdown */}
          <div className="hidden lg:flex text-sm ms-5 bg-white items-center ps-4 rounded-lg border border-gray-400">
            <i className="bi bi-geo-alt text-lg text-[var(--prim-color)]">
              <select
                name="location"
                id=""
                className="px-3 rounded-lg text-[var(--prim-color)] font-semibold focus:border-[var(--prim-color)] appearance-none cursor-pointer outline-none"
                defaultValue={"New York"}
              >
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Phoenix">Phoenix</option>
                <option value="Philadelphia">Philadelphia</option>
              </select>
            </i>
          </div>
        </div>

        {/* Wishlist & Cart */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Wishlist */}
          <Link href={"#"} className="relative">
            <i className="bi bi-heart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
              <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                {wishlistCount || 0}
              </span>
            </i>
          </Link>
          {/* Cart */}
          <Link href={"#"} className="relative">
            <i className="bi bi-cart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
              <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                {cartCount || 0}
              </span>
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}
