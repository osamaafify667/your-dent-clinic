import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, CheckCircle2 } from "lucide-react";
import { getService, services } from "@/data/services";
import { siteUrl } from "@/data/clinic";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      url: `${siteUrl}/services/${service.slug}`,
      title: `${service.title} | Your Dent Clinic`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <section aria-labelledby="service-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <nav aria-label="مسار التنقل">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  الرئيسية
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  خدماتنا
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-charcoal">
                {service.title}
              </li>
            </ol>
          </nav>
          <h1 id="service-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            {service.title}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">{service.shortDescription}</p>
        </Container>
      </section>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-3">
        <Reveal className="flex flex-col gap-8 lg:col-span-2">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-charcoal">نبذة عن الخدمة</h2>
            {service.overview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-base leading-loose text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-charcoal/10 bg-surface p-7">
            <h2 className="text-xl font-bold text-charcoal">ماذا تتوقع؟</h2>
            <ul className="flex flex-col gap-3">
              {service.whatToExpect.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="rounded-xl bg-mint/60 p-5 text-sm leading-relaxed text-muted">
            المعلومات المقدمة في هذه الصفحة للتوعية العامة فقط ولا تغني عن الفحص الطبي. حالة كل
            مريض مختلفة، وسيقوم الطبيب بتقييم حالتك وشرح الخيارات الأنسب لك خلال الاستشارة.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <aside className="flex flex-col gap-5 rounded-2xl bg-primary p-7 text-white lg:sticky lg:top-28">
            <h2 className="text-xl font-bold">احجز استشارة لهذه الخدمة</h2>
            <p className="text-sm leading-relaxed text-white/85">
              أرسل طلبك عبر واتساب وسيتواصل معك فريق العيادة لمناقشة التفاصيل والمواعيد المتاحة.
            </p>
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-mint"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              احجز موعدك
            </Link>
          </aside>
        </Reveal>
      </Container>

      <section aria-labelledby="related-title" className="border-t border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-10 py-16">
          <div className="flex items-center justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-bold text-charcoal sm:text-3xl">
              خدمات أخرى قد تهمك
            </h2>
            <Link
              href="/services"
              className="hidden items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark sm:inline-flex"
            >
              جميع الخدمات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
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
