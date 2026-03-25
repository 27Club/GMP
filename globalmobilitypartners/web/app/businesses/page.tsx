import type { Metadata } from "next";
import {
  ArrowRight,
  Users,
  ShieldAlert,
  Clock,
  Eye,
  FileCheck,
  FileBadge,
  Plane,
  Lightbulb,
  Phone,
  ClipboardList,
  Rocket,
  HeartHandshake,
  Scale,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Corporate Immigration Services | Global Mobility Partners",
};

const painPoints = [
  {
    icon: Users,
    title: "Multiple Vendors",
    description:
      "Coordinating with different providers in every country creates confusion, inconsistency, and duplicated effort.",
  },
  {
    icon: ShieldAlert,
    title: "Compliance Risk",
    description:
      "Immigration regulations change constantly. A single misstep can result in fines, delays, or denied entries.",
  },
  {
    icon: Clock,
    title: "Slow Processes",
    description:
      "Without a centralized approach, bottlenecks pile up and timelines slip — delaying critical business moves.",
  },
  {
    icon: Eye,
    title: "Lack of Visibility",
    description:
      "When cases are scattered across vendors and countries, it's nearly impossible to track status or forecast outcomes.",
  },
];

const services = [
  {
    icon: FileCheck,
    title: "Work Permits",
    description:
      "Work authorization for transferring and hiring foreign nationals abroad. We handle applications, renewals, and extensions across 150+ countries.",
    highlights: [
      "Intra-company transfers",
      "Local hire permits",
      "Renewals & extensions",
    ],
  },
  {
    icon: FileBadge,
    title: "Document Support",
    description:
      "Procuring and authenticating documents to be valid for use abroad. From apostilles to consular legalization, we manage every step.",
    highlights: [
      "Apostille services",
      "Consular legalization",
      "Document procurement",
    ],
  },
  {
    icon: Plane,
    title: "Business Visas",
    description:
      "Guidance and obtainment of short-term visas for business travelers. Keep your teams moving without compliance headaches.",
    highlights: [
      "Visa assessment",
      "Application management",
      "Travel compliance",
    ],
  },
  {
    icon: Lightbulb,
    title: "Consulting",
    description:
      "Mergers & Acquisitions, H-1B Alternatives, Global Travel Compliance. Strategic advisory for complex mobility scenarios.",
    highlights: [
      "M&A due diligence",
      "Alternative work strategies",
      "Policy development",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    icon: Phone,
    title: "Discovery Call",
    description:
      "We learn about your organization, mobility needs, and current pain points to scope the right solution.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Strategy & Planning",
    description:
      "We develop a tailored immigration strategy with clear timelines, cost estimates, and country-specific guidance.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execution & Filing",
    description:
      "Our team manages the end-to-end process — document collection, applications, government liaison, and approvals.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Ongoing Support",
    description:
      "From renewals to compliance monitoring, we provide continuous support so your program runs smoothly.",
  },
];

export default function BusinessesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700/30 via-transparent to-transparent" />
        <div className="container-narrow section-padding relative z-10 py-28 sm:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
              For Businesses &amp; HR Teams
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              We Simplify Global Immigration for Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Instead of working separately with multiple vendors in different
              countries, collaborate with one dedicated US-based consultant for
              all destinations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Request a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#services" className="btn-secondary">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Managing Global Mobility Is Complex
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Companies expanding internationally face common challenges that
              slow growth and increase risk.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="group rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-colors group-hover:bg-red-100">
                  <point.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="section-padding bg-navy-50/50">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              How We Help
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              Comprehensive global immigration services, managed from start to
              finish by your dedicated US-based team.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-100/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-navy-600">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-navy-500">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Note */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="container-narrow">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/20">
              <Scale className="h-7 w-7 text-gold-400" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl">
              Cohesive US &amp; Global Strategy
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-200">
              We work directly with your US immigration attorney, so you
              receive cohesive US and global immigration strategy. No
              conflicting advice, no gaps in coverage — just one integrated
              approach to your company&rsquo;s immigration needs.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Our Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              A proven process that takes the complexity out of global
              immigration.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line (hidden on last card and on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-px w-8 translate-x-full bg-gradient-to-r from-gold-400 to-gold-200 lg:block" />
                )}
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 shadow-lg shadow-gold-400/25">
                    <step.icon className="h-7 w-7 text-navy-900" />
                  </div>
                  <span className="mt-4 block font-display text-sm font-bold text-gold-600">
                    Step {step.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Simplify Your Global Immigration?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">
            One partner. Every country. Let&rsquo;s build an immigration
            program that scales with your business.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
