import type { Metadata } from "next";
import {
  ArrowRight,
  Handshake,
  Settings,
  Bell,
  FileCheck,
  Stamp,
  Plane,
  Globe,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services for Law Firms | Global Mobility Partners",
};

const steps = [
  {
    number: "01",
    icon: Handshake,
    title: "Refer Your Client",
    description:
      "You introduce us to your client's global immigration needs. We take it from there with a seamless handoff.",
  },
  {
    number: "02",
    icon: Settings,
    title: "We Handle Everything",
    description:
      "From work permits to document authentication, we manage the entire process across 150+ countries.",
  },
  {
    number: "03",
    icon: Bell,
    title: "You Stay Informed",
    description:
      "Regular updates keep you in the loop so you maintain your client relationship throughout the process.",
  },
];

const services = [
  {
    icon: FileCheck,
    title: "Outbound Work Permits",
    description:
      "End-to-end work authorization for employees relocating abroad, including applications, renewals, and extensions.",
  },
  {
    icon: Stamp,
    title: "Document Authentication & Apostille",
    description:
      "Procurement, legalization, and apostille of documents required for international use across jurisdictions.",
  },
  {
    icon: Plane,
    title: "Business Travel Compliance",
    description:
      "Ensure your clients' employees meet visa requirements and compliance obligations for international business travel.",
  },
  {
    icon: Globe,
    title: "Global Immigration Strategy",
    description:
      "Strategic consulting to build scalable global mobility programs that align with your clients' business objectives.",
  },
];

const benefits = [
  "White-label service preserves your client relationship",
  "30+ years combined global immigration experience",
  "Coverage in 150+ countries through vetted local partners",
  "Seamless coordination with your US immigration strategy",
  "Dedicated US-based point of contact",
];

export default function LawFirmsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700/30 via-transparent to-transparent" />
        <div className="container-narrow section-padding relative z-10 py-28 sm:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
              For US Immigration Law Firms
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Global Immigration Support for US Law Firms
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Expand your practice globally without building an in-house
              international team. We handle outbound immigration so you can
              focus on US cases.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Outbound Immigration Without the Overhead
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-navy-600">
              Your clients need to send employees abroad, but outbound
              immigration isn&rsquo;t your specialty. Instead of turning away
              business or scrambling with unfamiliar foreign processes, partner
              with GMP. We act as your global immigration arm, delivering
              expert international support while you retain the client
              relationship.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="section-padding bg-navy-50/50"
      >
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              A simple three-step process designed to make global immigration
              seamless for you and your clients.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 shadow-lg shadow-gold-400/25">
                  <step.icon className="h-7 w-7 text-navy-900" />
                </div>
                <span className="mt-4 block font-display text-sm font-bold text-gold-600">
                  Step {step.number}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-navy-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Services We Provide for Your Clients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              Comprehensive global immigration solutions delivered under your
              firm&rsquo;s trusted relationship.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="container-narrow">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Why Partner With Us
              </h2>
              <p className="mt-4 text-lg text-navy-200">
                GMP was built to complement US immigration law firms.
                Everything we do is designed to make you look good.
              </p>
            </div>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold-400" />
                  <p className="text-navy-100">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="section-padding bg-navy-50/50">
        <div className="container-narrow">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100">
              <Shield className="h-7 w-7 text-navy-700" />
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
              Your Client. Your Relationship.
            </h3>
            <p className="mt-3 text-navy-600">
              We never solicit your clients for US immigration work. Our
              white-label approach means we operate as an extension of your
              firm, ensuring your client relationship stays intact.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Offer Global Immigration Services?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">
            Let&rsquo;s discuss how GMP can help your firm serve clients with
            international needs — without the overhead.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
