import { NextResponse } from "next/server";
import { getImage } from "@/lib/store";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;
  const image = await getImage(id);
  if (!image) {
    return NextResponse.json({ error: "الصورة غير موجودة" }, { status: 404 });
  }
  return new NextResponse(new Uint8Array(image.buffer), {
    status: 200,
    headers: {
      "Content-Type": image.type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
