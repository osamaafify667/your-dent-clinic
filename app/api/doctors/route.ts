import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb, type DoctorRecord } from "@/lib/store";

export async function GET() {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(getDb().doctors);
}

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const doctor = (await request.json()) as DoctorRecord;
    const db = getDb();
    const record: DoctorRecord = {
      id: doctor.id || crypto.randomUUID(),
      name: doctor.name,
      specialty: doctor.specialty,
      qualifications: doctor.qualifications || [],
      bio: doctor.bio || "",
    };
    db.doctors = [...db.doctors.filter((d) => d.id !== record.id), record];
    saveDb(db);
    return NextResponse.json(record, { status: 201 });
  } catch {
    return NextResponse.json({ error: "خطأ في حفظ الطبيب" }, { status: 400 });
  }
}
