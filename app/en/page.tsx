import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck, CalendarCheck, Clock, MapPin, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { InfoStrip } from "@/components/InfoStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { LocationSection } from "@/components/LocationSection";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { clinic, siteUrl } from "@/data/clinic";
import { services } from "@/data/services";
import { teamSectionVisible } from "@/data/team";
import { StatusBanner } from "@/components/StatusBanner";

export const metadata: Metadata = {
  title: "Dental Clinic in Maadi, Cairo | Your Dent Clinic",
  description:
    "Your Dent Clinic offers a wide range of dental services in Maadi, Cairo: cosmetic dentistry, teeth whitening, dental implants, root canal treatment, professional cleaning, and pediatric dentistry. Book your appointment today.",
  alternates: { canonical: "/en" },
  openGraph: {
    url: `${siteUrl}/en`,
    title: "Dental Clinic in Maadi, Cairo | Your Dent Clinic",
    description: "Dental services in Maadi, Cairo. Book your appointment at Your Dent Clinic.",
  },
};

const features = [
  { icon: CalendarCheck, title: "Advance booking via WhatsApp", text: "Send your request and choose a suitable time, and the clinic team will contact you to confirm." },
  { icon: Clock, title: "Evening hours", text: "Available Saturday to Thursday from 4 PM to 11 PM to suit your schedule." },
  { icon: MapPin, title: "Prime location in Maadi", text: "Othman Towers on the Nile Corniche, with easy access and parking." },
  { icon: ShieldCheck, title: "Your data is protected", text: "We only collect the data necessary to respond to your request, in accordance with the privacy policy." },
];

export default function HomePage() {
  return (
    <>
      <StatusBanner />
      <Hero />
      <InfoStrip />

      <section aria-labelledby="services-title">
        <Container className="flex flex-col gap-12 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Our Services"
            title="Dental Care for Your Needs"
            description="We offer a wide range of dental services. Choose a service to learn more about the procedure and what to expect."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <Reveal className="flex justify-center">
            <Link
              href="/en/services"
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 bg-surface px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              View All Services
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section aria-labelledby="about-title" className="border-y border-charcoal/10 bg-surface">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <img
              src="/images/about.svg"
              alt="About Your Dent Clinic illustration"
              className="mx-auto w-full max-w-md"
              width={800}
              height={640}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={150} className="order-1 flex flex-col items-start gap-6 lg:order-2">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold tracking-wide text-primary">About Us</span>
              <h2 id="about-title" className="text-3xl font-bold leading-snug text-charcoal sm:text-4xl">
                A clinic that cares about your smile from the first visit
              </h2>
            </div>
            <p className="text-base leading-relaxed text-muted">
              Your Dent Clinic is a dental clinic in the heart of Maadi on the Nile Corniche. We
              believe that the treatment journey starts with understanding your needs, so we take
              the time to listen to you and explain the available options before any procedure.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Comprehensive examination and discussion of options before treatment",
                "A customized care plan for each patient",
                "Follow-up after the procedure to ensure your comfort",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-charcoal">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/en/about"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Learn More About Us
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </section>

      {teamSectionVisible && (
        <section aria-labelledby="team-title">
          <Container className="flex flex-col gap-12 py-16 sm:py-20">
            <SectionHeading
              eyebrow="Our Team"
              title="A Specialized Medical Team"
              description="Meet the doctors and medical team at our clinic."
            />
          </Container>
        </section>
      )}

      <section aria-labelledby="features-title" className="bg-mint/40">
        <Container className="flex flex-col gap-12 py-16 sm:py-20">
          <SectionHeading
            eyebrow="Why Us"
            title="Care Designed for Your Comfort"
            description="Practical details that make your clinic experience easier."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="flex h-full flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-primary">
                    <feature.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-charcoal">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{feature.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <AppointmentCTA />
      <LocationSection />

      <section aria-label="Quick contact" className="border-t border-charcoal/10 bg-surface">
        <Container className="flex flex-col items-center gap-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-charcoal">Prefer a direct call?</h2>
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            The clinic team is available to answer your inquiries during working hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${clinic.mobile}`}
              className="inline-flex items-center gap-2 rounded-lg border border-charcoal/20 px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span dir="ltr">{clinic.mobile}</span>
            </a>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Contact Page
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
