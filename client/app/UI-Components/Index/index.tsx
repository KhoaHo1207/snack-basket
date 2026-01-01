import Category from "./Categories/category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import Offers from "./Offer-Banner/Offers";
import Banners from "./Promotion-Banner/Banners";

export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <Banners />
      <Deals />
      <Offers />
    </>
  );
}
