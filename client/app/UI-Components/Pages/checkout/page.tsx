"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type CartItem = {
  Id: string;
  title: string;
  price: string;
  review: string;
  qty?: number;
  image: string;
};
export default function Checkout() {
  const [deliveryOption, setDeliveryOption] = useState<"ship" | "pickup">(
    "ship"
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saveCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(saveCart);
  }, []);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully");
  };

  //   Caculate totals
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    const quantity = item.qty ?? 1;
    return acc + price * quantity;
  }, 0);

  const estimatedTaxes = (totalPrice * 0.1).toFixed(2);
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-5 bg-[#E6F9EF]">
        <div className="flex justify-between items-center">
          <h2 className="Unbounded text-2xl">Checkout</h2>
          <div className="flex">
            <Link href={"/"} className="text-2xl Unbounded">
              Home &nbsp; :
            </Link>
            <h2 className="Unbounded text-2xl text-[var(--prim-color)]">
              &nbsp; Checkout
            </h2>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-7">
            <h5 className="mb-2 Unbounded text-2xl">Contact</h5>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2 mb-3"
              placeholder="Email or Phone Number"
            />

            <div className="mb-4">
              <input type="checkbox" id="newsCheck" className="me-2" />
              <label htmlFor="newsCheck" className="cursor-pointer">
                Email me with news and offers
              </label>
            </div>

            <h5 className="mb-2 Unbounded text-2xl">Delivery</h5>
            <div className="mb-3 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="deliveryoption"
                  checked={deliveryOption === "ship"}
                  onChange={() => setDeliveryOption("ship")}
                />
                <span>Standard Delivery</span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="deliveryoption"
                  checked={deliveryOption === "pickup"}
                  onChange={() => setDeliveryOption("pickup")}
                />
                <span>Pickup in Store</span>
              </label>
            </div>

            {deliveryOption === "ship" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <select
                  name=""
                  id=""
                  className="form-select border border-gray-300 rounded w-full appearance-none p-2 md:col-span-2"
                >
                  <option value="Thai Land">Thai Land</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Laos">Laos</option>
                </select>
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="First Name (Optional)"
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Last Name"
                />
              </div>
            )}

            {deliveryOption === "pickup" && (
              <div className="my-4 p-3 border rounded border-red-700 text-red-700 bg-red-100">
                <strong>No Stores Available with your item</strong>
                <div>
                  <Link href={"#"} className="underline">
                    Ship to address
                  </Link>{" "}
                  instead
                </div>
              </div>
            )}

            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 mb-3"
              placeholder="Address"
            />
            <input
              type="text"
              className="border border-gray-300 rounded w-full p-2 mb-3"
              placeholder="Apartment, Suite, etc. (Optional)"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2 mb-3"
                placeholder="City"
              />
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2 mb-3"
                placeholder="Postal Code. (Optional)"
              />
            </div>

            <div className="mb-4">
              <input type="checkbox" id="saveInfo" className="me-2" />
              <label htmlFor="saveInfo" className="cursor-pointer">
                Save this information for next time
              </label>
            </div>

            <h5 className="mb-2 Unbounded text-2xl">Shipping Method</h5>

            <div className="p-3 flex justify-between items-center border borde-gray-300 rounded-lg mb-3">
              <span>Standard</span>
              <span className="text-green-600">FREE</span>
            </div>

            <h4 className="mt-5 mb-2 Unbounded text-2xl">Payment</h4>
            <p className="text-gray-500 mb-3">
              All transaction are secure and encrypted.
            </p>

            <div className="border border-gray-300 rounded p-3 mb-3">
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2 mb-2"
                placeholder="Card Number"
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Expiration Date (MM/ YYYY)"
                />
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Security Code"
                />
              </div>
              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="name on card"
              />
            </div>

            <button
              className="w-full py-2 bg-[var(--prim-color)] cursor-pointer text-white rounded hover:bg-black transition-all duration-300"
              onClick={handlePlaceOrder}
            >
              Pay now
            </button>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-gray-300 p-4 rounded shadow">
              <h5 className="font-bbold mb-3 flex items-center gap-2 Unbounded">
                <i className="ri-shopping-cart-line text-[var(--prim-color)]"></i>{" "}
                Order Summary
              </h5>
              {cartItems.length === 0 ? (
                <p className="text-gray-500"> Your cart is empty</p>
              ) : (
                cartItems.map((item, index) => {
                  const quantity = item.qty ?? 1;
                  const priceNum =
                    parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
                  const itemSubtotal = priceNum * quantity;
                  return (
                    <div
                      key={index}
                      className="flex items-center mb-3 border-b border-gray-300 pb-3 gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain rounded"
                      />

                      <div className="flex flex-col">
                        <h6 className="mb-1 Unbounded">{item.title}</h6>
                        <small className="font-bold text-[var(--prim-color)]">
                          $${itemSubtotal.toFixed(2)}
                        </small>
                      </div>
                    </div>
                  );
                })
              )}

              <div className="flex justify-between text-sm pt-2">
                <span>Subtotal</span>
                <span className="Unbounded">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span>Shipping</span>
                <span className="Unbounded">Enter Address</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span>Estimated Taxes</span>
                <span className="Unbounded">${estimatedTaxes}</span>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span>Total</span>
                <span className="Unbounded">
                  ${(totalPrice + parseFloat(estimatedTaxes)).toFixed(2)}
                </span>
              </div>

              <button
                className="w-full my-3 py-2 bg-green-600 cursor-pointer text-white hover:bg-green-700 transition-all duration-300"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>

              <Link
                href={"/UI-Components/Pages/cart"}
                className="block text-center py-2 border rounded hover:bg-gray-100 transition-all"
              >
                Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
