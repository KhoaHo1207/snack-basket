"use client";

import { create } from "zustand";
import { ProductType } from "../UI-Components/Shop/ProductDetails/ProductDetails";

type ProductState = {
  products: ProductType[];
  setProducts: (items: ProductType[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (items) => set({ products: items }),
}));

