import { getProducts, getProductBySlug } from "@/lib/github-db";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — MY Hardware Pro`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts
    .filter((p: any) => p.category === product.category && p.id !== product.id && p.published)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
