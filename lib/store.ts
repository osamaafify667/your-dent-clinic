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
  hours: { days: string; hours: string; closed?: boolean }[];
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
    hours: [{ days: "من السبت الي الخميس", hours: "من 4:00 مساءً الي 11:00 مساءً" }],
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
  return (await loadDb()).settings.isOpen;
}

export async function mergeServices(): Promise<ServiceRecord[]> {
  const db = await loadDb();
  return db.services;
}

export async function mergeDoctors(): Promise<DoctorRecord[]> {
  const db = await loadDb();
  return db.doctors;
}
