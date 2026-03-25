import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Global Mobility Partners" };
  }

  return {
    title: `${post.title} | Global Mobility Partners`,
    description: post.excerpt || undefined,
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      {/* Back Link */}
      <div className="bg-white border-b border-navy-100">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 transition-colors hover:text-gold-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="section-padding bg-white">
        <div className="mx-auto max-w-3xl">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-navy-100 pb-6 text-sm text-navy-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-navy mt-10 max-w-none prose-headings:font-display prose-headings:text-navy-900 prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="border-t border-navy-100 bg-navy-50 px-4 py-12 text-center sm:px-6">
        <p className="text-navy-600">
          Need help with a global immigration case?
        </p>
        <Link href="/contact" className="btn-primary mt-4 inline-flex">
          Get in Touch
        </Link>
      </section>
    </main>
  );
}
