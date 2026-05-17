import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password, key } = await request.json();

    // Admin key verification
    if (key && key === process.env.ADMIN_KEY) {
      const token = await createAdminToken(username || "admin");
      return NextResponse.json({ token });
    }

    // Username/password verification
    if (username === process.env.ADMIN_USERNAME || "admin" && password === process.env.ADMIN_PASSWORD || "admin123") {
      const token = await createAdminToken(username);
      return NextResponse.json({ token });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
