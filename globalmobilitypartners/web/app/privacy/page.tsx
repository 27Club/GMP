import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Global Mobility Partners",
  description:
    "Learn how Global Mobility Partners LLC collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="section-padding bg-white">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-navy-500">
          Last updated: March 24, 2026
        </p>

        <div className="mt-10 space-y-10 text-navy-700 leading-relaxed">
          {/* Intro */}
          <p>
            Global Mobility Partners LLC (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
            or &ldquo;us&rdquo;) is committed to protecting the privacy of our
            clients, partners, and website visitors. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website or engage our services.
          </p>

          {/* Information We Collect */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Information We Collect
            </h2>
            <p className="mt-4">
              We may collect the following types of information:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-navy-800">Personal Information:</strong>{" "}
                Name, email address, phone number, company name, and other
                details you provide when completing our contact form or engaging
                our services.
              </li>
              <li>
                <strong className="text-navy-800">
                  Immigration Case Data:
                </strong>{" "}
                Passport details, employment history, education records, and
                other information necessary to process immigration applications
                on behalf of our clients.
              </li>
              <li>
                <strong className="text-navy-800">Usage Data:</strong>{" "}
                Information about how you interact with our website, including IP
                address, browser type, pages visited, and referring URLs.
              </li>
              <li>
                <strong className="text-navy-800">
                  Cookies and Tracking Technologies:
                </strong>{" "}
                We use cookies and similar technologies to improve your
                experience, analyze site traffic, and understand usage patterns.
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              How We Use Information
            </h2>
            <p className="mt-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                To provide, operate, and maintain our global immigration
                coordination services.
              </li>
              <li>
                To respond to inquiries, schedule consultations, and communicate
                about your case or our services.
              </li>
              <li>
                To process immigration applications and coordinate with local
                partners and legal professionals worldwide.
              </li>
              <li>
                To improve our website, services, and client experience based on
                usage patterns and feedback.
              </li>
              <li>
                To comply with applicable laws, regulations, and legal
                obligations.
              </li>
              <li>
                To send occasional updates about our services, industry news, or
                policy changes (you may opt out at any time).
              </li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Information Sharing
            </h2>
            <p className="mt-4">
              We do not sell, rent, or trade your personal information. We may
              share your information in the following limited circumstances:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-navy-800">Service Partners:</strong>{" "}
                With vetted immigration professionals and local partners in the
                countries where your case is being processed, solely for the
                purpose of fulfilling our services.
              </li>
              <li>
                <strong className="text-navy-800">Legal Compliance:</strong>{" "}
                When required by law, regulation, legal process, or governmental
                request.
              </li>
              <li>
                <strong className="text-navy-800">Business Transfers:</strong>{" "}
                In connection with a merger, acquisition, or sale of assets, your
                information may be transferred as part of that transaction.
              </li>
              <li>
                <strong className="text-navy-800">With Your Consent:</strong>{" "}
                When you have given us explicit permission to share your
                information for a specific purpose.
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Data Security
            </h2>
            <p className="mt-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. These measures include
              encrypted data transmission, secure storage systems, and access
              controls limited to authorized personnel.
            </p>
            <p className="mt-4">
              While we strive to protect your personal information, no method of
              transmission over the Internet or electronic storage is 100%
              secure. We cannot guarantee absolute security but are committed to
              maintaining industry-standard protections.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Your Rights
            </h2>
            <p className="mt-4">
              Depending on your jurisdiction, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <strong className="text-navy-800">Access:</strong> Request a
                copy of the personal information we hold about you.
              </li>
              <li>
                <strong className="text-navy-800">Correction:</strong> Request
                that we correct inaccurate or incomplete information.
              </li>
              <li>
                <strong className="text-navy-800">Deletion:</strong> Request
                that we delete your personal information, subject to legal
                retention requirements.
              </li>
              <li>
                <strong className="text-navy-800">Opt-Out:</strong> Unsubscribe
                from marketing communications at any time by following the
                instructions in our emails or contacting us directly.
              </li>
              <li>
                <strong className="text-navy-800">Data Portability:</strong>{" "}
                Request a machine-readable copy of your data where technically
                feasible.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the
              information provided below.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="font-display text-2xl font-bold text-navy-900">
              Contact Us
            </h2>
            <p className="mt-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="mt-4 rounded-xl border border-navy-100 bg-navy-50 p-6">
              <p className="font-semibold text-navy-800">
                Global Mobility Partners LLC
              </p>
              <p className="mt-1">Atlanta, Georgia</p>
              <p className="mt-1">
                Email:{" "}
                <a
                  href="mailto:info@globalmobilitypartnersllc.com"
                  className="font-medium text-gold-600 hover:underline"
                >
                  info@globalmobilitypartnersllc.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
