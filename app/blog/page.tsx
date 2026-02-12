import Link from "next/link";
import { getPostsList } from "@/lib/sanity";

export const metadata = {
  title: "Blog",
  description: "Articles and updates from Samui Construction",
};

export default async function BlogPage() {
  const posts = await getPostsList();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-2 text-slate-600">Articles and updates</p>
      {posts.length === 0 ? (
        <p className="mt-8 text-slate-500">No posts yet. Add posts in Sanity Studio.</p>
      ) : (
        <ul className="mt-8 space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}/`}
                className="block rounded-xl border border-slate-200 bg-white p-5 hover:border-teal-300 hover:shadow-md transition"
              >
                {post.coverImageUrl && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.coverImageUrl} alt={post.title ?? ""} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                {post.publishedAt && (
                  <time className="text-sm text-slate-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                )}
                <h2 className="mt-1 text-lg font-semibold text-slate-900">{post.title}</h2>
                {post.excerpt && <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
