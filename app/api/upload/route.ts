import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { getDb, saveDb } from "@/lib/store";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function POST(request: Request) {
  if (!(await isAdminLoggedIn())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const doctorId = formData.get("doctorId") as string | null;

    if (!file || !doctorId) {
      return NextResponse.json({ error: "ملف أو معرّف الطبيب مفقود" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مسموح" }, { status: 400 });
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "حجم الملف كبير جداً (الحد الأقصى 2MB)" }, { status: 400 });
    }

    const ext = file.type === "image/png" ? ".png" : file.type === "image/webp" ? ".webp" : ".jpg";
    const filename = `${crypto.randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    const db = await getDb();
    const doctor = db.doctors.find((d) => d.id === doctorId);
    if (!doctor) {
      return NextResponse.json({ error: "الطبيب غير موجود" }, { status: 404 });
    }

    doctor.image = `/uploads/${filename}`;
    await saveDb(db);

    return NextResponse.json({ url: doctor.image }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 });
  }
}
