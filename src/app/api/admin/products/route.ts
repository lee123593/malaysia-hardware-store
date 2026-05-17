import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAdminToken } from "@/lib/auth";

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

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        nameZh: body.nameZh || null,
        slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: body.description || "",
        descriptionZh: body.descriptionZh || null,
        price: parseFloat(body.price),
        costPrice: body.costPrice ? parseFloat(body.costPrice) : null,
        category: body.category || "tools",
        categoryZh: body.categoryZh || null,
        images: body.images || "[]",
        stock: body.stock ? parseInt(body.stock) : 999,
        featured: body.featured === true,
        published: body.published !== false,
        weight: body.weight ? parseFloat(body.weight) : 0.5,
        sku: body.sku || `SKU-${Date.now()}`,
      },
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const update: Record<string, unknown> = {};
    if (data.name !== undefined) update.name = data.name;
    if (data.nameZh !== undefined) update.nameZh = data.nameZh;
    if (data.description !== undefined) update.description = data.description;
    if (data.descriptionZh !== undefined) update.descriptionZh = data.descriptionZh;
    if (data.price !== undefined) update.price = parseFloat(data.price);
    if (data.costPrice !== undefined) update.costPrice = parseFloat(data.costPrice);
    if (data.category !== undefined) update.category = data.category;
    if (data.categoryZh !== undefined) update.categoryZh = data.categoryZh;
    if (data.images !== undefined) update.images = data.images;
    if (data.stock !== undefined) update.stock = parseInt(data.stock);
    if (data.featured !== undefined) update.featured = data.featured;
    if (data.published !== undefined) update.published = data.published;
    if (data.weight !== undefined) update.weight = parseFloat(data.weight);
    if (data.sku !== undefined) update.sku = data.sku;

    const product = await prisma.product.update({
      where: { id },
      data: update,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product ID required" }, { status: 400 });
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
