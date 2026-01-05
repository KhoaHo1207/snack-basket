"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BestDeals from "@/app/JsonData/BestDeals.json";
import BestSales from "@/app/JsonData/BestSales.json";
import HotDeals from "@/app/JsonData/HotDeals.json";
import Arrivals from "@/app/JsonData/NewArrivals.json";
import OrganicFood from "@/app/JsonData/OrganicFood.json";
import Recommend from "@/app/JsonData/Recommend.json";
import ShortProducts from "@/app/JsonData/ShortProducts.json";
import ProductDetails, {
  ProductType,
} from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";

type UnknownProduct = Record<string, unknown>;

const normalizeProduct = (item: UnknownProduct): ProductType => {
  const toStringSafe = (value: unknown, fallback = ""): string =>
    typeof value === "string"
      ? value
      : typeof value === "number"
      ? String(value)
      : fallback;

  const image = toStringSafe(
    item.image || item.ProductImage || item.ProductImg || item.img,
    ""
  );
  const price = toStringSafe(item.price || item.Price, "$0");
  const title = toStringSafe(
    item.title || item.Name || item.ProductName,
    "Product"
  );
  return {
    Id: toStringSafe(item.Id ?? item.id ?? item.ProductId ?? title, title),
    image,
    title,
    lessprice: toStringSafe(item.lessprice, undefined as unknown as string),
    price,
    review: toStringSafe(item.review, undefined as unknown as string),
    sold: toStringSafe(item.sold, undefined as unknown as string),
    sale: toStringSafe(item.sale, undefined as unknown as string),
    qty:
      typeof item.qty === "number"
        ? item.qty
        : typeof item.quantity === "number"
        ? item.quantity
        : undefined,
    quantity:
      typeof item.quantity === "number"
        ? item.quantity
        : typeof item.qty === "number"
        ? item.qty
        : undefined,
  };
};

function ShopPageContent() {
  const allProducts: ProductType[] = useMemo(() => {
    const raw = [
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
    ];
    return raw.map(normalizeProduct);
  }, []);

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
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

export default function ShopPage() {
  return (
    <Suspense fallback={<div />}>
      <ShopPageContent />
    </Suspense>
  );
}
