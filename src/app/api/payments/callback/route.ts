import { NextRequest, NextResponse } from "next/server";
import { getOrderByNo, updateOrder } from "@/lib/github-db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderNo, transactionId, status, gateway } = body;

    if (!orderNo) {
      return NextResponse.json({ error: "Order number required" }, { status: 400 });
    }

    const order = await getOrderByNo(orderNo);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status === "success") {
      await updateOrder(order.id, {
        status: "paid",
        paymentRef: `${gateway || "gateway"}:${transactionId || Date.now()}`,
        paidAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 });
  }
}
