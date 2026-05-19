'use client';

import Link from 'next/link';
import LanguageSwitcher from '@/i18n/LanguageSwitcher';
import { useI18n } from '@/i18n/i18n-context';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[#1D1D1F] text-white/70 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="text-white font-bold text-lg mb-4">KASE.</h4>
            <p className="text-sm leading-relaxed text-white/50">{t.footer.about}</p>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.langSwitch || 'Shop'}</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/products" className="text-sm text-white/50 hover:text-white transition-colors">{t.nav.allProducts}</Link>
              <Link href="/cart" className="text-sm text-white/50 hover:text-white transition-colors">{t.nav.cart}</Link>
              <Link href="/checkout" className="text-sm text-white/50 hover:text-white transition-colors">{t.nav.checkout}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.shipping || 'Help'}</h4>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">{t.footer.shipping}</Link>
              <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">{t.footer.afterSales}</Link>
              <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">{t.footer.about}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{t.footer.contact || 'Contact'}</h4>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">WhatsApp</a>
              <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/40">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
