import { getProducts } from "@/lib/github-db";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((p: any) => p.featured && p.published).slice(0, 8);
  return <HomeClient products={featured} />;
}
