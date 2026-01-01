import Category from "./Categories/category";
import Deals from "./Deals/Deals";
import Hero from "./Header/Hero";
import Offers from "./Offer-Banner/Offers";
import Banners from "./Promotion-Banner/Banners";
import Recommend from "./Recommend/Recommend";

export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <Banners />
      <Deals />
      <Offers />
      <Recommend />
    </>
  );
}
