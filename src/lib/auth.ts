import { SignJWT, jwtVerify } from "jose";

const SECRET = process.env.JWT_SECRET || "fallback-secret-change-in-production";
if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[auth] JWT_SECRET environment variable is not set. Using insecure default.");
}

const JWT_SECRET = new TextEncoder().encode(SECRET);

export async function createAdminToken(username: string) {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { username: string; role: string };
  } catch {
    return null;
  }
}
