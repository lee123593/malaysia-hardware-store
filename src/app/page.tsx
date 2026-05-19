'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/i18n/i18n-context';
import { phoneBrands, getHotModels } from '@/data/phones';
import { sampleProducts } from '@/data/products';
import { formatMYR } from '@/data/pricing';
import type { PhoneCaseProduct } from '@/data/products';
import type { PhoneBrand, PhoneModel } from '@/data/phones';

export default function HomePage() {
  const { t } = useI18n();
  const [hotModels, setHotModels] = useState<{ brand: PhoneBrand; model: PhoneModel }[]>([]);
  const [hotProducts, setHotProducts] = useState<PhoneCaseProduct[]>([]);
  const [newProducts, setNewProducts] = useState<PhoneCaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hModels = getHotModels();
    setHotModels(hModels);

    const active = sampleProducts.filter((p) => p.status === 'active');
    setHotProducts(active.filter((p) => p.isHot).sort((a, b) => b.sortOrder - a.sortOrder).slice(0, 8));
    setNewProducts(active.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8));
    setLoading(false);

    // Scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ======== HERO ======== */}
        <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#002FA7] via-[#00268A] to-[#00144D] overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                  animation: `fade-in ${Math.random() * 10 + 8}s infinite`,
                  animationDelay: `${Math.random() * 10}s`,
                  opacity: Math.random() * 0.3 + 0.05,
                }}
              />
            ))}
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight reveal">
              {t.home.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 reveal stagger-1">
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center reveal stagger-2">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#002FA7] font-bold rounded-xl hover:scale-105 hover:shadow-[0_6px_24px_rgba(255,255,255,0.25)] transition-all duration-200 active:scale-95"
              >
                {t.home.ctaViewModels}
              </Link>
              <Link
                href="#hot-section"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-200 active:scale-95"
              >
                {t.home.bestSellers}
              </Link>
            </div>
          </div>
        </section>

        {/* ======== SELLING POINTS ======== */}
        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-14 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-[#002FA7] mb-3">{t.home.featuresTitle}</h2>
              <p className="text-[#86868B]">4 reasons why thousands of Malaysians choose us</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: '🎨', title: t.home.featureSource, desc: 'Curated from China\'s top case designers — every piece is unique' },
                { icon: '📱', title: t.home.featureModels, desc: 'Covers every popular phone in Malaysia — iPhone, Samsung, Xiaomi, OPPO & more' },
                { icon: '✨', title: t.home.featurePrice, desc: 'Direct from source — no middlemen, best prices for the best-looking cases' },
                { icon: '🚚', title: t.home.featureShipping, desc: 'Shipping to West & East Malaysia with clear delivery estimates' },
              ].map((sp, i) => (
                <div key={i} className={`text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#002FA7]/20 hover:shadow-[0_8px_30px_rgba(0,47,167,0.08)] transition-all duration-300 reveal stagger-${i + 1}`}>
                  <div className="text-4xl mb-4">{sp.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">{sp.title}</h3>
                  <p className="text-sm text-[#86868B] leading-relaxed">{sp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======== HOT MODELS ======== */}
        <section className="py-16 bg-[#F5F5F7]" id="model-section">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">{t.home.hotModels}</h2>
              <p className="text-[#86868B]">Find your phone model instantly, browse matching cases</p>
            </div>
            {loading ? (
              <div className="flex flex-wrap gap-3 justify-center">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton w-40 h-12 rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 justify-center reveal">
                {hotModels.map(({ brand, model }) => (
                  <Link
                    key={model.id}
                    href={`/products?model=${encodeURIComponent(model.name)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-[#1D1D1F] hover:border-[#002FA7] hover:text-[#002FA7] hover:shadow-[0_4px_14px_rgba(0,47,167,0.15)] transition-all duration-200 hover:scale-105"
                  >
                    {model.name}
                  </Link>
                ))}
              </div>
            )}
            <div className="text-center mt-10 reveal">
              <Link href="/products" className="btn-outline inline-flex items-center px-6 py-3 border-2 border-[#002FA7] text-[#002FA7] font-semibold rounded-xl hover:bg-[#002FA7] hover:text-white transition-all duration-200">
                {t.home.viewAll}
              </Link>
            </div>
          </div>
        </section>

        {/* ======== BEST SELLERS ======== */}
        <section className="py-16 md:py-24" id="hot-section">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10 reveal">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">{t.home.bestSellers}</h2>
              <p className="text-[#86868B]">Most popular cases this week</p>
            </div>
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="skeleton h-80 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {hotProducts.map((product, i) => (
                  <div key={product.id} className={`reveal stagger-${(i % 6) + 1}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            <div className="text-center mt-10 reveal">
              <Link href="/products" className="btn-primary inline-flex items-center px-8 py-3.5 bg-[#002FA7] text-white font-bold rounded-xl hover:bg-[#2959C0] hover:scale-105 hover:shadow-[0_4px_14px_rgba(0,47,167,0.25)] transition-all duration-200 active:scale-95">
                {t.home.viewAll}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
