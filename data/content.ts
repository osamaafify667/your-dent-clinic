import type { Service } from "./services";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  bio: string;
  image?: string;
};

export const doctors: Doctor[] = [];

export const teamSectionVisible = doctors.length > 0;

export type ServiceRecord = Service & { id: string };

export const services: ServiceRecord[] = [
  {
    id: "svc-1",
    slug: "cosmetic-dentistry",
    title: "تجميل الأسنان",
    titleEn: "Cosmetic Dentistry",
    shortDescription:
      "خيارات تجميلية مثل القشور الخزفية وتصحيح الابتسامة لتحسين مظهر الأسنان.",
    shortDescriptionEn:
      "Cosmetic options such as veneers and smile correction to improve the appearance of your teeth.",
    overview: [
      "يهتم تجميل الأسنان بتحسين مظهر الابتسامة من خلال عدة خيارات علاجية وتجميلية، مثل القشور الخزفية (الفينير)، وتصحيح اصفرار الأسنان، وتحسين شكل الأسنان غير المنتظمة.",
      "يبدأ العلاج عادةً بفحص شامل ومناقشة أهدافك مع الطبيب، ثم يُخطط العلاج المناسب لحالتك بناءً على تقييم العيادة.",
    ],
    overviewEn: [
      "Cosmetic dentistry focuses on improving the appearance of your smile through various treatment options, such as porcelain veneers, correcting tooth discoloration, and improving the shape of irregular teeth.",
      "Treatment usually begins with a comprehensive examination and a discussion of your goals with the dentist, followed by a treatment plan tailored to your case based on the clinic's assessment.",
    ],
    whatToExpect: [
      "فحص أولي ومناقشة التوقعات",
      "خطة علاج مخصصة حسب الحالة",
      "متابعة دورية بعد الإجراء",
    ],
    whatToExpectEn: [
      "Initial examination and discussion of expectations",
      "A customized treatment plan based on your case",
      "Regular follow-up after the procedure",
    ],
    icon: "smile",
  },
  {
    id: "svc-2",
    slug: "teeth-whitening",
    title: "تبييض الأسنان",
    titleEn: "Teeth Whitening",
    shortDescription:
      "إجراء آمن يُجرى تحت إشراف طبي لتفتيح لون الأسنان وتحسين مظهر الابتسامة.",
    shortDescriptionEn:
      "A safe procedure performed under medical supervision to lighten tooth color and enhance your smile.",
    overview: [
      "تبييض الأسنان إجراء يهدف إلى تفتيح لون الأسنان باستخدام مواد آمنة تُطبق تحت إشراف طبيب الأسنان، وهو من أكثر إجراءات تجميل الأسنان شيوعاً.",
      "تختلف النتائج من شخص لآخر حسب طبيعة الأسنان ونوع التصبغات، وسيوضح لك الطبيب الخيارات المتاحة وما يمكن توقعه بشكل واقعي.",
    ],
    overviewEn: [
      "Teeth whitening is a procedure aimed at lightening the color of your teeth using safe materials applied under the supervision of a dentist. It is one of the most common cosmetic dental procedures.",
      "Results vary from person to person depending on the nature of the teeth and the type of stains. Your dentist will explain the available options and what you can realistically expect.",
    ],
    whatToExpect: [
      "تقييم حالة الأسنان واللثة قبل الإجراء",
      "شرح الخيارات المتاحة والتوقعات الواقعية",
      "إرشادات للحفاظ على النتيجة",
    ],
    whatToExpectEn: [
      "Evaluation of teeth and gum condition before the procedure",
      "Explanation of available options and realistic expectations",
      "Instructions for maintaining the results",
    ],
    icon: "sparkles",
  },
  {
    id: "svc-3",
    slug: "dental-implants",
    title: "زراعة الأسنان",
    titleEn: "Dental Implants",
    shortDescription:
      "حل طويل الأمد لتعويض الأسنان المفقودة باستخدام غرسات تُثبت في عظم الفك.",
    shortDescriptionEn:
      "A long-term solution for replacing missing teeth using implants fixed in the jawbone.",
    overview: [
      "زراعة الأسنان هي إجراء لتعويض الأسنان المفقودة عبر غرسات تُثبت جراحياً في عظم الفك وتعمل كأساس لتثبيت تيجان أو جسور صناعية.",
      "تتطلب الزراعة تقييماً دقيقاً لكثافة العظم وصحة الفم، وتمر بمراحل علاجية قد تمتد لعدة أشهر حتى الالتئام الكامل.",
    ],
    overviewEn: [
      "Dental implants are a procedure to replace missing teeth through implants surgically fixed in the jawbone, serving as a foundation for crowns or artificial bridges.",
      "Implants require a precise assessment of bone density and oral health, and go through treatment stages that may extend over several months until complete healing.",
    ],
    whatToExpect: [
      "فحص وتقييم شامل لحالة العظم والفم",
      "خطة علاج متعددة المراحل",
      "زيارات متابعة للالتئام والتثبيت النهائي",
    ],
    whatToExpectEn: [
      "Comprehensive examination and assessment of bone and oral condition",
      "A multi-stage treatment plan",
      "Follow-up visits for healing and final fitting",
    ],
    icon: "bone",
  },
  {
    id: "svc-4",
    slug: "dental-restorations",
    title: "حشو وترميم الأسنان",
    titleEn: "Dental Restorations",
    shortDescription:
      "علاج التسوس وترميم الأسنان المتضررة باستخدام حشوات تجميلية متطابقة مع لون السن.",
    shortDescriptionEn:
      "Treatment of cavities and restoration of damaged teeth using aesthetic fillings matched to tooth color.",
    overview: [
      "يعالج الحشو والترميم الأسنان المصابة بالتسوس أو المتضررة من الكسور، حيث يُزال الجزء المتضرر ويُستبدل بحشوة ترميمية تعيد شكل السن ووظيفته.",
      "تتوفر حشوات تجميلية بلون السن الطبيعي لتتناسب مع مظهر ابتسامتك، ويُحدد الطبيب النوع الأنسب حسب حالة السن.",
    ],
    overviewEn: [
      "Fillings and restorations treat teeth affected by cavities or fractures. The damaged part is removed and replaced with a restorative filling that restores the tooth's shape and function.",
      "Aesthetic fillings matching your natural tooth color are available to blend with your smile. The dentist will determine the most suitable type based on the tooth's condition.",
    ],
    whatToExpect: [
      "إزالة التسوس وتنظيف السن",
      "حشوة ترميمية متطابقة مع لون السن",
      "تعليمات للعناية بعد العلاج",
    ],
    whatToExpectEn: [
      "Removal of decay and cleaning the tooth",
      "A restorative filling matched to the tooth color",
      "Post-treatment care instructions",
    ],
    icon: "wrench",
  },
  {
    id: "svc-5",
    slug: "root-canal",
    title: "علاج الجذور والأعصاب",
    titleEn: "Root Canal Treatment",
    shortDescription:
      "علاج يهدف إلى إنقاذ السن المصاب بالتهاب أو تلف في العصب بدلاً من خلعه.",
    shortDescriptionEn:
      "A treatment aimed at saving a tooth with nerve inflammation or damage instead of extracting it.",
    overview: [
      "علاج الجذر (العصب) يُجرى عندما يصل التسوس أو الضرر إلى العصب الداخلي للسن، حيث يُزال النسيج المصاب ويُنظف ويُحشو السن لإنقاذه من الخلع.",
      "يُجرى العلاج تحت التخدير الموضعي، وقد يحتاج السن لاحقاً إلى تاج لحمايته واستعادة وظيفته الكاملة.",
    ],
    overviewEn: [
      "Root canal treatment is performed when decay or damage reaches the inner nerve of the tooth. The infected tissue is removed, the tooth is cleaned and filled to save it from extraction.",
      "The procedure is performed under local anesthesia, and the tooth may later need a crown for protection and full function restoration.",
    ],
    whatToExpect: [
      "تخدير موضعي لراحة المريض",
      "تنظيف وحشو قنوات الجذر",
      "تقييم الحاجة لتاج حماية بعد العلاج",
    ],
    whatToExpectEn: [
      "Local anesthesia for patient comfort",
      "Cleaning and filling of the root canals",
      "Evaluation of the need for a protective crown after treatment",
    ],
    icon: "activity",
  },
  {
    id: "svc-6",
    slug: "teeth-cleaning",
    title: "تنظيف الأسنان الاحترافي",
    titleEn: "Professional Teeth Cleaning",
    shortDescription:
      "إزالة الجير والتصبغات وتلميع الأسنان للحفاظ على صحة الفم واللثة.",
    shortDescriptionEn:
      "Removal of tartar and stains and polishing teeth to maintain oral and gum health.",
    overview: [
      "التنظيف الاحترافي للأسنان إجراء دوري يهدف إلى إزالة الجير والتصبغات المتراكمة وتلميع الأسنان، مما يساعد على الوقاية من تسوس الأسنان وأمراض اللثة.",
      "يُنصح عادةً بإجراء التنظيف الدوري كل ستة أشهر، وقد يختلف ذلك حسب حالة كل مريض.",
    ],
    overviewEn: [
      "Professional teeth cleaning is a periodic procedure aimed at removing accumulated tartar and stains and polishing the teeth, helping prevent tooth decay and gum disease.",
      "Periodic cleaning is usually recommended every six months, though this may vary depending on each patient's condition.",
    ],
    whatToExpect: [
      "إزالة الجير والتصبغات",
      "تلميع الأسنان",
      "نصائح للعناية اليومية بالفم",
    ],
    whatToExpectEn: [
      "Removal of tartar and stains",
      "Teeth polishing",
      "Tips for daily oral care",
    ],
    icon: "droplets",
  },
  {
    id: "svc-7",
    slug: "pediatric-dentistry",
    title: "طب أسنان الأطفال",
    titleEn: "Pediatric Dentistry",
    shortDescription:
      "رعاية أسنان الأطفال في بيئة مريحة ومصممة لتجربة إيجابية وآمنة.",
    shortDescriptionEn:
      "Dental care for children in a comfortable environment designed for a positive, safe experience.",
    overview: [
      "يهتم طب أسنان الأطفال بصحة الفم والأسنان منذ الطفولة المبكرة، ويشمل الفحوصات الدورية، والوقاية من التسوس، وعلاج مشاكل الأسنان اللبنية.",
      "يحرص فريق العيادة على توفير بيئة مريحة تساعد الطفل على تقبّل زيارة طبيب الأسنان وبناء عادات عناية صحية مبكرة.",
    ],
    overviewEn: [
      "Pediatric dentistry focuses on oral and dental health from early childhood. It includes periodic check-ups, cavity prevention, and treatment of baby teeth problems.",
      "The clinic team strives to provide a comfortable environment that helps the child accept dental visits and build healthy care habits early on.",
    ],
    whatToExpect: [
      "فحص دوري ومتابعة نمو الأسنان",
      "إجراءات وقائية مثل الفلورايد",
      "توجيهات للأهل حول العناية بأسنان الطفل",
    ],
    whatToExpectEn: [
      "Periodic check-ups and monitoring of teeth growth",
      "Preventive procedures such as fluoride",
      "Guidance for parents on children's dental care",
    ],
    icon: "baby",
  },
];
