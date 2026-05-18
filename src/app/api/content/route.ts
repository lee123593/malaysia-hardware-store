import { NextResponse } from "next/server";
import { getSettings } from "@/lib/github-db";

export async function GET() {
  try {
    const allSettings = await getSettings({ fresh: true });

    const content: Record<string, string> = {};
    for (const [key, value] of Object.entries(allSettings)) {
      if (key.startsWith("content_") && value) {
        content[key] = value;
      }
    }

    return NextResponse.json(content, {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
