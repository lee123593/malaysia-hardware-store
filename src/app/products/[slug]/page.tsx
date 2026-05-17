import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductDetail from "./ProductDetail";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return { title: "Not Found" };
  return {
    title: `${product.name} — MY Hardware Pro`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id }, published: true },
    take: 4,
  });

  return <ProductDetail product={product} related={related} />;
}
