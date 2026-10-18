import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { Container } from "@/components/Container";
import { DoctorCard } from "@/components/DoctorCard";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { doctors } from "@/data/team";
import { siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the medical team at Your Dent Clinic in Maadi, Cairo: specialties and approved qualifications.",
  alternates: { canonical: "/en/team" },
  openGraph: {
    url: `${siteUrl}/en/team`,
    title: "Our Team | Your Dent Clinic",
    description: "The medical team at Your Dent Clinic in Maadi, Cairo.",
  },
};

export default function TeamPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">Our Team</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            Medical Team
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Our medical team consists of doctors specialized in various fields of dentistry.
          </p>
        </Container>
      </section>

      {doctors.length > 0 ? (
        <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </Container>
      ) : (
        <Container className="flex flex-col items-center gap-5 py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-primary">
            <UserRound className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-charcoal">Team profiles coming soon</h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            We are committed to displaying accurate information about the medical team after
            approval from the clinic management. Stay tuned for updates.
          </p>
        </Container>
      )}

      <AppointmentCTA />
    </>
  );
}
