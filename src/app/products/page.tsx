import { getProducts } from "@/lib/github-db";
import ProductList from "./ProductList";

export const dynamic = "force-static";

const CATEGORIES: Record<string, string> = {
  "screws-fasteners": "Screws & Fasteners",
  tools: "Hand Tools",
  "building-hardware": "Building Hardware",
  "door-window": "Door & Window Parts",
  "power-tools": "Power Tools",
  accessories: "Accessories & Consumables",
};

export default async function ProductsPage() {
  const products = await getProducts();
  const published = products.filter((p: any) => p.published);

  return <ProductList products={published} categories={CATEGORIES} currentCategory="" currentSort="" />;
}
