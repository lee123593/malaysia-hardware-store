import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/github-db";

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

  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const product = {
      id: `p${Date.now()}`,
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
      origin: "China",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createProduct(product);
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

    const updates: Record<string, unknown> = { updatedAt: new Date().toISOString() };
    if (data.name !== undefined) updates.name = data.name;
    if (data.nameZh !== undefined) updates.nameZh = data.nameZh;
    if (data.description !== undefined) updates.description = data.description;
    if (data.descriptionZh !== undefined) updates.descriptionZh = data.descriptionZh;
    if (data.price !== undefined) updates.price = parseFloat(data.price);
    if (data.costPrice !== undefined) updates.costPrice = parseFloat(data.costPrice);
    if (data.category !== undefined) updates.category = data.category;
    if (data.categoryZh !== undefined) updates.categoryZh = data.categoryZh;
    if (data.images !== undefined) updates.images = data.images;
    if (data.stock !== undefined) updates.stock = parseInt(data.stock);
    if (data.featured !== undefined) updates.featured = data.featured;
    if (data.published !== undefined) updates.published = data.published;
    if (data.weight !== undefined) updates.weight = parseFloat(data.weight);
    if (data.sku !== undefined) updates.sku = data.sku;

    const product = await updateProduct(id, updates);
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

  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
