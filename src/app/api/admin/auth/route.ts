import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createAdminToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password, key } = await request.json();

    // Admin key verification for first-time setup
    if (key && key === process.env.ADMIN_KEY) {
      const token = await createAdminToken(username || "admin");
      return NextResponse.json({ token });
    }

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({ where: { username } });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createAdminToken(username);
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
