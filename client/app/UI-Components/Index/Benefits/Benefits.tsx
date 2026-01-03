import React from "react";

export default function Benefits() {
  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex justify-between items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
          <i className="bi bi-truck text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
          <div className="flex flex-col">
            <h2 className="font-semibold Unbounded">Free Shipping</h2>
            <p className="text-gray-700">
              Free shipping on all orders over VietNam
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
          <i className="bi bi-shield-lock text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
          <div className="flex flex-col">
            <h2 className="font-semibold Unbounded">Secure Payments</h2>
            <p className="text-gray-700">
              Free shipping on all orders over VietNam
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
          <i className="bi bi-emoji-smile text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
          <div className="flex flex-col">
            <h2 className="font-semibold Unbounded">100% Satisfaction</h2>
            <p className="text-gray-700">
              Free shipping on all orders over VietNam
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 px-3 py-5 rounded-lg bg-[var(--prim-light)]">
          <i className="bi bi-headset text-2xl rounded-full bg-[var(--prim-color)] px-3 py-2 text-white"></i>
          <div className="flex flex-col">
            <h2 className="font-semibold Unbounded">24/7</h2>
            <p className="text-gray-700">
              Free shipping on all orders over VietNam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
