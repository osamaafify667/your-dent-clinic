import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/store";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json((await getDb()).settings);
}

export async function PUT(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const settings = await request.json();
    const db = await getDb();
    db.settings = settings;
    await saveDb(db);
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "خطأ في الحفظ" }, { status: 400 });
  }
}
