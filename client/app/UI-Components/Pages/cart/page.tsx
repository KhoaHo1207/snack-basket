"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  Id: string;
  title: string;
  price: string;
  review: string;
  qty?: number;
  image: string;
};
export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const estimatedTaxes = 10;
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const quantity = item.qty ?? 1;
      const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
      return acc + priceNum * quantity;
    }, 0);
  }, [cartItems]);

  useEffect(() => {
    const loadCart = () => {
      try {
        const cart: CartItem[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        setCartItems(cart);
      } catch (error: unknown) {
        console.error("Error loading cart:", error);
        setCartItems([]);
      }
    };
    loadCart();
    window.addEventListener("storageUpdate", loadCart);
    return () => {
      window.removeEventListener("storageUpdate", loadCart);
    };
  }, []);

  // Remove Product from Cart
  const handleRemove = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.Id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdate"));
    toast.success("Product removed from Cart");
  };

  const handleQtyChange = (productId: string, qty: number) => {
    const updatedCart = cartItems.map((item) =>
      item.Id === productId ? { ...item, qty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdate"));
    toast.success("Quantity updated");
  };
  return (
    <div>
      <div className="px-[8%] lg:px-[12%] py-5 bg-[#E6F9EF]">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Cart</h2>
          <div className="flex">
            <Link href={"/"} className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Cart
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        {cartItems.length === 0 ? (
          <p className="text-lg bg-red-200 px-5 py-2 rounded">
            Your Cart is Empty!
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 overflow-x-auto">
              <div className="overflow-x-auto">
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
                        Quantity
                      </th>
                      <th className="py-3 px-4 Unbounded border-r border-gray-300 font-normal text-left cursor-pointer">
                        Subtotal
                      </th>
                      <th className="py-3 px-4 Unbounded font-normal text-left cursor-pointer">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: CartItem) => {
                      const quantity = item.qty ?? 1;
                      const priceNum =
                        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                      const itemSubtotal = priceNum * quantity;

                      return (
                        <tr key={item.Id} className="border-b borde-gray-300">
                          <td className="py-3 px-4 flex items-center gap-3">
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
                          <td className="py-3 px-4 Unbounded">
                            ${parseFloat(priceNum.toFixed(2))}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center border w-24 rounded">
                              <button
                                className="px-2 text-lg cursor-pointer"
                                onClick={() =>
                                  handleQtyChange(
                                    item.Id,
                                    Math.max(1, quantity - 1)
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="px-4">{quantity}</span>
                              <button
                                className="px-2 text-lg cursor-pointer"
                                onClick={() =>
                                  handleQtyChange(item.Id, quantity + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4 Unbounded">
                            ${itemSubtotal.toFixed(2)}
                          </td>

                          <td className="py-3 px-4 Unbounded">
                            <button
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                              onClick={() => handleRemove(item.Id)}
                            >
                              X Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Mobile List */}
                <div className="md:hidden space-y-4">
                  {cartItems.map((item) => {
                    const quantity = item.qty ?? 1;
                    const priceNum =
                      parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                    const itemSubtotal = priceNum * quantity;

                    return (
                      <div
                        key={item.Id}
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
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
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
                            <button
                              className="text-red-500 hover:text-red-700 cursor-pointer text-sm"
                              onClick={() => handleRemove(item.Id)}
                            >
                              Remove
                            </button>
                          </div>

                          <div className="text-base Unbounded">
                            ${priceNum.toFixed(2)}
                          </div>
                          <div className="text-sm text-green-600">In Stock</div>

                          <div className="flex items-center gap-2">
                            <button
                              className="flex-1 px-3 py-2 text-sm font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-lg hover:bg-[var(--prim-color)] hover:text-white transition-all"
                              onClick={() =>
                                handleQtyChange(
                                  item.Id,
                                  Math.max(1, quantity - 1)
                                )
                              }
                            >
                              - Qty ({quantity})
                            </button>
                            <button
                              className="flex-1 px-3 py-2 text-sm font-semibold text-white bg-[var(--prim-color)] rounded-lg hover:opacity-90 transition-all"
                              onClick={() =>
                                handleQtyChange(item.Id, quantity + 1)
                              }
                            >
                              + Qty
                            </button>
                          </div>

                          <div className="text-sm font-semibold text-gray-700">
                            Subtotal: ${itemSubtotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/4 sticky h-full top-22 left-40">
              <div className="bg-[var(--prim-light)] p-5 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Subtotal</span>
                  <span className="Unbounded">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Esimated Delivery</span>
                  <span className="Unbounded">Free</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="Unbounded">Esimated Taxes</span>
                  <span className="Unbounded">
                    USD {estimatedTaxes.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-bold border-t border-gray-400 pt-2 text-lg mb-2">
                  <span className="Unbounded">Total</span>
                  <span className="Unbounded">
                    ${(subtotal + estimatedTaxes).toFixed(2)}
                  </span>
                </div>

                <button className="w-full mt-2 py-3 cursor-pointer bg-[var(--prim-color)] text-white rounded-lg hover:bg-black transition-all">
                  <Link href={"/UI-Components/Pages/checkout"}>
                    Proceed To Checkout
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
