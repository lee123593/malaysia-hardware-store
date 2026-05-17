"use client";
import Link from "next/link";
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
  }>;
}

export default function HomeClient({ products }: Props) {
  const { t } = useI18n();

  return (
    <div>
      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-apple-dark text-balance leading-tight">
            {t.home.hero}
            <br />
            <span className="text-apple-text font-normal">{t.home.heroLine2}</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-apple-text max-w-xl mx-auto leading-relaxed">
            {t.home.heroSub}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/products"
              className="bg-apple-dark text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-black transition-colors"
            >
              {t.home.shopNow}
            </Link>
            <Link
              href="/about"
              className="text-apple-dark text-sm font-medium px-6 py-3 rounded-full border border-apple-border hover:bg-apple-gray transition-colors"
            >
              {t.home.aboutUs}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-apple-light">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-apple-dark tracking-tight">
                {t.home.featuredProducts}
              </h2>
              <p className="text-sm text-apple-text mt-1">{t.home.featuredSub}</p>
            </div>
            <Link
              href="/products"
              className="text-sm text-apple-blue hover:text-apple-dark transition-colors font-medium"
            >
              {t.home.viewAll} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-5 py-16 md:py-20">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-apple-dark tracking-tight mb-10">
            {t.home.whyUs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t.home.why1Title, desc: t.home.why1Desc },
              { title: t.home.why2Title, desc: t.home.why2Desc },
              { title: t.home.why3Title, desc: t.home.why3Desc },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-10 h-10 rounded-full bg-apple-gray mx-auto mb-4 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-dark mb-2">{item.title}</h3>
                <p className="text-sm text-apple-text leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-apple-light">
        <div className="max-w-6xl mx-auto px-5 py-16 text-center">
          <p className="text-xs text-apple-text tracking-widest uppercase">{t.home.seoTagline}</p>
          <p className="text-xs text-apple-text mt-1">{t.home.seoSubtagline}</p>
        </div>
      </section>
    </div>
  );
}
