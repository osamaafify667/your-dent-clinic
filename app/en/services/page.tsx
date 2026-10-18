import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { Reveal } from "@/components/Reveal";
import { mergeServices } from "@/lib/store";
import { siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Dental Services",
  description:
    "Explore the dental services available at Your Dent Clinic in Maadi: cosmetic dentistry, teeth whitening, dental implants, restorations, root canal treatment, professional cleaning, and pediatric dentistry.",
  alternates: { canonical: "/en/services" },
  openGraph: {
    url: `${siteUrl}/en/services`,
    title: "Dental Services | Your Dent Clinic",
    description: "Dental services at Your Dent Clinic in Maadi, Cairo.",
  },
};

export default async function ServicesPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">Our Services</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            Dental Services
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            We offer a wide range of dental services to suit your needs. Choose a service to learn
            more about the procedure and what to expect.
          </p>
        </Container>
      </section>

      <section aria-label="Services list">
        <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
          {(await mergeServices()).map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </Container>
      </section>

      <AppointmentCTA />
    </>
  );
}
