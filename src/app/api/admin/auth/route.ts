import { NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "admin123";

    // Also support ADMIN_KEY from env as a master key
    const adminKey = process.env.ADMIN_KEY || "admin-secret-key-change-me";
    if (username === "__admin_key__" && password === adminKey) {
      const token = await createAdminToken("admin");
      return NextResponse.json({ token });
    }
    if (username === adminUser && password === adminPass) {
      const token = await createAdminToken(username);
      return NextResponse.json({ token });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
