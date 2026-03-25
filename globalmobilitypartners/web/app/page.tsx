import Link from "next/link";
import {
  Briefcase,
  FileCheck,
  Plane,
  MessageSquare,
  ArrowRight,
  Quote,
  Globe,
  Calendar,
} from "lucide-react";
import { getAllPosts } from "@/lib/blog";

const stats = [
  { value: "150+", label: "Countries Supported" },
  { value: "500+", label: "Cases Managed" },
  { value: "30+", label: "Years Combined Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const services = [
  {
    icon: Briefcase,
    title: "Work Permits",
    description:
      "Work authorization for transferring and hiring foreign nationals abroad",
  },
  {
    icon: FileCheck,
    title: "Document Support",
    description:
      "Procuring and authenticating documents to be valid for use abroad",
  },
  {
    icon: Plane,
    title: "Business Visas",
    description:
      "Guidance and obtainment of short-term visas for business travelers",
  },
  {
    icon: MessageSquare,
    title: "Consulting",
    description:
      "Mergers & Acquisitions, H1-B Alternatives, Global Travel Compliance",
  },
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* ——— Hero Section ——— */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
        {/* Decorative overlay pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Decorative gradient orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-navy-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Global Immigration Services for Law Firms &amp; Businesses
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-navy-200 sm:text-xl">
              From filings to strategy, we support US attorneys and companies
              that move people across borders&nbsp;&mdash; faster, smarter, and
              with fewer delays.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/law-firms" className="btn-primary text-lg">
                For Law Firms
              </Link>
              <Link href="/businesses" className="btn-secondary text-lg">
                For Businesses
              </Link>
            </div>

            <p className="mt-8 text-sm text-navy-300">
              Individual?{" "}
              <Link
                href="/contact"
                className="underline decoration-gold-500/50 underline-offset-2 transition-colors hover:text-gold-300"
              >
                We can refer you to qualified partners.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ——— Trusted By / Stats Section ——— */}
      <section className="bg-navy-50/50 section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-navy-100 sm:p-8"
              >
                <p className="font-display text-3xl font-bold text-navy-800 sm:text-4xl lg:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-navy-500 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Services Overview ——— */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              How We Help
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              End-to-end global immigration support tailored to your needs.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-gold-400/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-900">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/businesses"
              className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors hover:text-gold-600"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— Who We Serve ——— */}
      <section className="section-padding bg-navy-50/60">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Who We Serve
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Law Firms */}
            <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-100 transition-shadow hover:shadow-md sm:p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-900">
                For US Immigration Law Firms
              </h3>
              <p className="mt-4 leading-relaxed text-navy-600">
                Expand your service offering without building an in-house global
                team. GMP acts as your trusted outbound immigration partner,
                enabling you to serve clients who need to move employees
                overseas&nbsp;&mdash; while you stay focused on US immigration.
              </p>
              <Link
                href="/law-firms"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors hover:text-gold-600"
              >
                Learn about our law firm partnerships
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Businesses */}
            <div className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-100 transition-shadow hover:shadow-md sm:p-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-800 text-gold-400">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-900">
                For Corporations &amp; Businesses
              </h3>
              <p className="mt-4 leading-relaxed text-navy-600">
                One point of contact for all your global immigration needs. From
                work permits and business visas to full relocation
                compliance&nbsp;&mdash; we coordinate across jurisdictions so
                your team can focus on what they do best.
              </p>
              <Link
                href="/businesses"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors hover:text-gold-600"
              >
                Explore our business solutions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Testimonial ——— */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-950 section-padding">
        {/* Decorative quote mark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-8 font-display text-[12rem] leading-none text-white/[0.04] sm:left-12 sm:text-[16rem]"
        >
          &ldquo;
        </div>

        <div className="container-narrow relative">
          <div className="mx-auto max-w-3xl text-center">
            <Quote className="mx-auto h-10 w-10 text-gold-400" />
            <blockquote className="mt-8">
              <p className="font-display text-2xl font-medium leading-relaxed text-white sm:text-3xl">
                &ldquo;We refer all of our clients to GMP for outbound
                immigration services and they never disappoint!&rdquo;
              </p>
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-gold-400">Russell Ford</p>
              <p className="mt-1 text-sm text-navy-300">Founding Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Latest Blog Posts ——— */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Latest Insights
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              News, guides, and analysis on global immigration.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col rounded-2xl border border-navy-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center gap-2 text-sm text-navy-400">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold text-navy-900 group-hover:text-gold-600">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-navy-600">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto pt-6">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-navy-700 transition-colors hover:text-gold-600"
                      >
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-14 rounded-2xl border border-dashed border-navy-200 bg-navy-50/50 p-12 text-center">
              <p className="text-navy-500">
                New content is on the way. Check back soon for insights on
                global immigration trends and best practices.
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-semibold text-navy-700 transition-colors hover:text-gold-600"
            >
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— CTA Section ——— */}
      <section className="relative overflow-hidden bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500">
        {/* Subtle decorative overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.15)_50%,transparent_60%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Simplify Your Global Mobility Challenges
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-800/80">
            Let us handle the complexity of international immigration so you can
            focus on growing your business.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-navy-900 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-navy-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-navy-700 focus:ring-offset-2 focus:ring-offset-gold-400"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
