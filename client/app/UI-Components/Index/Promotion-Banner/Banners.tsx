import Image, { StaticImageData } from "next/image";

import promotionBanner1 from "@/public/promotional-banner-img1.png";
import promotionBanner2 from "@/public/promotional-banner-img2.png";
import promotionBanner3 from "@/public/promotional-banner-img3.png";
import promotionBanner4 from "@/public/promotional-banner-img4.png";

type BannerType = {
  image: StaticImageData;
  heading: string;
};

const banners: BannerType[] = [
  { image: promotionBanner1, heading: "Everyday\nFresh Meat" },
  { image: promotionBanner2, heading: "Daily Fresh\nVegetables" },
  { image: promotionBanner3, heading: "Everyday\nfresh Milk" },
  { image: promotionBanner4, heading: "Everyday\nFresh Fruits" },
];
export default function Banners() {
  return (
    <div className="px-[8%] lg:px-[12%] py-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {banners.map((banner, index) => (
          <div key={index} className="relative">
            <Image
              src={banner.image}
              alt={banner.heading}
              className="w-full h-full object-cover"
            />
            <div className="banner-content absolute bottom-[5%] left-[5%]">
              <h2 className="Merienda font-bold text-2xl leading-11 whitespace-pre-line">
                {banner.heading}
              </h2>
              <button className="px-5 py-3 rounded-full text-white font-bold mt-5 bg-[var(--prim-color)] hover:bg-white hover:text-[var(--prim-color)] transition-all duration-300 cursor-pointer">
                Shop Now <i className="bi bi-arrow-right ps-2"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
