import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateOrderNo, determineRegion, calculateShipping, calculateTax } from "@/lib/utils";
import { getShippingCost, getSstRate, getFreeShippingMin } from "@/lib/settings";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const no = searchParams.get("no");

  if (!no) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { orderNo: no },
    include: { items: true },
  });

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
    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);

    const shippingWest = await getShippingCost("west");
    const shippingEast = await getShippingCost("east");
    const freeMin = await getFreeShippingMin();
    const sstRate = await getSstRate();

    const shippingCost = calculateShipping(region, subtotal, shippingWest, shippingEast, freeMin);
    const tax = calculateTax(subtotal, sstRate);
    const total = Math.round((subtotal + shippingCost + tax) * 100) / 100;

    const order = await prisma.order.create({
      data: {
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
        paymentMethod: paymentMethod || "bank_transfer",
        items: {
          create: items.map((item: { productId: string; name: string; price: number; quantity: number; image?: string }) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
