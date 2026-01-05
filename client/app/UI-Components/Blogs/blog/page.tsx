"use client";

import Image from "next/image";
import Link from "next/link";
import blogData from "@/app/JsonData/Blogs.json";

type BlogType = {
  id: number;
  image: string;
  title: string;
  tag: string;
  pere: string;
  pere2: string;
  pere3: string;
  date: string;
  comment: string;
};

export default function Blog() {
  const sidePosts = blogData.slice(0, 5) as BlogType[];

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="flex justify-between items-center bg-(--prim-light) px-6 py-4 rounded-xl mb-8">
        <h2 className="Unbounded text-2xl">Blogs</h2>
        <div className="flex items-center gap-2 text-lg">
          <Link href="/" className="Unbounded hover:text-(--prim-color)">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="Unbounded text-(--prim-color)">Blogs</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {blogData.map((blog: BlogType) => (
            <div
              key={blog.id}
              className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="100vw h-auto"
                />
                <span className="absolute top-4 left-4 bg-white text-(--prim-color) px-3 py-1 rounded-full text-sm font-semibold shadow">
                  {blog.tag}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <i className="bi bi-calendar3 text-(--prim-color)"></i>
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="bi bi-chat-left-dots text-(--prim-color)"></i>
                    {blog.comment}
                  </span>
                </div>
                <h3 className="text-2xl Unbounded leading-tight">
                  {blog.title}
                </h3>
                <p className="text-gray-700">{blog.pere}</p>
                <p className="text-gray-700">{blog.pere2}</p>
                <p className="text-gray-700">{blog.pere3}</p>

                <Link
                  href={{
                    pathname: "/UI-Components/Blogs/blogDetails",
                    query: { id: blog.id },
                  }}
                  className="inline-flex items-center gap-2 text-(--prim-color) font-semibold hover:underline"
                >
                  Read More <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <h4 className="Unbounded text-xl border-b border-gray-200 pb-2">
            Latest Posts
          </h4>
          <div className="space-y-3">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                href={{
                  pathname: "/UI-Components/Blogs/blogDetails",
                  query: { id: post.id },
                }}
                className="flex gap-3 items-center border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold line-clamp-2">
                    {post.title}
                  </p>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
