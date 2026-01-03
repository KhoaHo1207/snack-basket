import Image from "next/image";
import Link from "next/link";

import StoreImg1 from "@/public/store-img1.png";
import StoreImg2 from "@/public/store-img2.png";
import payment from "@/public/payment.png";

function Footer() {
  return (
    <footer className="footer px-[8%] lg:px-[12%] py-12 border-t border-gray-200 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="space-y-4">
          <Link href="/" className="text-3xl font-bold Merienda text-black">
            Snack <span className="text-(--prim-color)">Basket</span>
          </Link>
          <p className="text-gray-700 leading-6">
            We&apos;re Grocery Shop, an innovative team of food suppliers.
          </p>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>789 Inner Lane, Biyes Park, California</p>
            <p className="font-semibold">+00 123 456 789 · +00 987 654 012</p>
            <p>Example@site.com</p>
          </div>
          <div className="flex items-center gap-3 text-xl text-gray-600">
            <i className="bi bi-facebook hover:text-(--prim-color) transition-colors"></i>
            <i className="bi bi-instagram hover:text-(--prim-color) transition-colors"></i>
            <i className="bi bi-twitter-x hover:text-(--prim-color) transition-colors"></i>
            <i className="bi bi-youtube hover:text-(--prim-color) transition-colors"></i>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Information</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/">Become a Vendor</Link>
            </li>
            <li>
              <Link href="/">Affiliate Program</Link>
            </li>
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Our Suppliers</Link>
            </li>
            <li>
              <Link href="/">Extended Plan</Link>
            </li>
            <li>
              <Link href="/">Community</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Support</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/">Help Center</Link>
            </li>
            <li>
              <Link href="/">Contact Us</Link>
            </li>
            <li>
              <Link href="/">Report Abuse</Link>
            </li>
            <li>
              <Link href="/">Submit and Dispute</Link>
            </li>
            <li>
              <Link href="/">Policies &amp; Rules</Link>
            </li>
            <li>
              <Link href="/">Online Shopping</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Groceries</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <Link href="/">Dairy &amp; Eggs</Link>
            </li>
            <li>
              <Link href="/">Meat &amp; Seafood</Link>
            </li>
            <li>
              <Link href="/">Breakfast Food</Link>
            </li>
            <li>
              <Link href="/">Household Supplies</Link>
            </li>
            <li>
              <Link href="/">Bread &amp; Bakery</Link>
            </li>
            <li>
              <Link href="/">Pantry Staples</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Shop on The Go</h4>
          <p className="text-gray-700 text-sm">
            SnackBasket App is available. Get it now
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/">
              <Image src={StoreImg1} alt="Download on App Store" />
            </Link>
            <Link href="/">
              <Image src={StoreImg2} alt="Get it on Google Play" />
            </Link>
          </div>
          <div className="pt-2">
            <Image
              src={payment}
              alt="Payment methods"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-600">
        <p>
          ©2025. All Rights Reserved By{" "}
          <a
            href="https://uicode.in/"
            className="font-semibold hover:text-(--prim-color)"
          >
            Uicode
          </a>
        </p>
        <p className="text-gray-500">
          Snack Basket · Fresh groceries, delivered.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
