import { prisma } from "@/lib/db";
import ProductList from "./ProductList";

export const dynamic = "force-dynamic";

const CATEGORIES: Record<string, string> = {
  "screws-fasteners": "Screws & Fasteners",
  tools: "Hand Tools",
  "building-hardware": "Building Hardware",
  "door-window": "Door & Window Parts",
  "power-tools": "Power Tools",
  accessories: "Accessories & Consumables",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; q?: string };
}) {
  const { category, sort, q } = searchParams;

  const where: Record<string, unknown> = { published: true };
  if (category && CATEGORIES[category]) where.category = category;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { description: { contains: q } },
      { sku: { contains: q } },
    ];
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };

  const products = await prisma.product.findMany({ where, orderBy });

  return <ProductList products={products} categories={CATEGORIES} currentCategory={category} currentSort={sort} />;
}
