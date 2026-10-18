import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { AppointmentCTA } from "@/components/AppointmentCTA";
import { LocationSection } from "@/components/LocationSection";
import { clinic, siteUrl } from "@/data/clinic";

export const metadata: Metadata = {
  title: "عن العيادة",
  description:
    "تعرّف على Your Dent Clinic، عيادة أسنان في المعادي على كورنيش النيل: رؤيتنا، قيمنا، ومعلومات الموقع وساعات العمل.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: `${siteUrl}/about`,
    title: "عن العيادة | Your Dent Clinic",
    description: "معلومات عن Your Dent Clinic في المعادي، القاهرة.",
  },
};

const values = [
  {
    title: "الشفافية أولاً",
    text: "نشرح لك الحالة والخيارات المتاحة بوضوح قبل اتخاذ أي قرار علاجي.",
  },
  {
    title: "راحة المريض",
    text: "نولي اهتماماً بتجربتك في العيادة منذ الاستقبال وحتى المتابعة النهائية.",
  },
  {
    title: "دقة المعلومات",
    text: "نلتزم بتقديم محتوى توعوي دقيق دون وعود غير مؤكدة حول نتائج العلاج.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-charcoal/10 bg-surface">
        <Container className="flex flex-col gap-4 py-14 sm:py-16">
          <span className="text-sm font-semibold tracking-wide text-primary">عن العيادة</span>
          <h1 id="page-title" className="text-4xl font-bold text-charcoal sm:text-5xl">
            عن Your Dent Clinic
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            عيادة أسنان في قلب المعادي على كورنيش النيل، نقدم خيارات رعاية متنوعة للعائلة في بيئة
            مريحة وحديثة.
          </p>
        </Container>
      </section>

      <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col items-start gap-6">
          <h2 className="text-3xl font-bold leading-snug text-charcoal">قصتنا</h2>
          <p className="text-base leading-loose text-muted">
            تأسست Your Dent Clinic في المعادي بهدف تقديم رعاية أسنان عالية الجودة في بيئة
            قريبة من المجتمع المحلي. نؤمن أن زيارة طبيب الأسنان يجب أن تكون تجربة واضحة ومريحة،
            لذلك نبدأ بالاستماع إليك وفهم احتياجاتك قبل اقتراح أي خطة علاج.
          </p>
          <p className="text-base leading-loose text-muted">
            يضم فريقنا أطباء متخصصين في مختلف مجالات طب الأسنان، ونحرص على تطوير مهاراتنا
            باستمرار لمواكبة أفضل الممارسات العالمية. سواء كنت تحتاج إلى فحص دوري أو خطة علاج
            شاملة، نحن هنا لمساعدتك في اتخاذ القرار المناسب لابتسامتك.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <img
            src="/images/about.svg"
            alt="رسم توضيحي يمثل عيادة Your Dent Clinic"
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
            <span className="text-sm font-semibold tracking-wide text-primary">قيمنا</span>
            <h2 id="values-title" className="text-3xl font-bold text-charcoal sm:text-4xl">
              المبادئ التي نعمل بها
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
