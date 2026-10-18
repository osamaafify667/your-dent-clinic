import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "yd_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

function getSecret(): string {
  return process.env.ADMIN_SECRET || "dev-secret-change-me";
}

export function hashPassword(password: string): string {
  return crypto.createHmac("sha256", getSecret()).update(password).digest("hex");
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  const a = hashPassword(password);
  const b = hashPassword(expected);
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export function createSessionToken(): string {
  const payload = { exp: Date.now() + SESSION_TTL_MS };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { exp: number };
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
