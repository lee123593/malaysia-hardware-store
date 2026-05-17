"use client";
import { useI18n } from "@/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  const advantages = [t.about.adv1, t.about.adv2, t.about.adv3, t.about.adv4, t.about.adv5];

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-apple-dark mb-8">{t.about.title}</h1>

      <div className="space-y-6 text-sm text-apple-text leading-relaxed">
        <p>{t.about.content}</p>
        <p>{t.about.content2}</p>

        <div className="bg-apple-light rounded-apple p-6 mt-8">
          <h2 className="font-semibold text-apple-dark mb-4">{t.about.advantages}</h2>
          <ul className="space-y-3">
            {advantages.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-apple-blue mt-0.5">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
