"use client";
import { useI18n } from "@/i18n";

export default function ShippingPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-apple-dark mb-8">{t.shipping.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-apple-light rounded-apple p-6">
          <h2 className="font-semibold text-apple-dark mb-3">{t.shipping.westMalaysia}</h2>
          <div className="space-y-2 text-sm text-apple-text">
            <p>{t.shipping.westTime}</p>
            <p>{t.shipping.westCost}</p>
            <p className="text-xs text-apple-blue mt-2">{t.shipping.freeShipping}</p>
          </div>
        </div>
        <div className="bg-apple-light rounded-apple p-6">
          <h2 className="font-semibold text-apple-dark mb-3">{t.shipping.eastMalaysia}</h2>
          <div className="space-y-2 text-sm text-apple-text">
            <p>{t.shipping.eastTime}</p>
            <p>{t.shipping.eastCost}</p>
          </div>
        </div>
      </div>

      <div className="bg-apple-light rounded-apple p-6 mb-10">
        <h2 className="font-semibold text-apple-dark mb-3">{t.shipping.customs}</h2>
        <p className="text-sm text-apple-text leading-relaxed">{t.shipping.customsDesc}</p>
      </div>

      <div className="text-sm text-apple-text space-y-2">
        <h3 className="font-semibold text-apple-dark">{t.shipping.processTitle}</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>{t.shipping.process1}</li>
          <li>{t.shipping.process2}</li>
          <li>{t.shipping.process3}</li>
          <li>{t.shipping.process4}</li>
          <li>{t.shipping.process5}</li>
        </ol>
      </div>
    </div>
  );
}
