'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/i18n/i18n-context';
import { phoneBrands, findModelById } from '@/data/phones';
import { sampleProducts } from '@/data/products';
import { formatMYR } from '@/data/pricing';
import type { PhoneCaseProduct } from '@/data/products';
import type { PhoneBrand, PhoneModel } from '@/data/phones';

function ProductsContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model') || '';

  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [sort, setSort] = useState<string>('newest');
  const [products, setProducts] = useState<PhoneCaseProduct[]>([]);
  const [filtered, setFiltered] = useState<PhoneCaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const active = sampleProducts.filter((p) => p.status === 'active');
    // Enrich with model info
    const enriched = active.map((p) => {
      const found = findModelById(p.modelId);
      return { ...p, model: found?.model };
    });
    setProducts(enriched);

    if (modelParam) {
      const found = findModelById(modelParam);
      if (found) {
        setSelectedBrand(found.brand.id);
        setSelectedModel(found.model.id);
      } else {
        // Try partial match
        const match = enriched.find((p) => p.model?.name === modelParam);
        if (match) {
          setSelectedBrand(phoneBrands.find((b) => b.models.some((m) => m.id === match.modelId))?.id || '');
          setSelectedModel(match.modelId);
        }
      }
    }
    setLoading(false);
  }, [modelParam]);

  useEffect(() => {
    let result = [...products];
    if (selectedBrand) {
      result = result.filter((p) => {
        const brand = phoneBrands.find((b) => b.id === selectedBrand);
        return brand?.models.some((m) => m.id === p.modelId);
      });
    }
    if (selectedModel) {
      result = result.filter((p) => p.modelId === selectedModel);
    }
    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'popular': result.sort((a, b) => (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0)); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    setFiltered(result);
  }, [selectedBrand, selectedModel, sort, products]);

  const selectedBrandData = selectedBrand ? phoneBrands.find((b) => b.id === selectedBrand) : null;
  const selectedModelData = selectedModel ? findModelById(selectedModel)?.model : null;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
            <Link href="/" className="hover:text-[#002FA7]">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#002FA7]">{t.nav.allProducts}</Link>
            {selectedModelData && (
              <>
                <span>/</span>
                <span className="text-[#002FA7] font-semibold">{selectedModelData.name}</span>
              </>
            )}
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-2">
            {selectedModelData ? `${selectedModelData.name} ${t.home.bestSellers}` : t.nav.allProducts}
          </h1>
          <p className="text-[#86868B] mb-8">{filtered.length} styles</p>

          {/* Brand selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => { setSelectedBrand(''); setSelectedModel(''); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !selectedBrand ? 'bg-[#002FA7] text-white' : 'bg-gray-100 text-[#1D1D1F] hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            {phoneBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => { setSelectedBrand(brand.id); setSelectedModel(''); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedBrand === brand.id ? 'bg-[#002FA7] text-white' : 'bg-gray-100 text-[#1D1D1F] hover:bg-gray-200'
                }`}
              >
                {brand.name}
              </button>
            ))}
          </div>

          {/* Model selector */}
          {selectedBrandData && (
            <div className="flex flex-wrap gap-2 mb-6 p-4 bg-[#F5F5F7] rounded-xl">
              {selectedBrandData.models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedModel === model.id ? 'bg-[#002FA7] text-white' : 'bg-white text-[#1D1D1F] hover:bg-gray-100'
                  }`}
                >
                  {model.name}
                  {model.hot && <span className="ml-1 text-[10px]">🔥</span>}
                </button>
              ))}
            </div>
          )}

          {/* Sort */}
          <div className="flex gap-2 mb-8">
            {[
              { key: 'newest', label: t.product.sortLatest },
              { key: 'popular', label: t.product.sortPopular },
              { key: 'price-low', label: t.product.sortPriceLow },
              { key: 'price-high', label: t.product.sortPriceHigh },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  sort === key ? 'bg-[#002FA7] text-white' : 'bg-gray-100 text-[#1D1D1F] hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-80 rounded-2xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-30">📱</div>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mb-4">{t.product.outOfStock}</h3>
              <button
                onClick={() => { setSelectedBrand(''); setSelectedModel(''); }}
                className="btn-outline inline-flex px-6 py-3 border-2 border-[#002FA7] text-[#002FA7] font-semibold rounded-xl hover:bg-[#002FA7] hover:text-white transition-all"
              >
                {t.common.back || 'Back'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}
