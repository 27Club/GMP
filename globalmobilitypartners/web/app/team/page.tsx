import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe,
  Heart,
  Users,
  ArrowRight,
  Handshake,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Meet The Team | Global Mobility Partners",
  description:
    "Meet the experienced team behind Global Mobility Partners — over 30 years combined experience coordinating global immigration.",
};

const team = [
  {
    name: "Michelle LePage",
    title: "Founder",
    initials: "ML",
    color: "bg-gold-500 text-navy-900",
    bio: "With 15+ years in global immigration, including 7 years at a major law firm, Michelle has supported hundreds of companies from startups to Fortune 500 organizations with their worldwide immigration requirements across every region.",
  },
  {
    name: "Tanya Montalvo",
    title: "Global Immigration Specialist",
    initials: "TM",
    color: "bg-navy-700 text-white",
    bio: null,
  },
  {
    name: "Kyle Homstol",
    title: "Operations Manager",
    initials: "KH",
    color: "bg-navy-600 text-white",
    bio: null,
  },
  {
    name: "Emily Rastegar",
    title: "Junior Global Immigration Case Worker",
    initials: "ER",
    color: "bg-gold-600 text-navy-900",
    bio: null,
  },
  {
    name: "Ana Berumen",
    title: "Junior Immigration Case Worker",
    initials: "AB",
    color: "bg-navy-800 text-white",
    bio: null,
  },
  {
    name: "Mark LePage",
    title: "Finance Manager",
    initials: "ML",
    color: "bg-gold-700 text-white",
    bio: null,
  },
];

const values = [
  {
    icon: Globe,
    heading: "Global Network",
    description:
      "We maintain trusted partnerships with immigration professionals in 150+ countries, giving your cases the local expertise they deserve.",
  },
  {
    icon: Heart,
    heading: "Client-First Approach",
    description:
      "Every case is personal. We treat each applicant with care and keep communication transparent from start to finish.",
  },
  {
    icon: ShieldCheck,
    heading: "Compliance & Accuracy",
    description:
      "Our meticulous processes and quality checks ensure filings are accurate, timely, and compliant with local regulations.",
  },
  {
    icon: Handshake,
    heading: "True Partnership",
    description:
      "We integrate seamlessly with your team, acting as an extension of your practice rather than just another vendor.",
  },
];

export default function TeamPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-900 section-padding">
        <div className="container-narrow text-center">
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Meet The Team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-navy-200">
            Over 30 years combined experience coordinating global immigration.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-navy-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Avatar */}
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold ${member.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  {member.initials}
                </div>

                {/* Name & Title */}
                <h3 className="mt-6 text-center font-display text-xl font-bold text-navy-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-center text-sm font-medium text-gold-600">
                  {member.title}
                </p>

                {/* Bio */}
                {member.bio && (
                  <p className="mt-4 text-center text-sm leading-relaxed text-navy-600">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
              A Local Touch with a Global Reach
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-navy-600">
              We believe global immigration doesn&rsquo;t have to feel impersonal.
              Our team blends deep local knowledge with a worldwide network to
              deliver results that are both efficient and human.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.heading} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                    {value.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-800">
        <div className="container-narrow text-center">
          <Users className="mx-auto h-10 w-10 text-gold-400" />
          <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Ready to Work Together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-navy-200">
            Schedule a call with our team and discover how we can simplify your
            global immigration operations.
          </p>
          <Link
            href="/contact"
            className="btn-primary mt-8 inline-flex items-center gap-2"
          >
            Schedule a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
