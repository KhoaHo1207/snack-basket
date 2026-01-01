"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import BestDeals from "@/app/JsonData/BestDeals.json";

interface ProductType {
  Id: string;
  title?: string;
  Name?: string;
  ProductImage?: string;
  image?: string;
  price?: string;
  Price?: string;
}
export default function MiddleNav() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Search Stats
  const [searchTerm, setSerachterm] = useState("");
  const [results, setResults] = useState<ProductType[]>([]);

  const allProducts: ProductType[] = useMemo(() => [...BestDeals], []);

  // Filter Product By Search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter((p) =>
      (p.Name || p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [searchTerm, allProducts]);

  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const uniqueCart = new Set(cart.map((item: any) => item.Id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id));

      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };

    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    return () => {
      window.removeEventListener("storageUpdate", loadCounts);
    };
  }, []);

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
            value={searchTerm}
            onChange={(e) => setSerachterm(e.target.value)}
          />
          <button className="bg-[var(--prim-color)] text-white px-3 rounded-r cursor-pointer ">
            <i className="bi bi-search"></i>
          </button>

          {/* Search Result */}
          {results.length > 0 && (
            <div className="search-result absolute top-12 left-0 bg-white border-gray-300 rounded-md shadow-lg z-50 p-2 grid grid-cols-1 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
              {results.map((item, index) => (
                <Link
                  href={{
                    pathname: "/UI-Components/Shop",
                    query: { id: item.Id },
                  }}
                  key={index}
                  onClick={() => setSerachterm("")}
                >
                  <div className="flex flex-col items-center p-2 border border-gray-300 rounded hover:shadow transition-all">
                    <img
                      src={item.ProductImage || item.image}
                      alt={item.Name || item.title}
                      width={100}
                      height={100}
                      className="w-full object-cover rounded-lg"
                    />
                    <h3 className="font-semibold text-sm text-center mt-2">
                      {item.Name || item.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {item.price || item.Price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

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
          <Link href={"/UI-Components/Pages/wishlist"} className="relative">
            <i className="bi bi-heart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </i>
          </Link>
          {/* Cart */}
          <Link href={"#"} className="relative">
            <i className="bi bi-cart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}
