import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb, type ServiceRecord } from "@/lib/store";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json((await getDb()).services);
}

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const service = (await request.json()) as ServiceRecord;
    const db = await getDb();
    const record: ServiceRecord = {
      id: service.id || crypto.randomUUID(),
      slug: service.slug,
      title: service.title,
      titleEn: service.titleEn,
      shortDescription: service.shortDescription,
      shortDescriptionEn: service.shortDescriptionEn,
      overview: service.overview || [],
      overviewEn: service.overviewEn || [],
      whatToExpect: service.whatToExpect || [],
      whatToExpectEn: service.whatToExpectEn || [],
      icon: service.icon,
      image: service.image,
    };
    db.services = [...db.services.filter((s) => s.id !== record.id), record];
    db.services.sort((a, b) => a.title.localeCompare(b.title, "ar"));
    await saveDb(db);
    return NextResponse.json(record, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطأ في حفظ الخدمة" }, { status: 400 });
  }
}
