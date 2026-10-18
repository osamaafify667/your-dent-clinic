import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { clinic, siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "The privacy policy of the Your Dent Clinic website: the data we collect and how we use it and your rights.",
  alternates: { canonical: "/en/privacy-policy" },
  openGraph: {
    url: `${siteUrl}/en/privacy-policy`,
    title: "Privacy Policy | Your Dent Clinic",
    description: "The privacy policy of the Your Dent Clinic website.",
  },
};

const sections = [
  {
    title: "Data We Collect",
    content: [
      "When you submit a booking request through the website form, we only collect the data you voluntarily enter: name, phone number, requested service, preferred date and time, and preferred contact method.",
      "We do not collect any sensitive medical or health data through this website, and we do not request any information unrelated to responding to the booking request.",
    ],
  },
  {
    title: "How We Use Your Data",
    content: [
      "The provided data is used for one purpose only: contacting you to respond to the booking or inquiry request and coordinating the appropriate appointment.",
      "When submitting the request, you will be redirected to the WhatsApp application to complete the sending. Any data exchanged via WhatsApp is subject to WhatsApp's privacy policy.",
    ],
  },
  {
    title: "Data Sharing",
    content: [
      "We do not sell your personal data or share it with any third party for marketing purposes.",
      "Data may only be shared when legally required or when necessary to provide the requested service (such as contacting you via a messaging service provider).",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "You have the right at any time to request access to your personal data we hold, or request its correction or deletion, by contacting us through the contact channels published on the website.",
      "You can also stop communicating with us at any time without any impact on your right to receive service.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this policy from time to time. Any modifications will be posted on this page with the last updated date.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      `For any inquiry about this policy, you can contact us via email at ${clinic.email} or via WhatsApp at ${clinic.mobile}.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">Legal</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Last updated: October 2026. This policy explains how the {clinic.name} website handles
            your personal data.
          </p>
        </Container>
      </section>

      <Container className="max-w-3xl py-16 sm:py-20">
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <section key={section.title} aria-labelledby={`privacy-${i}`} className="flex flex-col gap-3">
              <h2 id={`privacy-${i}`} className="text-xl font-bold text-charcoal">
                {section.title}
              </h2>
              {section.content.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-loose text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
