import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/store";

type Params = Promise<{ id: string }>;

async function findService(id: string) {
  const db = getDb();
  const index = db.services.findIndex((s) => s.id === id);
  return { db, index };
}

export async function PUT(request: Request, { params }: { params: Params }) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const service = await request.json();
    const { db, index } = await findService(id);
    if (index === -1) {
      return NextResponse.json({ error: "الخدمة غير موجودة" }, { status: 404 });
    }
    db.services[index] = { ...db.services[index], ...service, id };
    saveDb(db);
    return NextResponse.json(db.services[index]);
  } catch {
    return NextResponse.json({ error: "خطأ في التحديث" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { db, index } = await findService(id);
  if (index === -1) {
    return NextResponse.json({ error: "الخدمة غير موجودة" }, { status: 404 });
  }
  db.services.splice(index, 1);
  saveDb(db);
  return NextResponse.json({ ok: true });
}
