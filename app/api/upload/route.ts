import { NextResponse } from "next/server";
import { isAdminLoggedIn } from "@/lib/auth";
import { isImageStoreEnabled, saveImage } from "@/lib/store";
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

    if (!file) {
      return NextResponse.json({ error: "الملف مفقود" }, { status: 400 });
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
    const id = crypto.randomUUID();
    const buffer = Buffer.from(await file.arrayBuffer());

    if (isImageStoreEnabled()) {
      const stored = await saveImage(id, buffer, file.type);
      if (!stored) {
        return NextResponse.json({ error: "فشل حفظ الصورة" }, { status: 500 });
      }
      return NextResponse.json({ url: `/api/images/${id}` }, { status: 201 });
    }

    const filename = `${id}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    fs.mkdirSync(uploadDir, { recursive: true });
    fs.writeFileSync(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل رفع الصورة" }, { status: 500 });
  }
}
