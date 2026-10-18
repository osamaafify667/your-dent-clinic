import { NextResponse } from "next/server";
import { getDb } from "@/lib/store";

export async function GET() {
  const db = await getDb();
  return NextResponse.json({
    services: db.services,
    doctors: db.doctors,
    settings: db.settings,
  });
}
