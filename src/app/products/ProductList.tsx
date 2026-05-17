"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";
import ProductCard from "@/components/ProductCard";

interface Props {
  products: Array<{
    id: string;
    name: string;
    nameZh?: string | null;
    slug: string;
    price: number;
    images: string;
    category: string;
    sku: string;
    weight: number;
    origin: string;
    description: string;
  }>;
  categories: Record<string, string>;
  currentCategory?: string;
  currentSort?: string;
}

export default function ProductList({ products, categories, currentCategory, currentSort }: Props) {
  const { t } = useI18n();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleCategory = (cat: string) => {
    const params = new URLSearchParams();
    if (cat) params.set("category", cat);
    if (currentSort) params.set("sort", currentSort);
    router.push(`/products?${params.toString()}`);
  };

  const handleSort = (sort: string) => {
    const params = new URLSearchParams();
    if (currentCategory) params.set("category", currentCategory);
    if (sort) params.set("sort", sort);
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    router.push(`/products?${params.toString()}`);
  };

  // Use translated category names
  const translatedCategories: Record<string, string> = {};
  for (const [key] of Object.entries(categories)) {
    translatedCategories[key] = t.products.categories[key as keyof typeof t.products.categories] || categories[key];
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-apple-dark mb-6">
        {t.products.title}
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1">
          <input
            type="search"
            placeholder={t.common.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:max-w-xs px-4 py-2.5 rounded-full border border-apple-border bg-apple-light text-sm focus:outline-none focus:border-apple-mid transition-colors"
          />
        </form>

        <div className="flex gap-2 flex-wrap">
          <select
            value={currentCategory || ""}
            onChange={(e) => handleCategory(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-apple-border bg-apple-light text-sm focus:outline-none"
          >
            <option value="">{t.products.allCategories}</option>
            {Object.entries(translatedCategories).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={currentSort || ""}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2.5 rounded-full border border-apple-border bg-apple-light text-sm focus:outline-none"
          >
            <option value="">{t.products.sortBy}</option>
            <option value="price-asc">{t.products.priceLow}</option>
            <option value="price-desc">{t.products.priceHigh}</option>
            <option value="newest">{t.products.newest}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-apple-text">
          <p className="text-lg">{t.products.noProducts}</p>
        </div>
      )}
    </div>
  );
}
