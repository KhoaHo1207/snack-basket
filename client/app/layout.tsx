import type { Metadata } from "next";
import { Geist, Geist_Mono, Merienda, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";

const unbo = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});
const merienda = Merienda({
  variable: "--font-merienda",
  subsets: ["latin"],
  display: "swap",
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnackBasket",
  description: "SnackBasket Grocery Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unbo.variable} ${merienda.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
