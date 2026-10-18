import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, CheckCircle2 } from "lucide-react";
import { mergeServices } from "@/lib/store";
import { siteUrl } from "@/data/clinic";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

export async function generateStaticParams() {
  const services = await mergeServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const services = await mergeServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.titleEn,
    description: service.shortDescriptionEn,
    alternates: { canonical: `/en/services/${service.slug}` },
    openGraph: {
      url: `${siteUrl}/en/services/${service.slug}`,
      title: `${service.titleEn} | Your Dent Clinic`,
      description: service.shortDescriptionEn,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const services = await mergeServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section aria-labelledby="service-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/en" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/en/services" className="transition-colors hover:text-primary">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal">
                {service.titleEn}
              </li>
            </ol>
          </nav>
          <h1 id="service-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            {service.titleEn}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {service.shortDescriptionEn}
          </p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-3">
        <Reveal className="flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-charcoal">About This Service</h2>
            {service.overviewEn.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-loose text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-7">
            <h2 className="text-xl font-bold text-charcoal">What to Expect</h2>
            <ul className="flex flex-col gap-3">
              {service.whatToExpectEn.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-xl bg-mint/60 p-5 text-sm leading-relaxed text-muted">
            The information on this page is for general awareness only and does not replace a
            medical examination. Each patient's case is different, and the dentist will assess your
            condition and explain the most suitable options during the consultation.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <aside className="flex flex-col gap-5 rounded-2xl bg-primary p-7 text-white lg:sticky lg:top-28">
            <h2 className="text-xl font-bold">Book a Consultation</h2>
            <p className="text-sm leading-relaxed text-white/85">
              Send your request via WhatsApp and the clinic team will contact you to discuss
              details and available appointments.
            </p>
            <Link
              href="/en/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-mint"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book Appointment
            </Link>
          </aside>
        </Reveal>
      </Container>

      <section aria-labelledby="related-title" className="border-t border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-10 py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-bold text-charcoal sm:text-3xl">
              Other Services You May Like
            </h2>
            <Link
              href="/en/services"
              className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:inline-flex"
            >
              All Services
              <ArrowLeft className="h-4 w-4 rotate-180" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
