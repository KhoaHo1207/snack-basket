"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type WishlistItem = {
  Id: string;
  title: string;
  price: string;
  review: string;
  image: string;
};
type CartItem = WishlistItem & { quantity: number };
export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localstorage

  useEffect(() => {
    const loadWishlist = () => {
      try {
        const wishlist: WishlistItem[] = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setWishlistItems(wishlist);
      } catch (error) {
        console.error("Error loading wishlist:", error);
        setWishlistItems([]);
      }
    };
    loadWishlist();
    window.addEventListener("wishlistUpdate", loadWishlist);
    return () => {
      window.removeEventListener("wishlistUpdate", loadWishlist);
    };
  }, []);

  // Remove Product from Wishlist
  const handleRemove = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.Id !== productId
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdate"));
    toast.success("Product removed from wishlist");
  };

  //Add to Cart
  const handleAddToCart = (product: WishlistItem) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Product added to cart");
  };
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-5 bg-[#E6F9EF]">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Wishlist</h2>
          <div className="flex">
            <Link href={"/"} className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Wishlist
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        {wishlistItems.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2 rounded">
            Your Wishlist is Empty!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              {/* Desktop List */}
              <table className="min-w-full border border-gray-300 rounded hidden md:table">
                <thead className="bg-[var(--prim-light)]">
                  <tr>
                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Product
                    </th>
                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Price
                    </th>
                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left">
                      Stock Status
                    </th>
                    <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left cursor-pointer">
                      Add to Cart
                    </th>
                    <th className="py-3 px-4 Unbounded font-normal text-left cursor-pointer">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-300 ">
                      <td className="py-3 px-4 flex items-center gap-3 border-r border-gray-300">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={90}
                          height={90}
                          className="object-contain rounded"
                        />
                        <div className="flex flex-col">
                          <p className="font-medium Unbounded text-xl">
                            {item.title}
                          </p>
                          <h6 className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <i className="bi bi-shop text-[var(--prim-color)]"></i>{" "}
                            By Lucky Supermarket
                          </h6>
                          <span className="flex items-center text-yellow-500 text-md">
                            <i className="bi bi-star-fill me-1"></i>{" "}
                            {item.review} Reviews
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 Unbounded border-r border-gray-300">
                        $
                        {parseFloat(
                          item.price.replace(/[^0-9.-]+/g, "")
                        ).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 Unbounded border-r border-gray-300">
                        In Stock
                      </td>
                      <td className="px-3 border-r border-gray-300">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-ful px-4 py-2 text-sm font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-lg hover:bg-[var(--prim-color)] hover:text-white cursor-pointer transition-all"
                        >
                          Add to Cart <i className="bi bi-cart"></i>
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                          onClick={() => handleRemove(item.Id)}
                        >
                          X Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile List */}
              <div className="md:hidden space-y-4">
                {wishlistItems.map((item, index) => {
                  const price = parseFloat(
                    item.price.replace(/[^0-9.-]+/g, "")
                  ).toFixed(2);
                  return (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex gap-4"
                    >
                      <div className="w-24 h-24 rounded-lg bg-[var(--prim-light)] flex items-center justify-center overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="font-medium Unbounded text-lg">
                            {item.title}
                          </p>
                          <h6 className="text-sm text-gray-500 flex items-center gap-1">
                            <i className="bi bi-shop text-[var(--prim-color)]"></i>
                            By Lucky Supermarket
                          </h6>
                          <span className="flex items-center text-yellow-500 text-sm">
                            <i className="bi bi-star-fill me-1"></i>
                            {item.review} Reviews
                          </span>
                        </div>
                        <div className="text-base Unbounded">${price}</div>
                        <div className="text-sm text-green-600">In Stock</div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 px-4 py-2 text-sm font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-lg hover:bg-[var(--prim-color)] hover:text-white cursor-pointer transition-all"
                          >
                            Add to Cart <i className="bi bi-cart"></i>
                          </button>
                          <button
                            className="flex-1 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer transition-all"
                            onClick={() => handleRemove(item.Id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
