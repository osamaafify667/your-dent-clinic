export type Lang = "ar" | "en";

const ar = {
  dir: "rtl",
  nav: {
    home: "الرئيسية",
    services: "خدماتنا",
    team: "فريقنا",
    about: "عن العيادة",
    contact: "تواصل معنا",
  },
  bookCta: "احجز موعدك",
  menuOpen: "فتح القائمة",
  menuClose: "إغلاق القائمة",
  mainNav: "التنقل الرئيسي",
  mobileMenu: "قائمة الجوال",
  quickLinks: "روابط سريعة",
  followUs: "تابعنا",
  facebook: "فيسبوك",
  hours: "ساعات العمل",
  contactUs: "تواصل معنا",
  location: {
    eyebrow: "موقعنا",
    title: "يسعدنا استقبالك في المعادي",
    address: "العنوان",
    workHours: "ساعات العمل",
    openInMaps: "افتح الموقع في خرائط جوجل",
    mapTitle: "موقع Your Dent Clinic على الخريطة",
    rateOnGoogle: "قيمنا على جوجل",
    rateText: "تجربتك تهمنا — قيّم العيادة على جوجل وساعد مرضى يلاقيوا العيادة بسهولة.",
    rateButton: "قيمنا على جوجل",
  },
  footer: {
    description: "عيادة أسنان في المعادي، القاهرة، نقدم خيارات رعاية متنوعة للأسرة مع التركيز على راحة المريض وجودة الخدمة.",
  },
  rights: "جميع الحقوق محفوظة.",
  privacy: "سياسة الخصوصية",
};

const en: typeof ar = {
  dir: "ltr",
  nav: {
    home: "Home",
    services: "Services",
    team: "Our Team",
    about: "About",
    contact: "Contact",
  },
  bookCta: "Book Appointment",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  mainNav: "Main navigation",
  mobileMenu: "Mobile menu",
  quickLinks: "Quick Links",
  followUs: "Follow Us",
  facebook: "Facebook",
  hours: "Working Hours",
  contactUs: "Contact Us",
  location: {
    eyebrow: "Location",
    title: "Visit Us in Maadi",
    address: "Address",
    workHours: "Working Hours",
    openInMaps: "Open in Google Maps",
    mapTitle: "Your Dent Clinic on the map",
    rateOnGoogle: "Rate us on Google",
    rateText: "Your experience matters — rate the clinic on Google and help patients find us easily.",
    rateButton: "Rate us on Google",
  },
  footer: {
    description: "A dental clinic in Maadi, Cairo, offering a wide range of family dental care with a focus on patient comfort and quality service.",
  },
  rights: "All rights reserved.",
  privacy: "Privacy Policy",
};

export const ui = { ar, en };
