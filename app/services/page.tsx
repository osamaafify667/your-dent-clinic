import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading } from "@/components/SectionHeading";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { Reveal } from "@/components/Reveal";
import { mergeServices } from "@/lib/store";
import { siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "خدمات الأسنان",
  description:
    "استكشف خدمات الأسنان المتاحة في Your Dent Clinic بالمعادي: تجميل الأسنان، التبييض، الزراعة، الحشو والترميم، علاج الجذور، التنظيف الاحترافي، وطب أسنان الأطفال.",
  alternates: { canonical: "/services" },
  openGraph: {
    url: `${siteUrl}/services`,
    title: "خدماتنا | Your Dent Clinic",
    description: "خدمات الأسنان المتاحة في Your Dent Clinic بالمعادي، القاهرة.",
  },
};

export default async function ServicesPage() {
  const services = mergeServices();

  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">خدماتنا</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            خدمات الأسنان
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            نقدم مجموعة متنوعة من خدمات طب الأسنان لتناسب احتياجاتك. اختر أي خدمة لمعرفة المزيد
            عن الإجراء وما يمكن توقعه.
          </p>
        </Container>
      </section>

      <section aria-label="قائمة الخدمات">
        <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
          {(await mergeServices()).map((service, i) => (
            <Reveal key={service.id} delay={(i % 3) * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </Container>
      </section>

      <AppointmentCTA />
    </>
  );
}
