"use client";
import { useI18n } from "@/i18n";

export default function PaymentPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-apple-dark mb-8">{t.payment.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {t.payment.methods.map((method: string, i: number) => (
          <div key={i} className="bg-apple-light rounded-apple p-4 text-sm text-apple-dark flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
              </svg>
            </div>
            <span className={method.includes("coming soon") || method.includes("即将上线") ? "text-apple-text" : ""}>{method}</span>
          </div>
        ))}
      </div>

      <div className="bg-apple-light rounded-apple p-6">
        <h2 className="font-semibold text-apple-dark mb-3">{t.payment.howItWorks}</h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-apple-text">
          <li>{t.payment.step1}</li>
          <li>{t.payment.step2}</li>
          <li>{t.payment.step3}</li>
          <li>{t.payment.step4}</li>
          <li>{t.payment.step5}</li>
        </ol>
        <p className="text-xs text-apple-text mt-4">{t.payment.note}</p>
      </div>
    </div>
  );
}
