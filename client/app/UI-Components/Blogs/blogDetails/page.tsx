"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function BlogDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const blog = blogData.find((item) => item.id === Number(id)) as
    | BlogType
    | undefined;

  const sidePosts = blogData.slice(0, 5) as BlogType[];

  if (!blog) {
    return (
      <div className="px-[8%] lg:px-[12%] py-10">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="px-[8%] lg:px-[12%] py-10">
      <div className="flex justify-between items-center bg-(--prim-light) px-6 py-4 rounded-xl mb-8">
        <h2 className="Unbounded text-2xl">{blog.title}</h2>
        <div className="flex items-center gap-2 text-lg">
          <Link href="/" className="Unbounded hover:text-(--prim-color)">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <Link
            href="/UI-Components/Blogs/blog"
            className="Unbounded hover:text-(--prim-color)"
          >
            Blogs
          </Link>
          <span className="text-gray-500">/</span>
          <span className="Unbounded text-(--prim-color)">Details</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <article className="lg:col-span-2 space-y-6">
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-contain"
              sizes="100vw"
            />
            <span className="absolute top-4 left-4 bg-white text-(--prim-color) px-3 py-1 rounded-full text-sm font-semibold shadow">
              {blog.tag}
            </span>
          </div>

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

          <h1 className="text-3xl Unbounded leading-tight">{blog.title}</h1>

          <p className="text-gray-700 leading-relaxed">{blog.pere}</p>
          <p className="text-gray-700 leading-relaxed">{blog.pere2}</p>
          <p className="text-gray-700 leading-relaxed">{blog.pere3}</p>
        </article>

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

export default function BlogDetails() {
  return (
    <Suspense fallback={<div />}>
      <BlogDetailsContent />
    </Suspense>
  );
}
