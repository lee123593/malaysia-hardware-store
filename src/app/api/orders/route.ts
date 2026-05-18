import { NextRequest, NextResponse } from "next/server";
import { getOrderByNo, createOrder, getSettings } from "@/lib/github-db";
import { determineRegion, generateOrderNo, calculateShipping, calculateTax } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const no = searchParams.get("no");

  if (!no) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  const order = await getOrderByNo(no);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, address, city, state, postcode, paymentMethod, items } = body;

    if (!customerName || !customerPhone || !address || !city || !state || !items?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const region = determineRegion(state);
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );

    const settings = await getSettings();
    const shippingWest = parseFloat(settings.shipping_west || "8");
    const shippingEast = parseFloat(settings.shipping_east || "18");
    const freeMin = parseFloat(settings.free_shipping_min || "200");
    const sstRate = settings.sst_enabled === "true" ? parseFloat(settings.sst_rate || "0.10") : 0;

    const shippingCost = calculateShipping(region, subtotal, shippingWest, shippingEast, freeMin);
    const tax = calculateTax(subtotal, sstRate);
    const total = Math.round((subtotal + shippingCost + tax) * 100) / 100;

    const orderId = `ord-${Date.now()}`;
    const ts = Date.now();
    const order = {
      id: orderId,
      orderNo: generateOrderNo(),
      customerName,
      customerEmail: customerEmail || null,
      customerPhone,
      address,
      city,
      state,
      postcode: postcode || "",
      region,
      subtotal,
      shippingCost,
      tax,
      total,
      status: "pending",
      paymentMethod: paymentMethod || "bank_transfer",
      paymentRef: null,
      paidAt: null,
      notes: null,
      items: items.map((item: any, idx: number) => ({
        id: `oi-${ts}-${idx}`,
        orderId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || null,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createOrder(order);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
