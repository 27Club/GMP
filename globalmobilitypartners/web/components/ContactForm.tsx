"use client";

import { useState, FormEvent } from "react";

const serviceOptions = [
  { value: "", label: "Select a service..." },
  { value: "law-firm-services", label: "Law Firm Services" },
  { value: "corporate-immigration", label: "Corporate Immigration" },
  { value: "work-permits", label: "Work Permits" },
  { value: "business-visas", label: "Business Visas" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-xl border border-gold-200 bg-gold-50 px-6 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-500">
          <svg
            className="h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-navy-800">
          Thank You!
        </h3>
        <p className="mt-2 text-navy-600">
          Your message has been received. We&apos;ll get back to you within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              company: "",
              service: "",
              message: "",
            });
          }}
          className="mt-6 text-sm font-medium text-gold-600 underline underline-offset-2 transition-colors hover:text-gold-700"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-navy-800"
        >
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          aria-required="true"
          className="block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder-navy-300 shadow-sm transition-all duration-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-navy-800"
        >
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          aria-required="true"
          className="block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder-navy-300 shadow-sm transition-all duration-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>

      {/* Company (Optional) */}
      <div>
        <label
          htmlFor="contact-company"
          className="mb-1.5 block text-sm font-medium text-navy-800"
        >
          Company <span className="text-navy-400">(optional)</span>
        </label>
        <input
          type="text"
          id="contact-company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          className="block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder-navy-300 shadow-sm transition-all duration-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>

      {/* Service Interest */}
      <div>
        <label
          htmlFor="contact-service"
          className="mb-1.5 block text-sm font-medium text-navy-800"
        >
          Service Interest <span aria-hidden="true">*</span>
        </label>
        <select
          id="contact-service"
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          aria-required="true"
          className="block w-full rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 shadow-sm transition-all duration-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        >
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={!opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-navy-800"
        >
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your immigration needs..."
          aria-required="true"
          className="block w-full resize-y rounded-lg border border-navy-200 bg-white px-4 py-3 text-navy-800 placeholder-navy-300 shadow-sm transition-all duration-200 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        aria-disabled={submitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gold-500 px-6 py-3.5 text-base font-semibold text-navy-900 shadow-md transition-all duration-200 hover:bg-gold-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <svg
              className="-ml-1 mr-2 h-4 w-4 animate-spin text-navy-900"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
