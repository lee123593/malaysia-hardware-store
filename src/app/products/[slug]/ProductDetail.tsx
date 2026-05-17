"use client";
import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { useCartStore } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/components/ToastProvider";

interface Props {
  product: {
    id: string;
    name: string;
    nameZh?: string | null;
    slug: string;
    description: string;
    descriptionZh?: string | null;
    price: number;
    images: string;
    category: string;
    weight: number;
    sku: string;
    origin: string;
    stock: number;
  };
  related: Array<{
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
  }>;
}

export default function ProductDetail({ product, related }: Props) {
  const { lang, t } = useI18n();
  const { show } = useToast();
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const images = JSON.parse(product.images || "[]");
  const [activeImg, setActiveImg] = useState(0);

  const name = lang === "zh" && product.nameZh ? product.nameZh : product.name;
  const desc = lang === "zh" && product.descriptionZh ? product.descriptionZh : product.description;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      nameZh: product.nameZh,
      price: product.price,
      quantity: qty,
      image: images[0] || "",
      slug: product.slug,
      weight: product.weight,
    });
    show(t.cart.addedToCart);
  };

  const handleBuyNow = () => {
    handleAdd();
    window.location.href = "/cart";
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-apple-text mb-6">
        <Link href="/" className="hover:text-apple-dark">{t.products.breadcrumbHome}</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-apple-dark">{t.products.breadcrumbProducts}</Link>
        <span className="mx-2">/</span>
        <span className="text-apple-dark">{name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image */}
        <div>
          <div className="aspect-square bg-apple-gray rounded-apple overflow-hidden mb-3">
            {images[activeImg] ? (
              <img src={images[activeImg]} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-apple-mid text-6xl">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImg ? "border-apple-blue" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-apple-dark tracking-tight mb-2">{name}</h1>
          <p className="text-sm text-apple-text mb-4">{t.products.sku}: {product.sku}</p>
          <p className="text-2xl font-semibold text-apple-dark mb-6">{formatCurrency(product.price)}</p>

          <p className="text-sm text-apple-text leading-relaxed mb-6">{desc}</p>

          <div className="flex items-center gap-2 text-sm text-apple-text mb-6">
            <span>{t.products.origin}: {product.origin}</span>
            <span className="text-apple-border">|</span>
            <span>{t.products.weight}: {product.weight}kg</span>
            <span className="text-apple-border">|</span>
            <span>{t.products.sstNote}</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-9 h-9 rounded-full border border-apple-border flex items-center justify-center text-apple-dark hover:bg-apple-gray transition-colors"
            >
              -
            </button>
            <span className="w-10 text-center font-medium">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-9 h-9 rounded-full border border-apple-border flex items-center justify-center text-apple-dark hover:bg-apple-gray transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              className="flex-1 md:flex-none bg-apple-blue text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              {t.products.addToCart}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 md:flex-none bg-apple-dark text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-black transition-colors"
            >
              {t.common.buyNow}
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-apple-dark mb-4">{t.products.relatedProducts}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
