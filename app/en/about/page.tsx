import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { LocationSection } from "@/components/LocationSection";
import { clinic, siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "About the Clinic",
  description:
    "Learn about Your Dent Clinic, a dental clinic in Maadi on the Nile Corniche: our vision, values, location information, and working hours.",
  alternates: { canonical: "/en/about" },
  openGraph: {
    url: `${siteUrl}/en/about`,
    title: "About the Clinic | Your Dent Clinic",
    description: "Information about Your Dent Clinic in Maadi, Cairo.",
  },
};

const values = [
  {
    title: "Transparency First",
    text: "We clearly explain your condition and available options before making any treatment decision.",
  },
  {
    title: "Patient Comfort",
    text: "We pay attention to your experience at the clinic from reception until final follow-up.",
  },
  {
    title: "Accurate Information",
    text: "We are committed to providing accurate educational content without unverified promises about treatment outcomes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">About Us</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            About Your Dent Clinic
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            A dental clinic in the heart of Maadi on the Nile Corniche, offering a wide range of
            family dental care in a comfortable, modern environment.
          </p>
        </Container>
      </section>

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-3xl font-bold leading-snug text-charcoal">Our Story</h2>
          <p className="text-base leading-loose text-muted">
            Your Dent Clinic was founded in Maadi with the goal of providing high-quality dental
            care in an environment close to the local community. We believe that a dental visit
            should be a clear and comfortable experience, so we start by listening to you and
            understanding your needs before proposing any treatment plan.
          </p>
          <p className="text-base leading-loose text-muted">
            Our team includes doctors specialized in various fields of dentistry, and we are
            committed to continuously developing our skills to keep up with the best international
            practices. Whether you need a periodic check-up or a comprehensive treatment plan, we
            are here to help you make the right decision for your smile.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <img
            src="/images/about.svg"
            alt="Illustration representing Your Dent Clinic"
            className="mx-auto w-full max-w-md"
            width={800}
            height={640}
            loading="lazy"
          />
        </Reveal>
      </Container>

      <section aria-labelledby="values-title" className="border-y border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-12 py-16 sm:py-20">
          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold tracking-wide text-primary">Our Values</span>
            <h2 id="values-title" className="text-3xl font-bold text-charcoal sm:text-4xl">
              The Principles We Work By
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 100}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-charcoal/10 bg-background p-7">
                  <span className="text-3xl font-bold text-primary/40">{`0${i + 1}`}</span>
                  <h3 className="text-lg font-bold text-charcoal">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <LocationSection />
      <AppointmentCTA />
    </>
  );
}
