import type { Metadata } from "next";
import {
  ArrowRight,
  MonitorCheck,
  FolderLock,
  ShieldCheck,
  BarChart3,
  RefreshCw,
  Plug,
  Lock,
  Cloud,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Immigration Technology | Global Mobility Partners",
};

const features = [
  {
    icon: MonitorCheck,
    title: "Case Tracking Portal",
    description:
      "Real-time visibility into every case status. Track milestones, view timelines, and receive automated notifications — all from a single dashboard.",
    highlights: [
      "Real-time status updates",
      "Milestone tracking",
      "Automated notifications",
    ],
  },
  {
    icon: FolderLock,
    title: "Document Management",
    description:
      "Secure upload, storage, and sharing of immigration documents. Eliminate the back-and-forth of email attachments with a centralized, encrypted repository.",
    highlights: [
      "Encrypted file storage",
      "Version control",
      "Centralized access",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Compliance Dashboard",
    description:
      "Stay ahead of deadlines and requirements with proactive alerts. Monitor expiration dates, filing windows, and regulatory changes across all jurisdictions.",
    highlights: [
      "Deadline alerts",
      "Expiration tracking",
      "Regulatory updates",
    ],
  },
  {
    icon: BarChart3,
    title: "Reporting & Analytics",
    description:
      "Data-driven insights for your global mobility program. Track spend, processing times, approval rates, and program health at a glance.",
    highlights: [
      "Spend analysis",
      "Processing time metrics",
      "Program health reports",
    ],
  },
];

const integrations = [
  {
    icon: RefreshCw,
    title: "HR Systems",
    description:
      "Sync employee data with your existing HRIS to eliminate manual entry and keep records consistent.",
  },
  {
    icon: Plug,
    title: "Legal Platforms",
    description:
      "Connect with your US immigration counsel's systems for a unified view of domestic and global cases.",
  },
  {
    icon: Lock,
    title: "Security & SSO",
    description:
      "Enterprise-grade security with single sign-on, role-based access, and full audit logging.",
  },
  {
    icon: Cloud,
    title: "Cloud-Native",
    description:
      "Accessible anywhere, on any device. No software to install — just log in and go.",
  },
];

export default function TechnologyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-700/30 via-transparent to-transparent" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23ffffff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
        <div className="container-narrow section-padding relative z-10 py-28 sm:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold-400">
              Our Technology
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Technology-Powered Immigration
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">
              Leveraging modern tools to bring transparency, speed, and
              efficiency to global immigration.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Request a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a href="#features" className="btn-secondary">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Tools Built for Global Mobility
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Our technology platform is purpose-built to simplify every aspect
              of global immigration management.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-gold-200 hover:shadow-lg hover:shadow-gold-100/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy-900">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-navy-600">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {feature.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-navy-500"
                    >
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

      {/* Visibility Highlight */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Full Visibility, Zero Guesswork
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy-200">
              No more chasing updates across time zones. Our platform gives HR
              teams, attorneys, and employees a single source of truth for
              every immigration case worldwide.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { value: "24/7", label: "Dashboard Access" },
                { value: "150+", label: "Countries Covered" },
                { value: "Real-Time", label: "Status Updates" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
                >
                  <p className="font-display text-3xl font-bold text-gold-400">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-navy-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="section-padding bg-navy-50/50">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              Designed to Fit Your Ecosystem
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Designed to work alongside your existing HR and legal systems.
              Our platform complements your workflows — not complicates them.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {integrations.map((integration) => (
              <div
                key={integration.title}
                className="group rounded-2xl border border-navy-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-gold-200 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-colors group-hover:bg-gold-50 group-hover:text-gold-600">
                  <integration.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                  {integration.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="container-narrow text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            See Our Technology in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-200">
            Schedule a personalized demo and discover how our platform can
            transform your global immigration program.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="btn-primary">
              Request a Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
