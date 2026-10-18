import { NextResponse } from "next/server";
import {
  computeIsOpen,
  getSettings,
  formatHours,
  DEFAULT_CLOSED_MESSAGE,
  DEFAULT_CLOSED_MESSAGE_EN,
} from "@/lib/store";

export async function GET() {
  const settings = await getSettings();
  const isOpen = settings.autoStatus
    ? computeIsOpen(settings)
    : settings.isOpen;
  return NextResponse.json({
    isOpen,
    autoStatus: settings.autoStatus,
    hoursText: {
      ar: formatHours(settings.schedule, "ar"),
      en: formatHours(settings.schedule, "en"),
    },
    closedMessage: settings.closedMessage || DEFAULT_CLOSED_MESSAGE,
    closedMessageEn: settings.closedMessageEn || DEFAULT_CLOSED_MESSAGE_EN,
  });
}
