import { prisma } from "@/lib/db";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

async function getProducts() {
  return prisma.product.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export default async function HomePage() {
  const products = await getProducts();
  return <HomeClient products={JSON.parse(JSON.stringify(products))} />;
}
