import { NextResponse } from "next/server";
import { getDb, computeIsOpen, getSettings } from "@/lib/store";

export async function GET() {
  const settings = await getSettings();
  const isOpen = settings.autoStatus
    ? computeIsOpen(settings)
    : settings.isOpen;
  return NextResponse.json({
    isOpen,
    autoStatus: settings.autoStatus,
    hours: settings.hours,
  });
}
