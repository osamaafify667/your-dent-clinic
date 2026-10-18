import fs from "fs";
import path from "path";
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

const defaultDb: Db = {
  services: defaultServices.map((s, i) => ({
    id: `svc-${i + 1}`,
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
  doctors: defaultDoctors.map((d, i) => ({
    id: `doc-${i + 1}`,
    name: d.name,
    specialty: d.specialty,
    qualifications: d.qualifications,
    bio: d.bio,
  })),
  settings: {
    isOpen: true,
    hours: [
      { days: "السبت – الخميس", hours: "4:00 مساءً – 11:00 مساءً" },
      { days: "الجمعة", hours: "مغلق", closed: true },
    ],
  },
};

let cache: Db | null = null;

export function getDb(): Db {
  if (cache) return cache;
  try {
    const raw = fs.readFileSync(dbPath, "utf-8");
    cache = JSON.parse(raw) as Db;
  } catch {
    cache = defaultDb;
  }
  return cache;
}

export function saveDb(db: Db): void {
  cache = db;
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
}

export function getSettings(): Settings {
  return getDb().settings;
}

export function getIsOpen(): boolean {
  return getDb().settings.isOpen;
}

export function mergeServices(): ServiceRecord[] {
  const db = getDb();
  if (db.services.length > 0) return db.services;
  return defaultDb.services;
}

export function mergeDoctors(): DoctorRecord[] {
  const db = getDb();
  if (db.doctors.length > 0) return db.doctors;
  return defaultDb.doctors;
}
