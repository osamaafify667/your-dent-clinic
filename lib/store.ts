import fs from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import { services as defaultServices, doctors as defaultDoctors } from "@/data/content";

export type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  overview: string[];
  overviewEn: string[];
  whatToExpect: string[];
  whatToExpectEn: string[];
  icon: "smile" | "sparkles" | "bone" | "wrench" | "activity" | "droplets" | "baby";
  image?: string;
};

export type DoctorRecord = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string[];
  bio: string;
  image?: string;
};

export type HoursSlot = {
  days: number[];
  open?: string;
  close?: string;
  closed?: boolean;
};

export type Settings = {
  isOpen: boolean;
  autoStatus: boolean;
  closedMessage: string;
  closedMessageEn: string;
  schedule: HoursSlot[];
};

export const DEFAULT_CLOSED_MESSAGE =
  "نورنا بكرة لأننا قفلنا — يمكنك حجز موعد عبر واتساب وسيتم التواصل معك غداً.";
export const DEFAULT_CLOSED_MESSAGE_EN =
  "See you tomorrow — we are closed. You can book an appointment via WhatsApp and we will contact you tomorrow.";

const DAY_NAMES: Record<"ar" | "en", string[]> = {
  ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const DISPLAY_ORDER = [6, 0, 1, 2, 3, 4, 5];

function formatTime(value: string, lang: "ar" | "en"): string {
  const [h, m] = value.split(":").map(Number);
  const period = h < 12 ? (lang === "ar" ? "صباحاً" : "AM") : lang === "ar" ? "مساءً" : "PM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDays(days: number[], lang: "ar" | "en"): string {
  const names = DAY_NAMES[lang];
  const set = new Set(days);
  const ordered = DISPLAY_ORDER.filter((d) => set.has(d));
  const runs: number[][] = [];
  for (const day of ordered) {
    const last = runs[runs.length - 1];
    if (last && DISPLAY_ORDER.indexOf(day) === DISPLAY_ORDER.indexOf(last[last.length - 1]) + 1) {
      last.push(day);
    } else {
      runs.push([day]);
    }
  }
  return runs
    .map((run) => {
      if (run.length === 1) return names[run[0]];
      if (run.length === 2) {
        return lang === "ar"
          ? `${names[run[0]]} و${names[run[1]]}`
          : `${names[run[0]]} & ${names[run[1]]}`;
      }
      return lang === "ar"
        ? `من ${names[run[0]]} إلى ${names[run[run.length - 1]]}`
        : `${names[run[0]]} – ${names[run[run.length - 1]]}`;
    })
    .join(lang === "ar" ? "، " : ", ");
}

export function formatHours(schedule: HoursSlot[], lang: "ar" | "en"): string[] {
  return schedule.map((slot) => {
    const days = formatDays(slot.days ?? [], lang);
    if (slot.closed || !slot.open || !slot.close) {
      return lang === "ar" ? `${days}: مغلق` : `${days}: Closed`;
    }
    return lang === "ar"
      ? `${days}: من ${formatTime(slot.open, lang)} إلى ${formatTime(slot.close, lang)}`
      : `${days}: ${formatTime(slot.open, lang)} – ${formatTime(slot.close, lang)}`;
  });
}

export type Db = {
  services: ServiceRecord[];
  doctors: DoctorRecord[];
  settings: Settings;
};

const dbPath = path.join(process.cwd(), "data", "db.json");
const REDIS_KEY = "yourdent:db";

const defaultDb: Db = {
  services: defaultServices.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    titleEn: s.titleEn,
    shortDescription: s.shortDescription,
    shortDescriptionEn: s.shortDescriptionEn,
    overview: s.overview,
    overviewEn: s.overviewEn,
    whatToExpect: s.whatToExpect,
    whatToExpectEn: s.whatToExpectEn,
    icon: s.icon,
  })),
  doctors: defaultDoctors,
  settings: {
    isOpen: true,
    autoStatus: true,
    closedMessage: DEFAULT_CLOSED_MESSAGE,
    closedMessageEn: DEFAULT_CLOSED_MESSAGE_EN,
    schedule: [
      { days: [6, 0, 1, 2, 3, 4], open: "16:00", close: "23:00" },
      { days: [5], closed: true },
    ],
  },
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

const IMAGE_KEY_PREFIX = "yourdent:img:";

export function isImageStoreEnabled(): boolean {
  return getRedis() !== null;
}

export async function saveImage(
  id: string,
  buffer: Buffer,
  contentType: string,
): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  await redis.set(`${IMAGE_KEY_PREFIX}${id}`, {
    type: contentType,
    data: buffer.toString("base64"),
  });
  return true;
}

export async function getImage(
  id: string,
): Promise<{ type: string; buffer: Buffer } | null> {
  const redis = getRedis();
  if (!redis) return null;
  const raw = await redis.get<{ type?: string; data?: string } | string>(
    `${IMAGE_KEY_PREFIX}${id}`,
  );
  if (!raw) return null;
  const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
  if (!obj || typeof obj.data !== "string") return null;
  return {
    type: obj.type || "application/octet-stream",
    buffer: Buffer.from(obj.data, "base64"),
  };
}

function normalizeDb(db: Partial<Db> | null): Db {
  const settings = (db?.settings ?? {}) as Partial<Settings>;
  const defaultBySlug = new Map(defaultDb.services.map((s) => [s.slug, s]));
  const services = (db?.services ?? defaultDb.services).map((s) => {
    const fallback = defaultBySlug.get(s.slug);
    return {
      ...s,
      overview: s.overview?.length ? s.overview : fallback?.overview ?? [],
      overviewEn: s.overviewEn?.length ? s.overviewEn : fallback?.overviewEn ?? [],
      whatToExpect: s.whatToExpect?.length ? s.whatToExpect : fallback?.whatToExpect ?? [],
      whatToExpectEn: s.whatToExpectEn?.length ? s.whatToExpectEn : fallback?.whatToExpectEn ?? [],
    };
  });
  return {
    services,
    doctors: db?.doctors ?? defaultDb.doctors,
    settings: {
      isOpen: settings.isOpen ?? defaultDb.settings.isOpen,
      autoStatus: settings.autoStatus ?? defaultDb.settings.autoStatus,
      closedMessage: settings.closedMessage || DEFAULT_CLOSED_MESSAGE,
      closedMessageEn: settings.closedMessageEn || DEFAULT_CLOSED_MESSAGE_EN,
      schedule:
        Array.isArray(settings.schedule) && settings.schedule.length
          ? settings.schedule
          : defaultDb.settings.schedule,
    },
  };
}

async function loadDb(): Promise<Db> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = (await redis.get(REDIS_KEY)) as Db | null;
      if (data) {
        return normalizeDb(data);
      }
    } catch {
      // fall through to file system
    }
  }

  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    return normalizeDb(JSON.parse(raw) as Db);
  } catch {
    return defaultDb;
  }
}

export async function getDb(): Promise<Db> {
  return loadDb();
}

export async function saveDb(db: Db): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_KEY, JSON.stringify(db));
      return;
    } catch {
      // fall through to file system
    }
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

export async function getSettings(): Promise<Settings> {
  return (await loadDb()).settings;
}

export async function getIsOpen(): Promise<boolean> {
  const settings = (await loadDb()).settings;
  if (!settings.autoStatus) return settings.isOpen;
  return computeIsOpen(settings);
}

export function computeIsOpen(settings: Settings): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Cairo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekdayMap: Record<string, number> = {
    Su: 0, Sun: 0, Mo: 1, Mon: 1, Tu: 2, Tue: 2,
    We: 3, Wed: 3, Th: 4, Thu: 4, Fr: 5, Fri: 5, Sa: 6, Sat: 6,
  };

  let day = -1;
  let hour = 0;
  let minute = 0;
  for (const part of parts) {
    if (part.type === "weekday") day = weekdayMap[part.value] ?? -1;
    if (part.type === "hour") hour = parseInt(part.value, 10) % 24;
    if (part.type === "minute") minute = parseInt(part.value, 10);
  }

  for (const slot of settings.schedule) {
    if (!slot.days.includes(day)) continue;
    if (slot.closed || !slot.open || !slot.close) return false;
    const [openH, openM] = slot.open.split(":").map(Number);
    const [closeH, closeM] = slot.close.split(":").map(Number);
    const now = hour * 60 + minute;
    return now >= openH * 60 + openM && now < closeH * 60 + closeM;
  }

  return false;
}

export async function mergeServices(): Promise<ServiceRecord[]> {
  const db = await loadDb();
  return db.services;
}

export async function mergeDoctors(): Promise<DoctorRecord[]> {
  const db = await loadDb();
  return db.doctors;
}
