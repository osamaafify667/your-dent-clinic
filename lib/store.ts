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

export type Settings = {
  isOpen: boolean;
  autoStatus: boolean;
  hours: { days: string; hours: string; closed?: boolean }[];
  schedule: { days: number[]; open?: string; close?: string; closed?: boolean }[];
};

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
    hours: [{ days: "من السبت الي الخميس", hours: "من 4:00 مساءً الي 11:00 مساءً" }],
    schedule: [
      { days: [6, 0, 1, 2, 3, 4], open: "16:00", close: "23:00" },
      { days: [5], closed: true },
    ],
  },
};

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

let cache: Db | null = null;

async function loadDb(): Promise<Db> {
  if (cache) return cache;

  const redis = getRedis();
  if (redis) {
    try {
      const data = (await redis.get(REDIS_KEY)) as Db | null;
      if (data) {
        cache = data;
        return cache;
      }
    } catch {
      // fall through to file system
    }
  }

  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    cache = JSON.parse(raw) as Db;
  } catch {
    cache = defaultDb;
  }
  return cache!;
}

export async function getDb(): Promise<Db> {
  return loadDb();
}

export async function saveDb(db: Db): Promise<void> {
  cache = db;

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
    Su: 0, Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6,
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
