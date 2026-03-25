import type { Metadata } from "next";
import { MapPin, Linkedin, Mail, ChevronDown } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Global Mobility Partners",
  description:
    "Schedule a call with a global immigration expert. Get in touch with Global Mobility Partners for case support, pricing, and partnership inquiries.",
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Location",
    value: "Atlanta, Georgia",
    href: null,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Global Mobility Partners",
    href: "https://linkedin.com/company/global-mobility-partners/",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@globalmobilitypartnersllc.com",
    href: "mailto:info@globalmobilitypartnersllc.com",
  },
];

const faqs = [
  {
    question: "How quickly can you start on a new case?",
    answer: "We typically begin within 48 hours of initial consultation.",
  },
  {
    question: "What countries do you cover?",
    answer:
      "We support immigration processes in 150+ countries through our vetted network of local partners.",
  },
  {
    question: "Do you work with individuals?",
    answer:
      "We primarily serve law firms and businesses, but we can refer individuals to qualified immigration attorneys.",
  },
  {
    question: "How do your fees work?",
    answer:
      "We provide transparent, case-based pricing. Contact us for a customized quote.",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-900 section-padding">
        <div className="container-narrow text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Schedule a Call with an Immigration Expert
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-200">
            Tell us about your needs and a member of our team will follow up
            within one business day.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Left: Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Right: Contact Info */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-100 text-gold-600">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-500">
                          {item.label}
                        </p>
                        <p className="mt-0.5 font-semibold text-navy-800">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Small blurb */}
              <div className="mt-8 rounded-xl bg-navy-800 p-6 text-navy-100">
                <h3 className="font-display text-lg font-bold text-white">
                  Why Global Mobility Partners?
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    30+ years combined immigration experience
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    Coverage in 150+ countries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    Trusted by startups and Fortune 500 firms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    Transparent, case-based pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <h2 className="text-center font-display text-3xl font-bold text-navy-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-navy-100 bg-white transition-shadow hover:shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy-800 marker:[font-size:0] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-navy-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5 text-navy-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
