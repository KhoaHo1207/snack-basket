import Category from "./Categories/category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import HotDeals from "./HotDeals/Hot-Deals";
import Offers from "./Offer-Banner/Offers";
import Banners from "./Promotion-Banner/Banners";
import Recommend from "./Recommend/Recommend";
import Vendors from "./Vendors/Vendors";

export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <Banners />
      <Deals />
      <Offers />
      <Recommend />
      <HotDeals />
      <Vendors />
    </>
  );
}
