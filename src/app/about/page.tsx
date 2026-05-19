'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useI18n } from '@/i18n/i18n-context';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <h1 className="text-4xl font-bold text-[#002FA7] mb-4">{t.about.title}</h1>
          <p className="text-lg text-[#86868B] mb-12">中国设计货源 · 马来西亚专供</p>

          <div className="space-y-10">
            <section className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">{t.about.title}</h2>
              <p className="text-[#86868B] leading-relaxed">{t.about.intro}</p>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">{t.about.shippingTitle}</h2>
              <p className="text-[#86868B] leading-relaxed">{t.about.shippingDesc}</p>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">{t.about.afterSalesTitle}</h2>
              <p className="text-[#86868B] leading-relaxed">{t.about.afterSalesDesc}</p>
            </section>

            <section className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">{t.about.noticeTitle}</h2>
              <p className="text-[#86868B] leading-relaxed">{t.about.noticeDesc}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
