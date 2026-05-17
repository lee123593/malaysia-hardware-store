import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Payment callback webhook for Malaysian payment gateways
// Supports: Billplz, Touch 'n Go, Boost, PayPal Malaysia
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Expected payload format:
    // { orderNo: string, transactionId: string, status: "success" | "failed", amount: number, gateway: string }

    const { orderNo, transactionId, status, gateway } = body;

    if (!orderNo) {
      return NextResponse.json({ error: "Order number required" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { orderNo } });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status === "success") {
      await prisma.order.update({
        where: { orderNo },
        data: {
          status: "paid",
          paymentRef: `${gateway || "gateway"}:${transactionId || Date.now()}`,
          paidAt: new Date(),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment callback error:", error);
    return NextResponse.json({ error: "Callback processing failed" }, { status: 500 });
  }
}
