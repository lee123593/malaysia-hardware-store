'use client';

import Link from 'next/link';
import { useI18n } from '@/i18n/i18n-context';
import { formatMYR, calcDiscountPercent } from '@/data/pricing';
import { caseStyleLabels, caseMaterialLabels } from '@/data/products';
import type { PhoneCaseProduct } from '@/data/products';

export default function ProductCard({ product }: { product: PhoneCaseProduct }) {
  const { t } = useI18n();
  const imgUrl = product.images[0]?.url || `https://placehold.co/600x600/002FA7/white?text=${encodeURIComponent(product.name.en.slice(0, 20))}`;
  const discount = calcDiscountPercent(product.price, product.originalPrice);
  const styleLabel = product.styles[0] ? caseStyleLabels[product.styles[0] as keyof typeof caseStyleLabels] : null;
  const materialLabel = caseMaterialLabels[product.material as keyof typeof caseMaterialLabels];

  return (
    <Link
      href={`/detail?id=${product.id}`}
      className="card-product block group"
    >
      <div className="relative aspect-square bg-[#F5F5F7] rounded-t-2xl overflow-hidden">
        <img
          src={imgUrl}
          alt={product.name.en}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#002FA7] text-white text-xs font-bold rounded-full">
            {t.product.newTag}
          </span>
        )}
        {product.isHot && !product.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#FF3B30] text-white text-xs font-bold rounded-full">
            {t.product.hotTag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-[#FF9500] text-white text-xs font-bold rounded-full">
            -{discount}%
          </span>
        )}
        <button
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#002FA7] hover:text-white"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          title={t.product.addToCart}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <p className="text-xs text-[#86868B] mb-1">{product.model?.name || product.modelId}</p>
        <h3 className="text-sm font-semibold text-[#1D1D1F] line-clamp-2 mb-2 leading-snug">{product.name.en}</h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#002FA7]">{formatMYR(product.price)}</span>
          {product.originalPrice > 0 && (
            <span className="text-sm text-[#86868B] line-through">{formatMYR(product.originalPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {styleLabel && (
            <span className="text-[10px] px-2 py-0.5 bg-[#E8EDFA] text-[#002FA7] rounded-full">{styleLabel.en}</span>
          )}
          {materialLabel && (
            <span className="text-[10px] text-[#86868B]">{materialLabel.en}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function addToCart(product: PhoneCaseProduct) {
  try {
    const cart = JSON.parse(localStorage.getItem('caseart-cart') || '[]');
    const exist = cart.find((i: { id: string }) => i.id === product.id);
    if (exist) {
      exist.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name.en,
        price: product.price,
        model: product.model?.name || product.modelId,
        image: product.images[0]?.url || '',
        qty: 1,
      });
    }
    localStorage.setItem('caseart-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdate'));
  } catch { /* noop */ }
}
