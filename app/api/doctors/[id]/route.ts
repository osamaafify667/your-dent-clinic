import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/store";

type Params = Promise<{ id: string }>;

async function findDoctor(id: string) {
  const db = await getDb();
  const index = db.doctors.findIndex((d) => d.id === id);
  return { db, index };
}

export async function PUT(request: Request, { params }: { params: Params }) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const doctor = await request.json();
    const { db, index } = await findDoctor(id);
    if (index === -1) {
      return NextResponse.json({ error: "الطبيب غير موجود" }, { status: 404 });
    }
    db.doctors[index] = { ...db.doctors[index], ...doctor, id };
    await saveDb(db);
    return NextResponse.json(db.doctors[index]);
  } catch {
    return NextResponse.json({ error: "خطأ في التحديث" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Params }) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { db, index } = await findDoctor(id);
  if (index === -1) {
    return NextResponse.json({ error: "الطبيب غير موجود" }, { status: 404 });
  }
  db.doctors.splice(index, 1);
  await saveDb(db);
  return NextResponse.json({ ok: true });
}
