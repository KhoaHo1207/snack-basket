"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/UI-Components/Shop",
    dropdown: [
      {
        label: "Shop",
        href: "/UI-Components/Shop",
      },
      {
        label: "Shop Details",
        href: "/UI-Components/Shop",
      },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      {
        label: "Cart",
        href: "/UI-Components/Pages/cart",
      },
      {
        label: "Wishlist",
        href: "/UI-Components/Pages/wishlist",
      },
      {
        label: "Checkout",
        href: "/UI-Components/Pages/checkout",
      },
      {
        label: "Account",
        href: "/UI-Components/Pages/account",
      },
    ],
  },
  {
    label: "Blog",
    href: "/UI-Components/Blogs",
    dropdown: [
      {
        label: "Blog",
        href: "/UI-Components/Blogs",
      },
      {
        label: "Blog Details",
        href: "/UI-Components/Blogs/blogDetails?id=1",
      },
    ],
  },
  { label: "Contact Us", href: "/UI-Components/Pages/contact" },
];
export default function BottomNav() {
  const [isFixed, setIsFixed] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<Record<string, boolean>>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      const uniqueCart = new Set(cart.map((item: any) => item.Id));
      const uniqueWishlist = new Set(wishlist.map((item: any) => item.Id));

      setCartCount(uniqueCart.size);
      setWishlistCount(uniqueWishlist.size);
    };

    loadCounts();
    window.addEventListener("storageUpdate", loadCounts);
    return () => {
      window.removeEventListener("storageUpdate", loadCounts);
    };
  }, []);
  return (
    <div
      className={`w-full bg-white shadow-sm transition-all duration-500 ${
        isFixed ? "fixed top-0 left-0 z-50 fixed-nav" : ""
      }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%] text-gray-700">
        {/* Desktop Navbar */}
        <Link
          href={"/"}
          className={`text-3xl font-bold Merienda text-black hidden ${
            isFixed ? "lg:flex" : "hidden"
          }`}
        >
          Snack <span className="text-[var(--prim-color)]">Basket</span>
        </Link>

        <nav className="hidden lg:flex space-x-6 menu-link relative">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative group z-99">
                <Link
                  href={link.href ?? "#"}
                  className="flex items-center gap-1"
                >
                  {link.label} <i className="ri-arrow-down-s-line"></i>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-xl p-2 border border-gray-100 rounded-lg min-w-[150px]">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href ?? "#"}
                      className="block px-4 py-2 rounded-md hover:bg-[var(--prim-light)] transition-all"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href ?? "#"}
                className="flex items-center gap-1"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <button className="nav-button cursor-pointer font-bold bg-[var(--prim-color)] text-white p-3 hidden lg:flex">
          <i className="bi bi-telephone pe-2 text-xl">+84 901 352 651</i>
        </button>

        {/* Mobile Nav Header */}
        <div className="lg:hidden flex items-center justify-between gap-4 w-full">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            <div className="flex items-center gap-x-5">
              <i className="ri-menu-line"></i>
            </div>
          </button>
          <div className="flex lg:hidden items-center space-x-6">
            {/* Wishlist */}
            <Link href={"/UI-Components/Pages/wishlist"} className="relative">
              <i className="bi bi-heart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </i>
            </Link>
            {/* Cart */}
            <Link href={"/UI-Components/Pages/cart"} className="relative">
              <i className="bi bi-cart text-gray-600 text-xl hover:text-[var(--prim-color)] transition-all">
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[var(--prim-color)] text-white text-xs font-semibold rounded-full size-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </i>
            </Link>
          </div>
          <button className="nav-button cursor-pointer font-bold bg-[var(--prim-color)] text-white p-3">
            <i className="bi bi-telephone pe-2 text-xl">+84 901 352 651</i>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-md transition-all duration-500 overflow-hidden">
          <nav className="flex flex-col px-[4%] py-3 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex items-center justify-between w-full py-2 text-left"
                  >
                    <span className="flex items-center gap-1">
                      {link.label}
                    </span>
                    <i
                      className={
                        openDropdown[link.label]
                          ? "ri-arrow-up-s-line"
                          : "ri-arrow-down-s-line"
                      }
                    ></i>
                  </button>
                  {openDropdown[link.label] && (
                    <div className="flex flex-col pl-4 space-y-1 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href ?? "#"}
                          className="block px-4 py-2 rounded-md hover:bg-[var(--prim-light)] transition-all"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href ?? "#"}
                  className="flex items-center gap-1"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
