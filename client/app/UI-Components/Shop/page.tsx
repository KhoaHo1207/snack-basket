"use client";

import { Suspense, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import ProductDetails, {
  ProductType,
} from "./ProductDetails/ProductDetails";
import Products from "./Products/Products";
import { useProductStore } from "@/app/store/productStore";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

const formatPrice = (value: unknown) => {
  if (typeof value === "number") return `$${value.toFixed(2)}`;
  if (typeof value === "string") return value;
  return "$0";
};

const normalizeProduct = (item: any): ProductType => {
  const title = item.title ?? item.Name ?? item.ProductName ?? "Product";
  return {
    Id: String(item._id ?? item.Id ?? title),
    image:
      item.image || item.ProductImage || item.ProductImg || item.img || "",
    title,
    lessprice: formatPrice(item.lessprice),
    price: formatPrice(item.price),
    review: String(item.reviewCount ?? item.review ?? ""),
    sold: String(item.sold ?? ""),
    sale:
      typeof item.sale === "number"
        ? `${item.sale}%`
        : item.sale ?? "",
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

const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await fetch(`${API_BASE}/product`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const json = await res.json();
  const items = Array.isArray(json.data) ? json.data : [];
  return items.map(normalizeProduct);
};

function ShopPageContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const setProducts = useProductStore((s) => s.setProducts);
  const products = data ?? [];

  useEffect(() => {
    if (products.length) {
      setProducts(products);
    }
  }, [products, setProducts]);

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  if (isLoading) return <div className="px-[8%] py-10">Loading...</div>;
  if (error) return <div className="px-[8%] py-10">Failed to load products</div>;

  return (
    <div className="">
      {productId ? (
        <ProductDetails id={productId} products={products} />
      ) : (
        <Products products={products} />
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
