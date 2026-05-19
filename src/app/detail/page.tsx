'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/i18n/i18n-context';
import { sampleProducts, caseStyleLabels, caseMaterialLabels, stockLabels, getProductsByModelId } from '@/data/products';
import { findModelById } from '@/data/phones';
import { formatMYR, calcDiscountPercent } from '@/data/pricing';
import type { PhoneCaseProduct } from '@/data/products';

function DetailContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id') || '';

  const [product, setProduct] = useState<PhoneCaseProduct | null>(null);
  const [related, setRelated] = useState<PhoneCaseProduct[]>([]);
  const [mainImg, setMainImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const found = sampleProducts.find((p) => p.id === productId);
    if (found) {
      const enriched = { ...found, model: findModelById(found.modelId)?.model };
      setProduct(enriched);
      setRelated(getProductsByModelId(found.modelId, sampleProducts).filter((p) => p.id !== productId).slice(0, 4));
    } else {
      setNotFound(true);
    }
  }, [productId]);

  function addToCart() {
    if (!product) return;
    try {
      const cart = JSON.parse(localStorage.getItem('caseart-cart') || '[]');
      const exist = cart.find((i: { id: string }) => i.id === product.id);
      if (exist) { exist.qty += qty; }
      else {
        cart.push({
          id: product.id, name: product.name.en, price: product.price,
          model: product.model?.name || product.modelId,
          image: product.images[0]?.url || '', qty,
        });
      }
      localStorage.setItem('caseart-cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdate'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch { /* noop */ }
  }

  if (notFound) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <h2 className="text-xl font-bold mb-4">Product not found</h2>
            <Link href="/products" className="btn-primary inline-flex px-6 py-3 bg-[#002FA7] text-white font-bold rounded-xl">Back to Products</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" />
        </main>
        <Footer />
      </>
    );
  }

  const discount = calcDiscountPercent(product.price, product.originalPrice);
  const styleLabel = product.styles[0] ? caseStyleLabels[product.styles[0] as keyof typeof caseStyleLabels] : null;
  const materialLabel = caseMaterialLabels[product.material as keyof typeof caseMaterialLabels];
  const stockLabel = stockLabels[product.stock];
  const images = product.images.length > 0 ? product.images : [{ id: '1', url: `https://placehold.co/600x600/002FA7/white?text=Case`, alt: { zh: '', en: product.name.en, ms: '' }, sortOrder: 1 }];

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-8">
            <Link href="/" className="hover:text-[#002FA7]">{t.nav.home}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#002FA7]">{t.nav.allProducts}</Link>
            <span>/</span>
            <span className="text-[#002FA7] font-semibold truncate max-w-[200px]">{product.name.en}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Image gallery */}
            <div>
              <div className="aspect-square bg-[#F5F5F7] rounded-2xl overflow-hidden mb-4">
                <img src={images[mainImg]?.url || images[0].url} alt={product.name.en} className="w-full h-full object-cover" />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button key={img.id} onClick={() => setMainImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === mainImg ? 'border-[#002FA7]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && <span className="px-3 py-1 bg-[#002FA7] text-white text-xs font-bold rounded-full">{t.product.newTag}</span>}
                {product.isHot && <span className="px-3 py-1 bg-[#FF3B30] text-white text-xs font-bold rounded-full">{t.product.hotTag}</span>}
                {discount > 0 && <span className="px-3 py-1 bg-[#FF9500] text-white text-xs font-bold rounded-full">-{discount}%</span>}
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-2">{product.name.en}</h1>
              {product.model && (
                <p className="text-sm text-[#002FA7] font-medium mb-4">{t.product.compatibleModels}: {product.model.name}</p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#002FA7]">{formatMYR(product.price)}</span>
                {product.originalPrice > 0 && (
                  <span className="text-lg text-[#86868B] line-through">{formatMYR(product.originalPrice)}</span>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-[#86868B] leading-relaxed">{product.description.en}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  {materialLabel && (
                    <span className="flex items-center gap-1 text-[#1D1D1F]">
                      <span className="text-[#86868B]">{t.product.material}:</span> {materialLabel.en}
                    </span>
                  )}
                  {styleLabel && (
                    <span className="flex items-center gap-1 text-[#1D1D1F]">
                      <span className="text-[#86868B]">{t.product.style}:</span> {styleLabel.en}
                    </span>
                  )}
                  <span className={`flex items-center gap-1 ${product.stock === 'in_stock' ? 'text-[#34C759]' : product.stock === 'out_of_stock' ? 'text-[#FF3B30]' : 'text-[#FF9500]'}`}>
                    {stockLabel?.en || product.stock}
                  </span>
                </div>
              </div>

              {/* Color options */}
              {product.colorOptions.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#1D1D1F] mb-2">Color</p>
                  <div className="flex gap-2">
                    {product.colorOptions.map((c, i) => (
                      <button key={i} className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-[#002FA7] transition-colors"
                        style={{ backgroundColor: c.hex === 'transparent' ? '#F0F0F0' : c.hex }}
                        title={c.name.en} />
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Add to cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-sm hover:text-[#002FA7]">-</button>
                  <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                  <button onClick={() => setQty(Math.min(99, qty + 1))} className="w-10 h-10 flex items-center justify-center text-sm hover:text-[#002FA7]">+</button>
                </div>
                <button
                  onClick={addToCart}
                  className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    added
                      ? 'bg-[#34C759] text-white'
                      : 'bg-[#002FA7] text-white hover:bg-[#2959C0] hover:scale-105 hover:shadow-[0_4px_14px_rgba(0,47,167,0.25)] active:scale-95'
                  }`}
                  disabled={product.stock === 'out_of_stock'}
                >
                  {added ? '✓ Added!' : product.stock === 'out_of_stock' ? t.product.outOfStock : t.product.addToCart}
                </button>
              </div>

              <div className="bg-[#F5F5F7] rounded-xl p-4 text-sm text-[#86868B]">
                <p className="font-medium text-[#1D1D1F] mb-1">{t.product.shippingInfo}</p>
                <p>Ships from China to Malaysia. West MY ~7-12 days, East MY ~10-15 days.</p>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">{t.product.relatedProducts}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-3 border-[#002FA7]/20 border-t-[#002FA7] rounded-full animate-spin" /></div>}>
      <DetailContent />
    </Suspense>
  );
}
