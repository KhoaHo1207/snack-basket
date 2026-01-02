"use client";

import vendors from "@/app/JsonData/Vendors.json";
import Image from "next/image";
export default function Vendors() {
  const bgColors = [
    "#F8EAE4",
    "#DEE6F3",
    "#DAF2DB",
    "#EBF1DA",
    "#F4F6E6",
    "#E6F6F6",
    "#F6E6F6",
    "#F8EAE4",
  ];
  return (
    <>
      <div className="px-[8%] lg:px-[12%] py-10">
        <div className="title my-10 w-full flex flex-col lg:flex-row justify-between items-center">
          <div className="text-5xl Unbounded">Weekly Top Vendors.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-16 mt-20">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="vendor-wrap border border-gray-200 relative rounded-2xl p-5 shadow hover:shadow-lg hover:translate-y-2 transition-all duration-300 bg-white cursor-pointer flex flex-col items-center text-center"
              style={{ backgroundColor: bgColors[index % bgColors.length] }}
            >
              <div className="flex flex-col items-center justify-center mb-3">
                <Image
                  src={vendor.vendorMain}
                  alt={vendor.title}
                  width={120}
                  height={120}
                  className="absolute -top-9 object-contain rounded-full border-t border-gray-300 p-4"
                  style={{
                    backgroundColor: bgColors[index % bgColors.length],
                  }}
                />
              </div>

              <div className="mt-18">
                <h2 className="text-xl font-semibold hover:text-[var(--prim-color)] transition-all cursor-pointer">
                  {vendor.title}
                </h2>
                <p className="text-gray-500 text-center text-lg mt-1">
                  {vendor.time}
                </p>
                <p className="bg-[var(--prim-color)] xp-4 mt-3 text-white text-xl p-2 rounded mb-4 inline-block">
                  {vendor.off}
                </p>
              </div>

              <div className="flex justify-between gap-2 mt-2">
                {vendor.vendors.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Vendor ${index + 1}`}
                    width={100}
                    height={100}
                    className="bg-white p-4 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
