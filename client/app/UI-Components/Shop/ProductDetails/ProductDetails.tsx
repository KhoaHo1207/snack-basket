"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import BestSales from "../../Index/BestSales/BestSales";
import Banner from "../../Index/Banner/Banner";
import Deals from "../../Index/Deals/Deals";
interface ProductType {
  Id: string;
  image: string;
  title: string;
  lessprice?: string;
  price: string;
  review?: string;
  sold?: string;
  sale?: string;
  qty?: number;
  quantity?: number;
}

interface Props {
  id?: string;
  products: ProductType[];
}

export default function ProductDetails({ id, products }: Props) {
  const product = products.find((item) => String(item.Id) === String(id));
  const [quantity, setQuantity] = useState<number>(product?.qty ?? 1);

  const handleQtyChange = (nextQty: number) => {
    setQuantity(Math.max(1, nextQty));
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cart: ProductType[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
      const baseQty =
        typeof existingProduct.qty === "number"
          ? existingProduct.qty
          : typeof existingProduct.quantity === "number"
          ? existingProduct.quantity
          : 1;
      const updatedQty = baseQty + quantity;
      existingProduct.qty = updatedQty;
      existingProduct.quantity = updatedQty;
    } else {
      cart.push({ ...product, qty: quantity, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Product added to cart");
  };

  const handleAddToWishlist = () => {
    if (!product) return;

    const wishlist: ProductType[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const existingWishlist = wishlist.find((item) => item.Id === product.Id);

    if (existingWishlist) {
      const baseQty =
        typeof existingWishlist.qty === "number"
          ? existingWishlist.qty
          : typeof existingWishlist.quantity === "number"
          ? existingWishlist.quantity
          : 1;
      const updatedQty = baseQty + quantity;
      existingWishlist.qty = updatedQty;
      existingWishlist.quantity = updatedQty;
    } else {
      wishlist.push({ ...product, qty: quantity, quantity });
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist"));
    toast.success("Product added to wishlist");
  };

  if (!id) {
    return (
      <div>
        <h1>All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="border p-4 rounded-md">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <h2 className="font-bold mt-2">{product.title}</h2>
              <p className="text-green-600">{product.price}</p>
              {product.lessprice && (
                <p className="line-through text-gray-500">{product.price}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div key={product.Id} className="">
      <div className="flex justify-between gap-5 px-[8%] lg:px-[12%] py-10">
        <div className="w-full lg:w-1/1 flex sticky top-2/12 left-0 h-fit justify-between">
          <div className="border border-gray-300 rounded-2xl">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain p-20"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col">
            <h2 className="Unbounded text-3xl">{product.title}</h2>
            <span className="flex items-center border-b border-gray-300 pb-3 text-yellow-500 text-base">
              <i className="bi bi-star-fill me-1"></i>
              <i className="bi bi-star-fill me-1"></i>
              <i className="bi bi-star-fill me-1"></i>
              <i className="bi bi-star-fill me-1"></i>
              <i className="bi bi-star-fill me-1"></i>
              &nbsp;
              <span className="text-black font-medium">
                4.5 star Rating {product.review}
              </span>
            </span>
            <p className="my-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              culpa, est illo id sapiente veniam autem distinctio sunt mollitia
              possimus!
            </p>
            <div className="flex items-center gap-2 border-b border-gray-300 pb-3">
              <h3 className="Unbounded text-2xl">{product.price}</h3>
              <del className="Unbounded text-gray-500">{product.lessprice}</del>
            </div>
            <span className="my-3 bg-[#97ffc971] px-3 py-2 rounded-md">
              Special Offer: <strong>5 Days</strong> remains until the end of
              the offer
            </span>
            <div className="">
              <h3 className="mb-3">Quantity:</h3>
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                  <button
                    className="px-3 py-2 text-lg font-semibold text-(--prim-color) cursor-pointer"
                    onClick={() => handleQtyChange(quantity - 1)}
                  >
                    -
                  </button>
                  <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-x border-gray-300 bg-white min-w-[60px] text-center">
                    {quantity}
                  </div>
                  <button
                    className="px-3 py-2 text-lg font-semibold text-(--prim-color) cursor-pointer"
                    onClick={() => handleQtyChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-(--prim-color) rounded-lg hover:opacity-90 transition-all"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 px-4 py-3 text-sm font-semibold text-(--prim-color) bg-(--prim-light) border border-(--prim-color) rounded-lg hover:bg-(--prim-color) hover:text-white transition-all"
                  onClick={handleAddToWishlist}
                >
                  Add to Wish List
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 border border-gray-300 rounded-2xl">
          <div className="flex items-center justify-between bg-(--prim-color) rounded-full p-3 m-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded-full bg-white p-2 size-10">
                <i className="bi bi-shop text-black text-xl"></i>
              </div>
              <span className="text-white text-sm">
                By <strong>SnackBasket</strong>
              </span>
            </div>
            <div className="bg-white text-black transition-all duration-300 rounded-full hover:bg-black hover:text-white p-3 cursor-pointer">
              View More
            </div>
          </div>
          <div>
            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 border-b border-gray-200">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-truck text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Fast delivery</h5>
                <p className="text-gray-500 text-sm">
                  Fast delivery on all orders over VietNam
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 border-b border-gray-200">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-arrow-counterclockwise text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Free 30-day returns</h5>
                <p className="text-gray-500 text-sm">
                  Shop risk-free with easy returns.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 border-b border-gray-200">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-geo-alt text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Pickup available at Shop</h5>
                <p className="text-gray-500 text-sm">
                  Usually ready in 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 border-b border-gray-200">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-credit-card-2-front text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Payment</h5>
                <p className="text-gray-500 text-sm">
                  Payment upon receipt, card, Google Pay, or online card.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 border-b border-gray-200">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-shield-check text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Warranty</h5>
                <p className="text-gray-500 text-sm">
                  Consumer Protection Act doesn’t allow returning this product
                  of proper quality.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-(--prim-light) py-3 px-5 rounded-b-2xl">
              <div className="bg-white rounded-full size-10 flex items-center justify-center">
                <i className="bi bi-box-seam text-xl text-(--prim-color)"></i>
              </div>
              <div>
                <h5 className="Unbounded text-lg">Packaging</h5>
                <p className="text-gray-500 text-sm">
                  Research & development value proposition graphical UI
                  investor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-10 px-[8%] lg:px-[12%] py-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-(--prim-color) rounded-full"></div>
          <h3 className="Unbounded text-2xl">Product Description</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Wherever celebrations and good times happen, the LAYS brand will
              be there just as it has been for more than 75 years. With flavors
              almost as rich as our history, we have a chip or crisp flavor
              guaranteed to bring a smile on your face.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat
              auctor, eleifend nunc a, lobortis neque. Maecenas lacus odio,
              feugiat eu nunc sit amet, maximus sagittis dolor.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
              perferendis perspiciatis temporibus voluptate, nemo quod
              dignissimos nam molestias nulla a officia eos, voluptatem beatae
              provident, dolorum suscipit aspernatur doloribus. Ut.
            </p>

            <ul className="space-y-2 text-gray-800">
              <li>• 8.0 oz. bag of LAYS Classic Potato Chips</li>
              <li>• Tasty LAYS potato chips are a great snack</li>
              <li>• Includes three ingredients: potatoes, oil, and salt</li>
              <li>• Gluten free product</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-(--prim-light) text-(--prim-color) text-sm font-semibold">
                <i className="bi bi-flag"></i>
                Made in USA
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-(--prim-light) text-(--prim-color) text-sm font-semibold">
                <i className="bi bi-check-circle"></i>
                Ready To Eat
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
              <h4 className="Unbounded text-lg mb-3">Product Specifications</h4>
              <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Product Type</span>
                  <span>Chips &amp; Dips</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Product Name</span>
                  <span>C-500 Antioxidant Protect Dietary Supplement</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Brand</span>
                  <span>Lays</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">FSA Eligible</span>
                  <span>No</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Size/Count</span>
                  <span>8.0oz</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Item Code</span>
                  <span>425652</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Ingredients</span>
                  <span className="text-right">
                    Potatoes, Vegetable Oil, and Salt.
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
              <h4 className="Unbounded text-lg mb-3">Nutrition Facts</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Total Fat</span>
                  <span>10g (13%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturated Fat</span>
                  <span>1.5g (7%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Cholesterol</span>
                  <span>0mg (0%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Sodium</span>
                  <span>170mg (7%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Potassium</span>
                  <span>350mg (6%)</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 shadow-sm bg-white">
              <h4 className="Unbounded text-lg mb-3">More Details</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Lunarlon midsole delivers ultra-plush responsiveness</li>
                <li>
                  • Encapsulated Air-Sole heel unit for lightweight cushioning
                </li>
                <li>• Colour Shown: Ale Brown/Black/Goldtone/Ale Brown</li>
                <li>• Style: 805899-202</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Deals />
    </div>
  );
}
