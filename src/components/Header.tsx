'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';
import { useI18n } from '@/i18n/i18n-context';

export default function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdate', updateCartCount);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdate', updateCartCount);
    };
  }, []);

  function updateCartCount() {
    try {
      const cart = JSON.parse(localStorage.getItem('caseart-cart') || '[]');
      setCartCount(cart.reduce((s: number, i: { qty: number }) => s + i.qty, 0));
    } catch { setCartCount(0); }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-[#002FA7] no-underline">
          <span className="w-2.5 h-2.5 rounded-full bg-[#002FA7] inline-block" />
          KASE.
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
          {['home', 'allProducts', 'about', 'cart'].map((key) => (
            <Link
              key={key}
              href={key === 'home' ? '/' : key === 'allProducts' ? '/products' : `/${key}`}
              className="px-3 py-2 text-sm font-medium text-[#1D1D1F]/70 hover:text-[#002FA7] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {(t.nav as unknown as Record<string, string>)[key] || key}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/cart"
            className="relative p-2 text-[#1D1D1F]/70 hover:text-[#002FA7] transition-colors"
            aria-label="Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-[#002FA7] rounded-full">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="flex flex-col p-4 gap-2">
            {[
              { key: 'home', href: '/' },
              { key: 'allProducts', href: '/products' },
              { key: 'about', href: '/about' },
              { key: 'cart', href: '/cart' },
            ].map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="px-4 py-3 text-sm font-medium text-[#1D1D1F] hover:bg-[#E8EDFA] hover:text-[#002FA7] rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {(t.nav as unknown as Record<string, string>)[key] || key}
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .header-nav {
          display: none;
          align-items: center;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .header-nav { display: flex; }
        }
        .header-nav.open {
          display: none;
        }
      `}</style>
    </header>
  );
}
