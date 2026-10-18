export type DayHours = {
  days: string;
  hours: string;
  closed?: boolean;
};

export type ClinicInfo = {
  name: string;
  tagline: string;
  area: string;
  address: string;
  mobile: string;
  mobileIntl: string;
  landline: string;
  email: string;
  whatsapp: string;
  facebook: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  hours: DayHours[];
  hoursNote: string;
  hoursVerified: boolean;
  keywordsAr: string[];
  keywordsEn: string[];
};

export const clinic: ClinicInfo = {
  name: "Your Dent Clinic",
  tagline: "عيادة أسنان في المعادي، القاهرة",
  area: "Maadi, Cairo, Egypt",
  address: "Othman Towers, Nile Corniche, Maadi, Cairo, fifth floor",
  mobile: "01008889978",
  mobileIntl: "+201008889978",
  landline: "0225260577",
  email: "yourdent.clinic@gmail.com",
  whatsapp: "201008889978",
  facebook: "https://www.facebook.com/yourdentclinic",
  mapsUrl: "https://maps.app.goo.gl/cmeXFhPvduVHacx48",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=Othman%20Towers%2C%20Nile%20Corniche%2C%20Maadi%2C%20Cairo&output=embed",
  hours: [
    { days: "السبت – الخميس", hours: "4:00 مساءً – 11:00 مساءً" },
    { days: "الجمعة", hours: "مغلق", closed: true },
  ],
  hoursNote: "ساعات العمل قيد التأكيد من إدارة العيادة.",
  hoursVerified: false,
  keywordsAr: [
    "عيادة أسنان المعادي",
    "طبيب أسنان القاهرة",
    "دكتور أسنان المعادي",
    "تجميل أسنان القاهرة",
    "زراعة أسنان المعادي",
    "تبييض أسنان القاهرة",
    "تنظيف أسنان",
    "حشو أسنان",
    "علاج عصب الأسنان",
    "طب أسنان الأطفال القاهرة",
    "عيادة أسنان كورنيش النيل",
    "حجز عيادة أسنان القاهرة",
  ],
  keywordsEn: [
    "dental clinic Maadi",
    "dentist Cairo Egypt",
    "dentist Maadi Cairo",
    "teeth whitening Cairo",
    "dental implants Maadi",
    "cosmetic dentistry Cairo",
    "root canal treatment Cairo",
    "pediatric dentist Cairo",
    "teeth cleaning Maadi",
    "Nile Corniche dental clinic",
  ],
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdentclinic.com";

export const whatsappLink = (message: string) =>
  `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
