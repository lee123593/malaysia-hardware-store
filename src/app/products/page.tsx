import { getProducts } from "@/lib/github-db";
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
  const products = await getProducts();
  let filtered = products.filter((p: any) => p.published);

  // Filter by category
  if (searchParams.category && CATEGORIES[searchParams.category]) {
    filtered = filtered.filter((p: any) => p.category === searchParams.category);
  }

  // Filter by search query
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase();
    filtered = filtered.filter(
      (p: any) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameZh && p.nameZh.toLowerCase().includes(q)) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  // Sort
  if (searchParams.sort === "price-asc") {
    filtered.sort((a: any, b: any) => a.price - b.price);
  } else if (searchParams.sort === "price-desc") {
    filtered.sort((a: any, b: any) => b.price - a.price);
  } else if (searchParams.sort === "newest") {
    filtered.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <ProductList
      products={filtered}
      categories={CATEGORIES}
      currentCategory={searchParams.category || ""}
      currentSort={searchParams.sort || ""}
    />
  );
}
