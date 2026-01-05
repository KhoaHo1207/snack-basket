"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BestDeals from "@/app/JsonData/BestDeals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import HotDeals from "@/app/JsonData/HotDeals.json";
import Arrivals from "@/app/JsonData/NewArrivals.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";
import ProductDetails from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";

interface ProductType {
  Id: string;
  title?: string;
  Name?: string;
  ProductImage?: string;
  image?: string;
  price?: string;
  Price?: string;
}

export default function ShopPage() {
  const allProducts: ProductType[] = useMemo(
    () => [
      ...BestDeals,
      ...Arrivals,
      ...BestSales,
      ...OrganicFood,
      ...HotDeals,
      ...Recommend,
      ...(ShortProducts?.Featured || []),
      ...(ShortProducts?.TopSelling || []),
      ...(ShortProducts?.OnSale || []),
      ...(ShortProducts?.TopRated || []),
    ],
    []
  );

  const searchParmas = useSearchParams();
  const productId = searchParmas.get("id");
  return (
    <div className="">
      {productId ? (
        <ProductDetails id={productId} products={allProducts} />
      ) : (
        <Products />
      )}
    </div>
  );
}
