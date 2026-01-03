import Banner from "./Banner/Banner";
import BestSales from "./BestSales/BestSales";
import Category from "./Categories/category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import HotDeals from "./HotDeals/Hot-Deals";
import Offers from "./Offer-Banner/Offers";
import OrganicFood from "./Organic-Food/OrganicFood";
import Banners from "./Promotion-Banner/Banners";
import Recommend from "./Recommend/Recommend";
import ShortProducts from "./Short-Products/Products";
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
      <BestSales />
      <Banner />
      <OrganicFood />
      <ShortProducts />
    </>
  );
}
