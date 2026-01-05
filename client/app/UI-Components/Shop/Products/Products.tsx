import { useMemo, useState } from "react";
import products from "@/app/JsonData/Recommend.json";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { ProductType } from "../ProductDetails/ProductDetails";
export default function Products() {
  const [price, setPrice] = useState(100);
  const [discount50, setDiscount50] = useState(false);
  const [discount30, setDiscount30] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const productList: ProductType[] = useMemo(
    () =>
      (products as ProductType[]).map((p) => ({
        ...p,
        sale: p.sale ?? "",
        review: p.review ?? "",
        sold: p.sold ?? "",
        lessprice: p.lessprice ?? "",
      })),
    []
  );

  const handleAddToCart = (product: ProductType) => {
    const cart: ProductType[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
      const baseQty =
        typeof existingProduct.quantity === "number"
          ? existingProduct.quantity
          : typeof existingProduct.qty === "number"
          ? existingProduct.qty
          : 0;
      const updated = baseQty + 1;
      existingProduct.quantity = updated;
      existingProduct.qty = updated;
    } else {
      cart.push({ ...product, quantity: 1, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Product added to cart");
  };

  const handleAddToWishlist = (product: ProductType) => {
    const wishlist: ProductType[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const existingWishlist = wishlist.find((item) => item.Id === product.Id);

    if (existingWishlist) {
      const baseQty =
        typeof existingWishlist.quantity === "number"
          ? existingWishlist.quantity
          : typeof existingWishlist.qty === "number"
          ? existingWishlist.qty
          : 0;
      const updated = baseQty + 1;
      existingWishlist.quantity = updated;
      existingWishlist.qty = updated;
    } else {
      wishlist.push({ ...product, quantity: 1, qty: 1 });
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist"));
    toast.success("Product added to wishlist");
  };

  const filteredProducts = useMemo(() => {
    let result = productList;

    result = result.filter((p) => {
      const productPrice = parseFloat(p.price.replace(/[^0-9.-]+/g, ""));
      return productPrice <= price;
    });

    if (discount50) {
      result = result.filter((p) => p.sale?.includes("50%"));
    }
    if (discount30) {
      result = result.filter((p) => p.sale?.includes("30%"));
    }
    if (isNew) {
      result = result.filter((p) => p.sale === "New");
    }
    return result;
  }, [price, discount30, discount50, isNew, productList]);

  const randomProduct = useMemo(
    () => (productList.length ? productList[0] : null),
    [productList]
  );

  if (!randomProduct) {
    return null;
  }

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="my-10">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          {/* Sidebar */}
          <div className="w-full md:w-1/2 lg:w-1/3 relatove lg:sticky top-22 left-0 h-ful">
            <div className="border border-gray-300 shadow rounded p-3">
              <div className="border-b w-full border-gray-300 pb-3 flex items-center justify-between">
                <h2 className="text-xl Unbounded">Product Category</h2>
                <button
                  onClick={() => {
                    setPrice(100);
                    setDiscount50(false);
                    setDiscount30(false);
                    setIsNew(false);
                  }}
                  className="border border-gray-300 px-2 py-1 rounded cursor-pointer hover:border-gray-500 transition-all duration-300"
                >
                  Reset
                </button>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Price Range</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 text-sm font-medium">$0</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full accent-[var(--prim-color)]"
                  />
                  <span className="text-gray-700 text-sm font-medium">
                    ${price}
                  </span>
                </div>
              </div>

              {/* Discount */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Discount</h3>
                <form className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="discount50"
                      id="discount50"
                      checked={discount50}
                      onChange={() => setDiscount50(!discount50)}
                      className="form-checkbox accent-[var(--prim-color)] cursor-pointer"
                    />
                    <label htmlFor="discount50" className="cursor-pointer">
                      50% off
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="discount30"
                      id="discount30"
                      checked={discount30}
                      onChange={() => setDiscount30(!discount30)}
                      className="form-checkbox accent-[var(--prim-color)] cursor-pointer"
                    />
                    <label htmlFor="discount30" className="cursor-pointer">
                      30% off
                    </label>
                  </div>
                </form>
              </div>
              {/* Others */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Others</h3>
                <form className="space-y-2">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isNew"
                      id="isNew"
                      checked={isNew}
                      onChange={() => setIsNew(!isNew)}
                      className="form-checkbox accent-[var(--prim-color)]"
                    />
                    <label htmlFor="isNew" className="cursor-pointer">
                      New Products
                    </label>
                  </div>
                </form>
              </div>
            </div>
            {/* Random Products */}
            <div className="mt-3">
              <div
                key={randomProduct.Id}
                className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300"
              >
                <div className="relative flex justify-center items-center w-full h-50">
                  <Image
                    src={randomProduct.image}
                    alt={randomProduct.title}
                    width={180}
                    height={180}
                    className="object-contain mt-10"
                  />

                  <div
                    className="absolute top-0 right-0 w-[50px] h-[50px] rounded-full bg-[var(--prim-light)] text-[var(--prim-color)] flex items-center justify-center hover:bg-[var(--prim-color)] hover:text-[var(--prim-light)] transition-all duration-300 cursor-pointer"
                    onClick={() => handleAddToWishlist(randomProduct)}
                  >
                    <i className="bi bi-balloon-heart text-xl"></i>
                  </div>
                  <span
                    className={`absolute off-product top-0 left-0 px-4 py-2 Merienda text-xs font-bold text-white rounded ${
                      randomProduct.sale === "New"
                        ? "bg-yellow-400"
                        : randomProduct.sale?.includes("%")
                        ? "bg-red-500"
                        : "opacity-0"
                    } `}
                  >
                    {randomProduct.sale ?? ""}
                  </span>
                </div>
                <Link
                  href={{
                    pathname: "/UI-Components/Shop",
                    query: { id: randomProduct.Id },
                  }}
                >
                  <div className="space-y-1 mt-5 product-info">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm line-through">
                        {randomProduct.lessprice}
                      </span>
                      <span className="text-xl font-semibold">
                        {randomProduct.price}
                      </span>
                      <span className="text-gray-500 text-sm">/Qty</span>
                    </div>
                    <h6 className="text-lg text-gray-500 flex items-center gap-1">
                      <i className="bi bi-shop text-[var(--prim-color)]"></i>
                      By Lucky Supermarket
                    </h6>
                    <h2 className="text-base font-normal Unbounded my-2 hover:text-[var(--prim-color)] transition-all duration-300">
                      {randomProduct.title}
                    </h2>
                    <span className="flex items-center text-yellow-500 text-base">
                      <i className="bi bi-star-fill me-1"></i>
                      {randomProduct.review}
                    </span>

                    <h3 className="mt-2 Unbounded text-base text-gray-600">
                      Sold: {randomProduct.sold}
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="product-wrap border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all hover:border-[var(--prim-color)] cursor-pointer duration-300"
                >
                  <div className="relative flex justify-center items-center w-full h-50">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={180}
                      height={180}
                      className="object-contain mt-10"
                    />

                    <div
                      className="absolute top-0 right-0 w-[50px] h-[50px] rounded-full bg-[var(--prim-light)] text-[var(--prim-color)] flex items-center justify-center hover:bg-[var(--prim-color)] hover:text-[var(--prim-light)] transition-all duration-300 cursor-pointer"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <i className="bi bi-balloon-heart text-xl"></i>
                    </div>
                    <span
                      className={`absolute off-product top-0 left-0 px-4 py-2 Merienda text-xs font-bold text-white rounded ${
                        product.sale === "New"
                        ? "bg-yellow-400"
                        : product.sale?.includes("%")
                        ? "bg-red-500"
                        : "opacity-0"
                      } `}
                    >
                    {product.sale ?? ""}
                    </span>
                  </div>
                  <Link
                    href={{
                      pathname: "/UI-Components/Shop",
                      query: { id: product.Id },
                    }}
                  >
                    <div className="space-y-1 mt-5 product-info">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm line-through">
                          {product.lessprice}
                        </span>
                        <span className="text-xl font-semibold">
                          {product.price}
                        </span>
                        <span className="text-gray-500 text-sm">/Qty</span>
                      </div>
                      <h6 className="text-lg text-gray-500 flex items-center gap-1">
                        <i className="bi bi-shop text-[var(--prim-color)]"></i>
                        By Lucky Supermarket
                      </h6>
                      <h2 className="text-base font-normal Unbounded my-2 hover:text-[var(--prim-color)] transition-all duration-300">
                        {product.title}
                      </h2>
                      <span className="flex items-center text-yellow-500 text-base">
                        <i className="bi bi-star-fill me-1"></i>
                        {product.review}
                      </span>

                      <h3 className="mt-2 Unbounded text-base text-gray-600">
                        Sold: {product.sold}
                      </h3>
                    </div>
                  </Link>
                  <div
                    className="flex justify-between items-center mt-4"
                    onClick={() => handleAddToCart(product)}
                  >
                    <button className="px-4 py-2 font-semibold text-[var(--prim-color)] bg-[var(--prim-light)] rounded-lg text-base hover:bg-[var(--prim-color)] hover:text-white cursor-pointer transition-all w-full">
                      Add <i className="bi bi-cart"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="font-bold borde-b h-7 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
