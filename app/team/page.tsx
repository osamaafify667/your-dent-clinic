import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { Container } from "@/components/Container";
import { DoctorCard } from "@/components/DoctorCard";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { mergeDoctors } from "@/lib/store";
import { siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "فريقنا الطبي",
  description:
    "تعرف على الفريق الطبي في Your Dent Clinic بالمعادي، القاهرة: التخصصات والمؤهلات المعتمدة.",
  alternates: { canonical: "/team" },
  openGraph: {
    url: `${siteUrl}/team`,
    title: "فريقنا | Your Dent Clinic",
    description: "الفريق الطبي في Your Dent Clinic بالمعادي، القاهرة.",
  },
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">فريقنا</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            الفريق الطبي
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            فريقنا الطبي مكون من أطباء متخصصين في مختلف فروع طب الأسنان.
          </p>
        </Container>
      </section>

      {(await mergeDoctors()).length > 0 ? (
        <Container className="grid gap-6 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-3">
          {(await mergeDoctors()).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </Container>
      ) : (
        <Container className="flex flex-col items-center gap-5 py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-primary">
            <UserRound className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-bold text-charcoal">ملفات الفريق القادمة قريباً</h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            نحرص على عرض معلومات دقيقة عن الفريق الطبي بعد اعتمادها من إدارة العيادة. ترقبوا
            التحديثات قريباً.
          </p>
        </Container>
      )}

      <AppointmentCTA />
    </>
  );
}
