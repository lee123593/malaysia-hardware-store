"use client";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ToastProvider";

interface Props {
  product: {
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
  };
}

export default function ProductCard({ product }: Props) {
  const { lang, t } = useI18n();
  const { show } = useToast();
  const addItem = useCartStore((s) => s.addItem);
  const images = JSON.parse(product.images || "[]");

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      nameZh: product.nameZh,
      price: product.price,
      quantity: 1,
      image: images[0] || "",
      slug: product.slug,
      weight: product.weight,
    });
    show(t.cart.addedToCart);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-apple overflow-hidden shadow-apple hover:shadow-apple-hover transition-all duration-300"
    >
      <div className="aspect-square bg-apple-gray flex items-center justify-center overflow-hidden">
        {images[0] ? (
          <img
            src={images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="text-apple-mid text-4xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-apple-dark line-clamp-2 mb-1">
          {lang === "zh" && product.nameZh ? product.nameZh : product.name}
        </h3>
        <p className="text-xs text-apple-text mb-2">{product.sku}</p>
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-apple-dark">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className="text-xs font-medium text-apple-blue hover:text-apple-dark transition-colors px-3 py-1.5 rounded-full bg-apple-blue/5 hover:bg-apple-blue/10"
          >
            {t.products.addToCart}
          </button>
        </div>
      </div>
    </Link>
  );
}
