import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Global Mobility Partners",
  description:
    "Insights, updates, and analysis on global mobility trends from the team at Global Mobility Partners.",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-900 section-padding">
        <div className="container-narrow text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Latest in Global Immigration
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-200">
            Insights, updates, and analysis on global mobility trends.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="font-display text-xl font-bold text-navy-900 transition-colors group-hover:text-gold-600">
                      {post.title}
                    </h2>

                    {/* Date */}
                    <p className="mt-2 text-sm text-navy-400">
                      {formatDate(post.date)}
                    </p>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors group-hover:text-gold-500">
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-50">
                <BookOpen className="h-8 w-8 text-navy-400" />
              </div>
              <h2 className="mt-6 font-display text-2xl font-bold text-navy-900">
                Blog Posts Coming Soon
              </h2>
              <p className="mt-2 max-w-md text-navy-600">
                Check back for the latest global immigration insights, policy
                updates, and industry analysis from our team.
              </p>
              <Link href="/" className="btn-primary mt-8">
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
