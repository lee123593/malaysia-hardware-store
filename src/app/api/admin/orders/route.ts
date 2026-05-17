import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { getOrders, updateOrder } from "@/lib/github-db";

async function checkAuth(request: NextRequest) {
  const auth = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!auth) return false;
  const payload = await verifyAdminToken(auth);
  return !!payload;
}

export async function GET(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 50;

  let orders = await getOrders();

  if (status) {
    orders = orders.filter((o: any) => o.status === status);
  }

  // Sort by createdAt desc
  orders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const total = orders.length;
  const start = (page - 1) * limit;
  const paged = orders.slice(start, start + limit);

  return NextResponse.json({ orders: paged, total, page, totalPages: Math.ceil(total / limit) });
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, paymentRef } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    const data: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (status) data.status = status;
    if (paymentRef !== undefined) data.paymentRef = paymentRef;
    if (status === "paid") data.paidAt = new Date().toISOString();

    const order = await updateOrder(id, data);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
